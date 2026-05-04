import Link from "next/link";
import {
  data,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
  getChannelsByCategory,
} from "@/lib/data";

export default function Home() {
  const totalChannels = data.channels.length;
  const countries = [...new Set(data.channels.map((c) => c.country))].sort();
  const featured = data.channels.filter((c) => c.priority === 1);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Otvoreno kuriranje · {totalChannels} kanala · {countries.length} zemalja
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
            Balkanski poslovni YouTube{" "}
            <span className="text-amber-400">na jednom mjestu</span>.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl">
            Kurirana lista poduzetničkih, marketinških, financijskih i tech kanala iz Hrvatske, Srbije, BiH, Slovenije, Makedonije i Crne Gore. Bez algoritma, bez praćenja, bez oglasa. Samo poslovni sadržaj na našem jeziku.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/kanali"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors"
            >
              Pregledaj kanale →
            </Link>
            <a
              href="https://github.com/toma2502/balkanbiz-tv"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium transition-colors"
            >
              Doprinesi
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Kategorije</h2>
          <Link href="/kanali" className="text-sm text-zinc-500 hover:text-amber-400">
            Vidi sve →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.categories.map((cat) => {
            const count = getChannelsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/kategorija/${cat.id}`}
                className="group block p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl mb-3">{cat.icon}</div>
                    <h3 className="font-semibold text-lg group-hover:text-amber-400 transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">{count} kanala</p>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 transition-colors">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-16 border-t border-zinc-900">
          <h2 className="text-2xl font-bold mb-8">Istaknuti kanali</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((ch) => (
              <Link
                key={ch.id}
                href={`/kanal/${ch.id}`}
                className="group block p-6 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/5 to-transparent hover:border-amber-400/40 transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-amber-400 mb-3">
                  <span>★ Priority</span>
                  <span>·</span>
                  <span>
                    {COUNTRY_FLAGS[ch.country]} {COUNTRY_NAMES[ch.country]}
                  </span>
                </div>
                <h3 className="font-semibold text-xl group-hover:text-amber-400 transition-colors">
                  {ch.name}
                </h3>
                <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                  {ch.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* By country */}
      <section className="py-16 border-t border-zinc-900">
        <h2 className="text-2xl font-bold mb-8">Po zemljama</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {countries.map((c) => {
            const count = data.channels.filter((ch) => ch.country === c).length;
            return (
              <Link
                key={c}
                href={`/zemlja/${c.toLowerCase()}`}
                className="block p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 text-center transition-all"
              >
                <div className="text-3xl mb-2">{COUNTRY_FLAGS[c]}</div>
                <div className="font-medium text-sm">{COUNTRY_NAMES[c]}</div>
                <div className="text-xs text-zinc-500 mt-1">{count} kanala</div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
