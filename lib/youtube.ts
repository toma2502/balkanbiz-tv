export type Video = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  description: string;
};

export async function fetchChannelVideos(channelId: string): Promise<Video[]> {
  if (!channelId) return [];
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 }, headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml);
  } catch {
    return [];
  }
}

function parseFeed(xml: string): Video[] {
  const videos: Video[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const id = pick(entry, /<yt:videoId>(.*?)<\/yt:videoId>/);
    const title = pick(entry, /<title>(.*?)<\/title>/);
    const published = pick(entry, /<published>(.*?)<\/published>/);
    const thumbnail = pickAttr(entry, /<media:thumbnail[^>]*url="(.*?)"/);
    const description = pick(entry, /<media:description>(.*?)<\/media:description>/);
    if (id && title) {
      videos.push({
        id,
        title: decodeEntities(title),
        published,
        thumbnail: thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        description: decodeEntities(description).slice(0, 200),
      });
    }
  }
  return videos;
}

function pick(s: string, re: RegExp): string {
  const m = s.match(re);
  return m ? m[1].trim() : "";
}

function pickAttr(s: string, re: RegExp): string {
  const m = s.match(re);
  return m ? m[1] : "";
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

export function timeAgo(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "upravo";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `prije ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `prije ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `prije ${days} ${days === 1 ? "dan" : "dana"}`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `prije ${weeks} ${weeks === 1 ? "tjedan" : "tjedana"}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `prije ${months} mj`;
  const years = Math.floor(days / 365);
  return `prije ${years} ${years === 1 ? "godinu" : "godina"}`;
}
