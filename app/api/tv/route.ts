import { NextResponse } from 'next/server';
import data from '@/data.json';
import { fetchChannelContent, type Video } from '@/lib/youtube';

/**
 * Jedini izvor podataka za Android TV aplikaciju.
 *
 * ZAŠTO POSTOJI: TV aplikacija bi inače morala sama povlačiti i parsirati 26
 * YouTube RSS feedova pri svakom pokretanju. Na TV boxu (slab procesor, često
 * lošija mreža) to je nekoliko sekundi praznog ekrana. Ovdje se isto radi
 * jednom, na poslužitelju, i drži u ISR cacheu.
 *
 * ⚠ SHORTSI SE NAMJERNO IZOSTAVLJAJU. Okomiti video na 16:9 televizoru daje
 * dva crna stupca preko pola ekrana. Web ima zaseban tab za njih; TV nema.
 */

export const revalidate = 600; // 10 min — isto kao ostatak stranice

type Kanal = {
  id: string;
  name: string;
  country: string;
  channelId: string;
  avatar?: string;
  categories?: string[];
  description?: string;
};

/** Ono što aplikacija prikaže u redu videa. Namjerno plosnato — bez ugniježđenja. */
type TvVideo = Video & {
  channelId: string;
  channelName: string;
  channelAvatar: string;
  country: string;
  categories: string[];
};

export async function GET() {
  const kanali = (data.channels as Kanal[]).filter((k) => k.channelId);

  // Svi kanali paralelno. Kanal koji padne ne smije srušiti cijeli odgovor —
  // bolje je pokazati 25 kanala nego prazan ekran.
  const rezultati = await Promise.all(
    kanali.map(async (k) => {
      try {
        const { regular } = await fetchChannelContent(k.channelId);
        return { k, videos: regular };
      } catch {
        return { k, videos: [] as Video[] };
      }
    })
  );

  const videos: TvVideo[] = [];
  for (const { k, videos: vs } of rezultati) {
    for (const v of vs) {
      videos.push({
        ...v,
        channelId: k.id,
        channelName: k.name,
        channelAvatar: k.avatar ?? '',
        country: k.country,
        categories: k.categories ?? [],
      });
    }
  }
  videos.sort((a, b) => (a.published < b.published ? 1 : -1));

  return NextResponse.json(
    {
      version: 1,
      updated: new Date().toISOString(),
      categories: data.categories,
      channels: kanali.map((k) => ({
        id: k.id,
        name: k.name,
        country: k.country,
        avatar: k.avatar ?? '',
        categories: k.categories ?? [],
        description: k.description ?? '',
        // Broj videa po kanalu — aplikacija time puni redove bez drugog poziva.
        videoIds: videos.filter((v) => v.channelId === k.id).map((v) => v.id),
      })),
      // Kapa na 240: dovoljno za "Najnovije" i sve redove kanala, a odgovor
      // ostaje ispod ~200 KB pa se na TV-u učita odjednom.
      videos: videos.slice(0, 240),
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
        // Aplikacija nije na istoj domeni; bez ovoga ne bi mogla čitati.
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
