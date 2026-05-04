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
      <section className="relative py-32 sm:py-44">
        <div className="ambient-glow" aria-hidden />
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur text-[11px] uppercase tracking-[0.15em] text-zinc-400 mb-10 fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Otvoreno kuriranje</span>
            <span className="text-zinc-600">·</span>
            <span>{totalChannels} kanala</span>
            <span className="text-zinc-600">·</span>
            <span>{countries.length} zemalja</span>
          </div>

          <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] fade-up">
            Balkanski poslovni{" "}
            <span className="italic font-light text-zinc-500">YouTube,</span>
            <br />
            <span className="text-amber-400">na jednom mjestu.</span>
          </h1>

          <p
            className="mt-10 text-lg sm:text-xl text-zinc-400 leading-[1.7] max-w-2xl fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Kurirana lista poduzetničkih, marketinških, financijskih i tech kanala iz Hrvatske, Srbije, BiH, Slovenije, Makedonije i Crne Gore. Bez algoritma. Bez praćenja. Bez oglasa.
          </p>

          <div
            className="mt-12 flex flex-wrap gap-3 fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href="/kanali"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors text-sm"
            >
              Pregledaj kanale
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="https://github.com/toma2502/balkanbiz-tv"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-300 font-medium transition-colors text-sm"
            >
              Doprinesi na GitHubu
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-t border-zinc-900">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-3">
              01 / Kategorije
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Pronađi po temi
            </h2>
          </div>
          <Link
            href="/kanali"
            className="text-sm text-zinc-500 hover:text-amber-400 hidden sm:inline-flex items-center gap-1"
          >
            Vidi sve →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.categories.map((cat, i) => {
            const count = getChannelsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/kategorija/${cat.id}`}
                className="card-lift fade-up group block p-7 rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/40 to-zinc-900/10 hover:border-amber-400/40 hover:bg-zinc-900/60 transition-all"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-4xl mb-4">{cat.icon}</div>
                    <h3 className="font-semibold text-xl group-hover:text-amber-400 transition-colors mb-1">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {count} {count === 1 ? "kanal" : "kanala"}
                    </p>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-20 border-t border-zinc-900">
          <div className="mb-12">
            <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-3">
              02 / Istaknuto
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Najjači kanali u regiji
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((ch, i) => (
              <Link
                key={ch.id}
                href={`/kanal/${ch.id}`}
                className="card-lift fade-up group block p-7 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.06] to-transparent hover:border-amber-400/50 transition-all"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-amber-400/80 mb-4 font-semibold">
                  <span>★ Priority</span>
                  <span className="text-zinc-700">·</span>
                  <span>
                    {COUNTRY_FLAGS[ch.country]} {COUNTRY_NAMES[ch.country]}
                  </span>
                </div>
                <h3 className="font-bold text-2xl group-hover:text-amber-400 transition-colors mb-3 tracking-tight">
                  {ch.name}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                  {ch.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* By country */}
      <section className="py-20 border-t border-zinc-900">
        <div className="mb-12">
          <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-3">
            03 / Geografija
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Po zemljama
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {countries.map((c, i) => {
            const count = data.channels.filter((ch) => ch.country === c).length;
            return (
              <Link
                key={c}
                href={`/zemlja/${c.toLowerCase()}`}
                className="card-lift fade-up block p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-amber-400/30 hover:bg-zinc-900/60 text-center transition-all"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="text-4xl mb-3">{COUNTRY_FLAGS[c]}</div>
                <div className="font-semibold text-sm">{COUNTRY_NAMES[c]}</div>
                <div className="text-xs text-zinc-500 mt-1">
                  {count} {count === 1 ? "kanal" : "kanala"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
