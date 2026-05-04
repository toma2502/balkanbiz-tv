import { revalidatePath } from "next/cache";
import { data } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
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
