import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { data } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (process.env.CRON_SECRET && auth !== expected) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const refreshed: string[] = [];
  for (const ch of data.channels) {
    if (ch.channelId) {
      revalidatePath(`/kanal/${ch.id}`);
      refreshed.push(ch.id);
    }
  }
  revalidatePath("/");
  revalidatePath("/kanali");

  return Response.json({
    ok: true,
    timestamp: new Date().toISOString(),
    refreshed: refreshed.length,
    channels: refreshed,
  });
}
