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

export async function getLatestFeed(limit = 60): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  const channels = data.channels.filter((c) => c.channelId);

  await Promise.all(
    channels.map(async (ch) => {
      try {
        const { regular, shorts } = await fetchChannelContent(ch.channelId!);
        for (const v of regular.slice(0, 5)) {
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
        for (const v of shorts.slice(0, 3)) {
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

  return items
    .sort((a, b) => +new Date(b.published) - +new Date(a.published))
    .slice(0, limit);
}
