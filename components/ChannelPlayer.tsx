"use client";

import { useState, useRef } from "react";
import type { Video } from "@/lib/youtube";
import { timeAgo } from "@/lib/youtube";

export default function ChannelPlayer({
  videos,
  shorts,
  channelName,
}: {
  videos: Video[];
  shorts: Video[];
  channelName: string;
}) {
  const initial = videos[0] ?? shorts[0] ?? null;
  const [selected, setSelected] = useState<Video | null>(initial);
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
    <div className="space-y-12" ref={playerRef}>
      {/* Player */}
      <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 bg-black shadow-2xl shadow-black/50">
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] sm:text-[11px] tracking-[0.2em] text-amber-400 mb-2 uppercase font-semibold">
            ▶ Trenutno gleda
          </div>
          <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl leading-tight tracking-tight">
            {selected.title}
          </h2>
          {selected.published && (
            <div className="text-xs sm:text-sm text-zinc-500 mt-2">
              {channelName} · {timeAgo(selected.published)}
            </div>
          )}
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${selected.id}`}
          target="_blank"
          rel="noopener"
          className="self-start shrink-0 text-xs uppercase tracking-wider px-4 py-2.5 rounded-full border border-zinc-800 hover:border-amber-400 hover:text-amber-400 text-zinc-400 transition-all whitespace-nowrap"
        >
          YouTube ↗
        </a>
      </div>

      {/* Regular videos */}
      {videos.length > 0 && (
        <VideoSection
          title="Najnoviji videozapisi"
          subtitle={`${videos.length} ${videos.length === 1 ? "video" : "videozapisa"}`}
          videos={videos}
          selected={selected}
          onPick={pickVideo}
          channelName={channelName}
          variant="regular"
        />
      )}

      {/* Shorts */}
      {shorts.length > 0 && (
        <VideoSection
          title="Shortsi"
          subtitle={`${shorts.length} ${shorts.length === 1 ? "short" : "shortsa"}`}
          videos={shorts}
          selected={selected}
          onPick={pickVideo}
          channelName={channelName}
          variant="short"
        />
      )}
    </div>
  );
}

function VideoSection({
  title,
  subtitle,
  videos,
  selected,
  onPick,
  channelName,
  variant,
}: {
  title: string;
  subtitle: string;
  videos: Video[];
  selected: Video | null;
  onPick: (v: Video) => void;
  channelName: string;
  variant: "regular" | "short";
}) {
  const isShort = variant === "short";

  return (
    <section className="border-t border-zinc-900 pt-10">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            {isShort && <span className="mr-2 text-amber-400">▶</span>}
            {title}
          </h3>
          <p className="text-xs text-zinc-600 mt-1">{subtitle}</p>
        </div>
      </div>

      <div
        className={
          isShort
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        }
      >
        {videos.map((v, idx) => {
          const isActive = v.id === selected?.id;
          return (
            <button
              key={v.id}
              onClick={() => onPick(v)}
              className={`video-card group text-left rounded-xl overflow-hidden border card-lift fade-up ${
                isActive
                  ? "active border-amber-400/70 bg-amber-400/[0.04] ring-1 ring-amber-400/30"
                  : "border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60"
              }`}
              style={{ animationDelay: `${Math.min(idx * 35, 600)}ms` }}
            >
              <div
                className={`relative bg-zinc-900 overflow-hidden ${
                  isShort ? "aspect-[9/16]" : "aspect-video"
                }`}
              >
                <img
                  src={
                    isShort
                      ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`
                      : v.thumbnail
                  }
                  alt={v.title}
                  loading="lazy"
                  className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                    isShort ? "object-cover" : "object-cover"
                  }`}
                />
                {isShort && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-[9px] tracking-[0.15em] uppercase font-bold text-zinc-950 bg-amber-400 px-1.5 py-0.5 rounded">
                      Short
                    </span>
                  </div>
                )}
                {isActive && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="text-[9px] tracking-[0.15em] uppercase font-bold text-zinc-950 bg-amber-400 px-1.5 py-0.5 rounded">
                      ● Live
                    </span>
                  </div>
                )}
                <div className="play-icon-overlay">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="28" cy="28" r="28" fill="rgba(251, 191, 36, 0.95)" />
                    <path d="M22 18L40 28L22 38V18Z" fill="#08080b" />
                  </svg>
                </div>
              </div>
              <div className={isShort ? "p-3" : "p-4"}>
                <h4
                  className={`font-semibold leading-snug line-clamp-2 transition-colors ${
                    isShort ? "text-xs" : "text-sm mb-2"
                  } ${
                    isActive
                      ? "text-amber-400"
                      : "text-zinc-100 group-hover:text-amber-400"
                  }`}
                >
                  {v.title}
                </h4>
                {!isShort && (
                  <div className="text-xs text-zinc-500">
                    {timeAgo(v.published)} · {channelName}
                  </div>
                )}
                {isShort && v.published && (
                  <div className="text-[10px] text-zinc-500 mt-1">
                    {timeAgo(v.published)}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
