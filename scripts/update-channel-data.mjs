#!/usr/bin/env node
// Auto-fetcha za svaki kanal:
// 1. avatar URL (sa YouTube channel page-a)
// 2. resolve channel ID iz @handle ako fali
// Pokreće se prije svakog builda (vidi package.json "prebuild").

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "data.json");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";

async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "hr,en;q=0.7" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch (e) {
    console.warn(`  fetch fail ${url}: ${e.message}`);
    return null;
  }
}

function pick(html, patterns) {
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

async function resolveChannelId(url) {
  const html = await fetchHtml(url);
  if (!html) return null;
  const id = pick(html, [
    /"channelId":"(UC[A-Za-z0-9_-]{22})"/,
    /"externalId":"(UC[A-Za-z0-9_-]{22})"/,
    /channel\/(UC[A-Za-z0-9_-]{22})/,
  ]);
  return id;
}

async function fetchAvatar(channelId) {
  const html = await fetchHtml(`https://www.youtube.com/channel/${channelId}`);
  if (!html) return null;
  const raw = pick(html, [
    /"avatar":\{"thumbnails":\[\{"url":"(https?:\/\/[^"]+)"/,
    /<meta property="og:image" content="(https?:\/\/yt3[^"]+)"/,
  ]);
  if (!raw) return null;
  return raw.replace(/\\u0026/g, "&").replace(/=s\d+/, "=s240");
}

async function main() {
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));
  const channels = data.channels;

  let avatarHits = 0;
  let idHits = 0;
  let unchanged = 0;

  // Limit concurrency to avoid rate limits
  const concurrency = 4;
  const queue = [...channels];

  async function worker() {
    while (queue.length) {
      const ch = queue.shift();
      if (!ch) continue;
      // Resolve missing channelId
      if (!ch.channelId && ch.url) {
        console.log(`→ Resolving ID for ${ch.name}`);
        const id = await resolveChannelId(ch.url);
        if (id) {
          ch.channelId = id;
          idHits++;
        }
      }
      // Always refresh avatar (it can change)
      if (ch.channelId) {
        const a = await fetchAvatar(ch.channelId);
        if (a && a !== ch.avatar) {
          ch.avatar = a;
          avatarHits++;
          console.log(`✓ ${ch.name} avatar updated`);
        } else if (a) {
          unchanged++;
        } else {
          console.log(`  ${ch.name} avatar fetch failed`);
        }
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));

  data.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(
    `\nDone. ${avatarHits} avatars updated, ${idHits} IDs resolved, ${unchanged} unchanged.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(0); // never block build on data update
});
