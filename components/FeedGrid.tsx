"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FeedItem } from "@/lib/feed";
import { timeAgo } from "@/lib/youtube";
import { COUNTRY_FLAGS, COUNTRY_NAMES, data } from "@/lib/data";

type FilterType = "all" | "regular" | "short";

export default function FeedGrid({ items }: { items: FeedItem[] }) {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterCountry, setFilterCountry] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<FeedItem | null>(null);

  const countries = useMemo(
    () => [...new Set(items.map((i) => i.country))].sort(),
    [items]
  );

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filterType === "regular" && i.isShort) return false;
      if (filterType === "short" && !i.isShort) return false;
      if (filterCountry !== "all" && i.country !== filterCountry) return false;
      if (
        filterCategory !== "all" &&
        !i.channelCategories.includes(filterCategory)
      )
        return false;
      return true;
    });
  }, [items, filterType, filterCountry, filterCategory]);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-[56px] sm:top-[64px] z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 sm:py-4 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900/60 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {/* Type filter */}
          <div className="flex gap-1 p-1 rounded-full border border-zinc-800 bg-zinc-900/40">
            {(["all", "regular", "short"] as FilterType[]).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  filterType === t
                    ? "bg-amber-400 text-zinc-950 font-semibold"
                    : "text-zinc-400 hover:text-amber-400"
                }`}
              >
                {t === "all" ? "Sve" : t === "regular" ? "Videi" : "Shortsi"}
              </button>
            ))}
          </div>

          {/* Country filter */}
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="text-xs px-3 py-2 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-amber-400 transition-colors cursor-pointer"
          >
            <option value="all">🌍 Sve zemlje</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {COUNTRY_FLAGS[c]} {COUNTRY_NAMES[c]}
              </option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs px-3 py-2 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-amber-400 transition-colors cursor-pointer"
          >
            <option value="all">Sve teme</option>
            {data.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>

          <span className="text-xs text-zinc-500 ml-auto">
            {filtered.length} {filtered.length === 1 ? "video" : "videozapisa"}
          </span>
        </div>
      </div>

      {/* Inline player modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-5xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-black">
              <iframe
                key={activeVideo.id}
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-bold text-lg sm:text-xl text-zinc-100 leading-tight">
                  {activeVideo.title}
                </h2>
                <Link
                  href={`/kanal/${activeVideo.channelSlug}`}
                  className="text-sm text-amber-400 hover:underline mt-1 inline-block"
                  onClick={() => setActiveVideo(null)}
                >
                  {activeVideo.channelName} ↗
                </Link>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="shrink-0 text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-zinc-800 hover:border-amber-400 hover:text-amber-400 text-zinc-400 transition-all"
              >
                Zatvori ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filtered.map((v, idx) => (
          <button
            key={v.id + v.channelSlug}
            onClick={() => setActiveVideo(v)}
            className="group text-left rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-900/30 hover:border-amber-400/50 hover:bg-zinc-900/60 transition-all card-lift fade-up"
            style={{ animationDelay: `${Math.min(idx * 25, 600)}ms` }}
          >
            <div className="relative aspect-video bg-zinc-900 overflow-hidden">
              <img
                src={
                  v.isShort
                    ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`
                    : v.thumbnail
                }
                alt={v.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {v.isShort && (
                <span className="absolute top-2 left-2 z-10 text-[9px] tracking-[0.15em] uppercase font-bold text-zinc-950 bg-amber-400 px-1.5 py-0.5 rounded">
                  Short
                </span>
              )}
              <span className="absolute top-2 right-2 z-10 text-[10px] text-zinc-300 bg-zinc-950/80 backdrop-blur px-2 py-0.5 rounded">
                {COUNTRY_FLAGS[v.country]}
              </span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="28" fill="rgba(251,191,36,0.95)" />
                  <path d="M22 18L40 28L22 38V18Z" fill="#08080b" />
                </svg>
              </div>
            </div>
            <div className="p-3 sm:p-4 flex gap-3">
              {v.channelAvatar ? (
                <img
                  src={v.channelAvatar}
                  alt={v.channelName}
                  loading="lazy"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-800 shrink-0 mt-0.5"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-amber-400/20 ring-1 ring-amber-400/30 shrink-0 flex items-center justify-center text-amber-400 text-xs font-bold mt-0.5">
                  {v.channelName.slice(0, 1)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-zinc-100 group-hover:text-amber-400 transition-colors">
                  {v.title}
                </h3>
                <div className="text-xs text-zinc-500 mt-1.5 truncate">
                  {v.channelName}
                </div>
                <div className="text-xs text-zinc-600 mt-0.5">
                  {timeAgo(v.published)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          Nema videa za odabrane filtre. Pokušaj promijeniti filter.
        </div>
      )}
    </div>
  );
}
