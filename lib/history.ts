// Local watch-history tracker (localStorage).
// Privacy: nikad ne ide na server, čuva se isključivo u browseru korisnika.

import type { FeedItem } from "./feed";

export type WatchEntry = {
  id: string;
  channelSlug: string;
  categories: string[];
  country: string;
  isShort: boolean;
  ts: number;
};

const KEY = "balkanbiz-history";
const MAX_ENTRIES = 100;

export function readHistory(): WatchEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeHistory(list: WatchEntry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* quota exceeded — silently ignore */
  }
}

export function trackWatch(v: FeedItem): WatchEntry[] {
  const entry: WatchEntry = {
    id: v.id,
    channelSlug: v.channelSlug,
    categories: v.channelCategories,
    country: v.country,
    isShort: v.isShort,
    ts: Date.now(),
  };
  const list = readHistory();
  const next = [entry, ...list.filter((h) => h.id !== v.id)].slice(
    0,
    MAX_ENTRIES
  );
  writeHistory(next);
  return next;
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

// Compute affinity scores from history
export function computeAffinity(history: WatchEntry[]) {
  const channels: Record<string, number> = {};
  const categories: Record<string, number> = {};
  const countries: Record<string, number> = {};
  const types: Record<"short" | "regular", number> = { short: 0, regular: 0 };

  history.forEach((h, i) => {
    // Recency-weighted: most recent = full weight, decays exponentially
    const w = Math.exp(-i / 25);
    channels[h.channelSlug] = (channels[h.channelSlug] ?? 0) + w;
    h.categories.forEach((c) => {
      categories[c] = (categories[c] ?? 0) + w * 0.5;
    });
    countries[h.country] = (countries[h.country] ?? 0) + w * 0.2;
    types[h.isShort ? "short" : "regular"] += w * 0.3;
  });

  return { channels, categories, countries, types };
}

// Score and rank candidates for a user
export function recommendForUser<
  T extends {
    id: string;
    channelSlug: string;
    channelCategories: string[];
    country: string;
    isShort: boolean;
    published: string;
  }
>(items: T[], history: WatchEntry[], limit = 60): T[] {
  if (history.length === 0) return [];

  const aff = computeAffinity(history);
  const watched = new Set(history.map((h) => h.id));

  const candidates = items
    .filter((v) => !watched.has(v.id))
    .map((v) => {
      const chScore = (aff.channels[v.channelSlug] ?? 0) * 35;
      const catScore = v.channelCategories.reduce(
        (sum, c) => sum + (aff.categories[c] ?? 0),
        0
      ) * 10;
      const coScore = (aff.countries[v.country] ?? 0) * 4;
      const typeScore =
        (v.isShort ? aff.types.short : aff.types.regular) * 3;

      // Recency boost (newer videos slight bonus)
      const daysOld =
        (Date.now() - +new Date(v.published)) / (1000 * 60 * 60 * 24);
      const recency = Math.max(0, 4 - daysOld / 21);

      const score = chScore + catScore + coScore + typeScore + recency;
      return { v, score };
    })
    .filter((x) => x.score > 0.2);

  candidates.sort((a, b) => b.score - a.score);

  // De-dup heavy: limit per-channel to prevent spam from one channel
  const perChannelMax = 5;
  const channelCount: Record<string, number> = {};
  const result: T[] = [];
  for (const { v } of candidates) {
    channelCount[v.channelSlug] = (channelCount[v.channelSlug] ?? 0) + 1;
    if (channelCount[v.channelSlug] > perChannelMax) continue;
    result.push(v);
    if (result.length >= limit) break;
  }
  return result;
}
