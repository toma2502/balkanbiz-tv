import { data } from "./data";
import { fetchChannelContent, type Video } from "./youtube";

export type FeedItem = Video & {
  channelSlug: string;
  channelName: string;
  channelAvatar?: string;
  country: string;
  channelCategories: string[];
  isShort: boolean;
};

// Bez limit-a po defaultu — uzimamo sve što RSS feed dostavi (~15 po kanalu).
// Ako se prosljedi limit, primjenjuje se na finalni sortirani niz.
export async function getLatestFeed(limit?: number): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  const channels = data.channels.filter((c) => c.channelId);

  await Promise.all(
    channels.map(async (ch) => {
      try {
        const { regular, shorts } = await fetchChannelContent(ch.channelId!);
        for (const v of regular) {
          items.push({
            ...v,
            channelSlug: ch.id,
            channelName: ch.name,
            channelAvatar: ch.avatar,
            country: ch.country,
            channelCategories: ch.categories,
            isShort: false,
          });
        }
        for (const v of shorts) {
          items.push({
            ...v,
            channelSlug: ch.id,
            channelName: ch.name,
            channelAvatar: ch.avatar,
            country: ch.country,
            channelCategories: ch.categories,
            isShort: true,
          });
        }
      } catch {
        /* swallow individual channel errors */
      }
    })
  );

  const sorted = items.sort(
    (a, b) => +new Date(b.published) - +new Date(a.published)
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}
