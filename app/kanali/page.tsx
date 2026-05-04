import Link from "next/link";
import { data, COUNTRY_FLAGS, COUNTRY_NAMES, type Channel } from "@/lib/data";

export const metadata = {
  title: "Svi kanali — BalkanBiz TV",
  description:
    "Kompletan pregled balkanskih poslovnih YouTube kanala, kategoriziranih i s avatarima.",
};

function initials(name: string): string {
  return name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function ChannelCard({ ch }: { ch: Channel }) {
  return (
    <Link
      href={`/kanal/${ch.id}`}
      className="card-lift fade-up group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-amber-400/40 hover:bg-zinc-900/60 transition-all overflow-hidden"
    >
      <div className="p-5 flex items-start gap-4">
        {ch.avatar ? (
          <img
            src={ch.avatar}
            alt={ch.name}
            loading="lazy"
            className="w-14 h-14 rounded-full object-cover ring-1 ring-zinc-800 shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-400/5 flex items-center justify-center text-amber-400 font-bold text-lg ring-1 ring-amber-400/20 shrink-0">
            {initials(ch.name) || "?"}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-zinc-500 mb-1.5 font-semibold">
            <span>
              {COUNTRY_FLAGS[ch.country]} {COUNTRY_NAMES[ch.country]}
            </span>
            {ch.priority === 1 && (
              <span className="text-amber-400">★ Istaknuto</span>
            )}
          </div>
          <h3 className="font-bold text-lg leading-tight group-hover:text-amber-400 transition-colors tracking-tight">
            {ch.name}
          </h3>
        </div>
      </div>

      <p className="px-5 text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
        {ch.description}
      </p>

      <div className="px-5 pb-5 mt-auto flex flex-wrap gap-1.5">
        {ch.categories.map((cat) => {
          const c = data.categories.find((x) => x.id === cat);
          return (
            <span
              key={cat}
              className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-zinc-800/60 text-zinc-400 font-medium"
            >
              {c?.icon} {c?.label}
            </span>
          );
        })}
      </div>
    </Link>
  );
}

export default function ChannelsPage() {
  const channels = [...data.channels].sort((a, b) => {
    if ((a.priority ?? 9) !== (b.priority ?? 9))
      return (a.priority ?? 9) - (b.priority ?? 9);
    return a.name.localeCompare(b.name, "hr");
  });

  // Group by country
  const byCountry: Record<string, Channel[]> = {};
  for (const ch of channels) {
    (byCountry[ch.country] ??= []).push(ch);
  }

  const countryOrder = ["HR", "RS", "BA", "SI", "ME", "MK"];
  const countries = countryOrder.filter((c) => byCountry[c]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div className="mb-16 max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-3">
          Katalog · {channels.length} kanala
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">
          Svi balkanski poslovni kanali
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Kurirano po prioritetu, zemlji i temi. Klikni karticu za pregled videa unutar BalkanBiza.
        </p>
      </div>

      {countries.map((country) => {
        const list = byCountry[country];
        return (
          <section key={country} className="mb-16">
            <div className="flex items-baseline justify-between mb-6 sticky top-[64px] bg-zinc-950/80 backdrop-blur py-3 z-10 -mx-6 px-6 border-b border-zinc-900/60">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                <span className="text-3xl">{COUNTRY_FLAGS[country]}</span>
                <span>{COUNTRY_NAMES[country]}</span>
                <span className="text-sm font-normal text-zinc-500">
                  · {list.length} {list.length === 1 ? "kanal" : "kanala"}
                </span>
              </h2>
              <Link
                href={`/zemlja/${country.toLowerCase()}`}
                className="text-sm text-zinc-500 hover:text-amber-400 hidden sm:inline"
              >
                Stranica zemlje →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((ch) => (
                <ChannelCard key={ch.id} ch={ch} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
