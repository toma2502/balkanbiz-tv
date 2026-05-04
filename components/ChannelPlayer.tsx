"use client";

import { useState } from "react";
import type { Video } from "@/lib/youtube";
import { timeAgo } from "@/lib/youtube";

export default function ChannelPlayer({
  videos,
  channelName,
}: {
  videos: Video[];
  channelName: string;
}) {
  const [selected, setSelected] = useState<Video | null>(videos[0] ?? null);

  if (!selected) {
    return (
      <div className="aspect-video rounded-xl border border-dashed border-zinc-800 flex items-center justify-center text-zinc-500">
        Nema dostupnih videa za prikaz.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Player */}
      <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black">
        <iframe
          key={selected.id}
          src={`https://www.youtube.com/embed/${selected.id}?autoplay=0&rel=0`}
          title={selected.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Now playing */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs text-amber-400 mb-1">Trenutno gleda</div>
          <h2 className="font-semibold text-lg sm:text-xl leading-snug">
            {selected.title}
          </h2>
          {selected.published && (
            <div className="text-xs text-zinc-500 mt-1">
              {timeAgo(selected.published)}
            </div>
          )}
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${selected.id}`}
          target="_blank"
          rel="noopener"
          className="shrink-0 text-xs px-3 py-1.5 rounded-md border border-zinc-800 hover:border-zinc-700 text-zinc-300 transition-colors"
        >
          Otvori ↗
        </a>
      </div>

      {/* Video grid */}
      <div className="border-t border-zinc-900 pt-6">
        <h3 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wide">
          Najnoviji videi {videos.length > 1 && `· ${videos.length} ukupno`}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => {
            const isActive = v.id === selected.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                className={`group text-left rounded-xl overflow-hidden border transition-all ${
                  isActive
                    ? "border-amber-400/60 bg-amber-400/5"
                    : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60"
                }`}
              >
                <div className="aspect-video relative bg-zinc-900">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-amber-400/10 flex items-center justify-center">
                      <span className="text-amber-400 text-xs font-semibold px-2 py-1 rounded bg-zinc-950/80">
                        ▶ U PLAYERU
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4
                    className={`font-medium text-sm leading-snug line-clamp-2 ${
                      isActive
                        ? "text-amber-400"
                        : "group-hover:text-amber-400 transition-colors"
                    }`}
                  >
                    {v.title}
                  </h4>
                  {v.published && (
                    <div className="text-xs text-zinc-500 mt-2">
                      {timeAgo(v.published)} · {channelName}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
