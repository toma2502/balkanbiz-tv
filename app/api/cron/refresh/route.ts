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
  revalidatePath("/");
  revalidatePath("/kanali");

  return Response.json({
    ok: true,
    timestamp: new Date().toISOString(),
    refreshed: refreshed.length,
    channels: refreshed,
  });
}
