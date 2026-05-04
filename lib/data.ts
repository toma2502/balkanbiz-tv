import raw from "../data.json";

export type Category = {
  id: string;
  label: string;
  icon: string;
};

export type Channel = {
  id: string;
  name: string;
  country: string;
  language: string;
  url: string;
  channelId?: string;
  handle?: string;
  avatar?: string;
  categories: string[];
  description: string;
  priority?: number;
};

export const data = raw as {
  version: string;
  updated: string;
  categories: Category[];
  channels: Channel[];
};

export const COUNTRY_FLAGS: Record<string, string> = {
  HR: "🇭🇷",
  RS: "🇷🇸",
  BA: "🇧🇦",
  SI: "🇸🇮",
  ME: "🇲🇪",
  MK: "🇲🇰",
};

export const COUNTRY_NAMES: Record<string, string> = {
  HR: "Hrvatska",
  RS: "Srbija",
  BA: "Bosna i Hercegovina",
  SI: "Slovenija",
  ME: "Crna Gora",
  MK: "Sjeverna Makedonija",
};

export function getChannelsByCategory(catId: string): Channel[] {
  return data.channels.filter((c) => c.categories.includes(catId));
}

export function getChannelById(id: string): Channel | undefined {
  return data.channels.find((c) => c.id === id);
}

export function getEmbedUrl(channel: Channel): string | null {
  if (channel.channelId) {
    const uploadsId = "UU" + channel.channelId.slice(2);
    return `https://www.youtube.com/embed/videoseries?list=${uploadsId}`;
  }
  return null;
}
