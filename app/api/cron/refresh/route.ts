import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { data } from "@/lib/data";

export const dynamic = "force-dynamic";

/**
 * Ova ruta je do 2026-08-09 bila POTPUNO otvorena: obican GET bez ikakvog
 * dokaza revalidirao je ~40 putanja i time povlacio RSS s 26 kanala.
 *
 * Zasto je to bilo vazno, iako nista ne curi: tko zna adresu mogao ju je vrtjeti
 * u petlji i time trositi racunanje na Vercelu, izlagati nas rizik da YouTube
 * rate-limita nas IP, i stalno razbijati predmemoriju stvarnim posjetiteljima.
 * Ruta koja radi skup posao bez autentikacije je napad na trosak, ne samo sum.
 *
 * Vercel Cron salje `Authorization: Bearer ${CRON_SECRET}` kad je ta varijabla
 * postavljena, pa dnevni raspored (`0 5 * * *`) i dalje prolazi.
 */
function ovlasten(req: Request): boolean {
  const tajna = process.env.CRON_SECRET;
  // Bez tajne je ruta zatvorena. Radije mrtav cron nego otvoren endpoint —
  // sadrzaj se u najgorem slucaju osvjezi pri sljedecem deployu.
  if (!tajna) return false;

  const zaglavlje = req.headers.get("authorization") || "";
  const ocekivano = `Bearer ${tajna}`;
  if (zaglavlje.length !== ocekivano.length) return false;
  return timingSafeEqual(Buffer.from(zaglavlje), Buffer.from(ocekivano));
}

export async function GET(req: Request) {
  if (!ovlasten(req)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const refreshed: string[] = [];
  for (const ch of data.channels) {
    if (ch.channelId) {
      revalidatePath(`/kanal/${ch.id}`);
      refreshed.push(ch.id);
    }
  }
  // Top-level rute koje agregiraju sadržaj
  revalidatePath("/");
  revalidatePath("/kanali");
  revalidatePath("/feed");
  // Kategorije i zemlje
  for (const cat of data.categories) {
    revalidatePath(`/kategorija/${cat.id}`);
  }
  const countries = [...new Set(data.channels.map((c) => c.country))];
  for (const c of countries) {
    revalidatePath(`/zemlja/${c.toLowerCase()}`);
  }

  return Response.json({
    ok: true,
    timestamp: new Date().toISOString(),
    refreshed_channels: refreshed.length,
    revalidated_paths: ["/", "/kanali", "/feed", "kategorije", "zemlje"],
    channels: refreshed,
  });
}
