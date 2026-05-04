import Link from "next/link";
import { data, COUNTRY_FLAGS, COUNTRY_NAMES } from "@/lib/data";

export const metadata = {
  title: "Svi kanali — BalkanBiz TV",
  description:
    "Kompletan pregled balkanskih poslovnih YouTube kanala, kategoriziranih i s opisima.",
};

export default function ChannelsPage() {
  const channels = [...data.channels].sort((a, b) => {
    if ((a.priority ?? 9) !== (b.priority ?? 9))
      return (a.priority ?? 9) - (b.priority ?? 9);
    return a.name.localeCompare(b.name, "hr");
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Svi kanali</h1>
        <p className="text-zinc-400">
          {channels.length} kanala iz {[...new Set(channels.map((c) => c.country))].length} zemalja.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map((ch) => (
          <Link
            key={ch.id}
            href={`/kanal/${ch.id}`}
            className="group block p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-500">
                {COUNTRY_FLAGS[ch.country]} {COUNTRY_NAMES[ch.country]}
              </span>
              {ch.priority === 1 && (
                <span className="text-xs text-amber-400">★</span>
              )}
            </div>
            <h3 className="font-semibold text-lg group-hover:text-amber-400 transition-colors mb-2">
              {ch.name}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
              {ch.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {ch.categories.map((cat) => {
                const c = data.categories.find((x) => x.id === cat);
                return (
                  <span
                    key={cat}
                    className="text-xs px-2 py-0.5 rounded-full bg-zinc-800/60 text-zinc-400"
                  >
                    {c?.icon} {c?.label}
                  </span>
                );
              })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
