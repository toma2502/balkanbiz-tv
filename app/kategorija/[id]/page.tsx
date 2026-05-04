import Link from "next/link";
import { notFound } from "next/navigation";
import {
  data,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
  getChannelsByCategory,
} from "@/lib/data";

export async function generateStaticParams() {
  return data.categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = data.categories.find((c) => c.id === id);
  return {
    title: `${cat?.label ?? "Kategorija"} — BalkanBiz TV`,
    description: `Balkanski YouTube kanali u kategoriji ${cat?.label}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = data.categories.find((c) => c.id === id);
  if (!cat) notFound();

  const channels = getChannelsByCategory(id).sort(
    (a, b) => (a.priority ?? 9) - (b.priority ?? 9)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-zinc-500 hover:text-amber-400">
        ← Početna
      </Link>
      <div className="mt-6 mb-12">
        <div className="text-5xl mb-4">{cat.icon}</div>
        <h1 className="text-4xl font-bold mb-2">{cat.label}</h1>
        <p className="text-zinc-400">
          {channels.length} {channels.length === 1 ? "kanal" : "kanala"} u ovoj kategoriji
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
            <p className="text-sm text-zinc-400 line-clamp-3">
              {ch.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
