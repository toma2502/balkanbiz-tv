import Link from "next/link";
import { notFound } from "next/navigation";
import {
  data,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
  getChannelById,
} from "@/lib/data";
import { fetchChannelVideos } from "@/lib/youtube";
import ChannelPlayer from "@/components/ChannelPlayer";

export const revalidate = 3600;

export async function generateStaticParams() {
  return data.channels.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ch = getChannelById(id);
  return {
    title: ch ? `${ch.name} — BalkanBiz TV` : "Kanal nije pronađen",
    description: ch?.description,
  };
}

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ch = getChannelById(id);
  if (!ch) notFound();

  const videos = ch.channelId ? await fetchChannelVideos(ch.channelId) : [];
  const related = data.channels
    .filter(
      (c) =>
        c.id !== ch.id &&
        c.categories.some((cat) => ch.categories.includes(cat))
    )
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href="/kanali" className="text-sm text-zinc-500 hover:text-amber-400">
        ← Svi kanali
      </Link>

      <div className="mt-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
          <span>
            {COUNTRY_FLAGS[ch.country]} {COUNTRY_NAMES[ch.country]}
          </span>
          {ch.priority === 1 && <span className="text-amber-400">★ Priority</span>}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{ch.name}</h1>
        <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed">
          {ch.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {ch.categories.map((cat) => {
            const c = data.categories.find((x) => x.id === cat);
            return (
              <Link
                key={cat}
                href={`/kategorija/${cat}`}
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 transition-colors"
              >
                {c?.icon} {c?.label}
              </Link>
            );
          })}
        </div>
      </div>

      {videos.length > 0 ? (
        <ChannelPlayer videos={videos} channelName={ch.name} />
      ) : (
        <div className="aspect-video rounded-xl border border-dashed border-zinc-800 flex items-center justify-center text-zinc-500 text-center px-6">
          <div>
            <p>Nije moguće dohvatiti videe za ovaj kanal.</p>
            <a
              href={ch.url}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-block text-amber-400 hover:underline"
            >
              Otvori na YouTubeu →
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-8 mb-12">
        <a
          href={ch.url || `https://www.youtube.com/channel/${ch.channelId ?? ""}`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-300 transition-colors"
        >
          Pretplati se na YouTubeu ↗
        </a>
        <a
          href={`https://github.com/toma2502/balkanbiz-tv/issues/new?title=Update:%20${encodeURIComponent(
            ch.name
          )}&body=Kanal:%20${encodeURIComponent(ch.url)}`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-300 transition-colors"
        >
          Predloži ispravku
        </a>
      </div>

      {related.length > 0 && (
        <section className="border-t border-zinc-900 pt-12">
          <h2 className="text-xl font-semibold mb-6">Slični kanali</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/kanal/${r.id}`}
                className="block p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 transition-all"
              >
                <div className="text-xs text-zinc-500 mb-2">
                  {COUNTRY_FLAGS[r.country]} {COUNTRY_NAMES[r.country]}
                </div>
                <h3 className="font-semibold mb-1 hover:text-amber-400">
                  {r.name}
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-2">
                  {r.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
