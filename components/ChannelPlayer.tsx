"use client";

import { useState, useRef, useEffect } from "react";
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
  const [autoplay, setAutoplay] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  function pickVideo(v: Video) {
    setSelected(v);
    setAutoplay(true);
    requestAnimationFrame(() => {
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (!selected) {
    return (
      <div className="aspect-video rounded-2xl border border-dashed border-zinc-800 flex items-center justify-center text-zinc-500">
        Nema dostupnih videa za prikaz.
      </div>
    );
  }

  const embedSrc = `https://www.youtube.com/embed/${selected.id}?rel=0&modestbranding=1${
    autoplay ? "&autoplay=1" : ""
  }`;

  return (
    <div className="space-y-10" ref={playerRef}>
      {/* Player */}
      <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 bg-black shadow-2xl shadow-black/50 relative">
        <iframe
          key={`${selected.id}-${autoplay}`}
          src={embedSrc}
          title={selected.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Now playing */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] tracking-[0.2em] text-amber-400 mb-2 uppercase font-semibold">
            ▶ Trenutno gleda
          </div>
          <h2 className="font-bold text-2xl sm:text-3xl leading-tight tracking-tight">
            {selected.title}
          </h2>
          {selected.published && (
            <div className="text-sm text-zinc-500 mt-2">
              {channelName} · {timeAgo(selected.published)}
            </div>
          )}
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${selected.id}`}
          target="_blank"
          rel="noopener"
          className="shrink-0 text-xs uppercase tracking-wider px-4 py-2.5 rounded-full border border-zinc-800 hover:border-amber-400 hover:text-amber-400 text-zinc-400 transition-all whitespace-nowrap"
        >
          YouTube ↗
        </a>
      </div>

      {/* Video grid */}
      <div className="border-t border-zinc-900 pt-10">
        <div className="flex items-baseline justify-between mb-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Najnoviji videi
          </h3>
          <span className="text-xs text-zinc-600">{videos.length} ukupno</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v, idx) => {
            const isActive = v.id === selected.id;
            return (
              <button
                key={v.id}
                onClick={() => pickVideo(v)}
                className={`video-card group text-left rounded-xl overflow-hidden border card-lift fade-up ${
                  isActive
                    ? "active border-amber-400/70 bg-amber-400/[0.04] ring-1 ring-amber-400/30"
                    : "border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60"
                }`}
                style={{ animationDelay: `${Math.min(idx * 40, 600)}ms` }}
              >
                <div className="aspect-video relative bg-zinc-900 overflow-hidden">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {isActive && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-zinc-950 bg-amber-400 px-2 py-1 rounded">
                        ● U PLAYERU
                      </span>
                    </div>
                  )}
                  <div className="play-icon-overlay">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="28" cy="28" r="28" fill="rgba(251, 191, 36, 0.95)" />
                      <path d="M22 18L40 28L22 38V18Z" fill="#08080b" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h4
                    className={`font-semibold text-sm leading-snug line-clamp-2 mb-2 transition-colors ${
                      isActive
                        ? "text-amber-400"
                        : "text-zinc-100 group-hover:text-amber-400"
                    }`}
                  >
                    {v.title}
                  </h4>
                  <div className="text-xs text-zinc-500">
                    {timeAgo(v.published)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
