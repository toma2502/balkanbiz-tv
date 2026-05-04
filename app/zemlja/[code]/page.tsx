import Link from "next/link";
import { notFound } from "next/navigation";
import { data, COUNTRY_FLAGS, COUNTRY_NAMES } from "@/lib/data";

export async function generateStaticParams() {
  const countries = [...new Set(data.channels.map((c) => c.country))];
  return countries.map((c) => ({ code: c.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const upper = code.toUpperCase();
  return {
    title: `${COUNTRY_NAMES[upper] ?? upper} — BalkanBiz TV`,
    description: `Poslovni YouTube kanali iz zemlje ${COUNTRY_NAMES[upper]}.`,
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const upper = code.toUpperCase();
  if (!COUNTRY_NAMES[upper]) notFound();
  const channels = data.channels
    .filter((c) => c.country === upper)
    .sort((a, b) => (a.priority ?? 9) - (b.priority ?? 9));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-zinc-500 hover:text-amber-400">
        ← Početna
      </Link>
      <div className="mt-6 mb-12">
        <div className="text-6xl mb-4">{COUNTRY_FLAGS[upper]}</div>
        <h1 className="text-4xl font-bold mb-2">{COUNTRY_NAMES[upper]}</h1>
        <p className="text-zinc-400">
          {channels.length} kanala iz ove zemlje
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map((ch) => (
          <Link
            key={ch.id}
            href={`/kanal/${ch.id}`}
            className="group block p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all"
          >
            <h3 className="font-semibold text-lg group-hover:text-amber-400 transition-colors mb-2">
              {ch.name}
              {ch.priority === 1 && (
                <span className="ml-2 text-xs text-amber-400">★</span>
              )}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-3 mb-3">
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
