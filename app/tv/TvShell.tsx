"use client";

import { useEffect, useRef, useState } from "react";
import type { FeedItem } from "@/lib/feed";
import type { Category } from "@/lib/data";
import { COUNTRY_FLAGS, COUNTRY_NAMES } from "@/lib/data";

type Props = {
  trending: FeedItem[];
  byCountry: Record<string, FeedItem[]>;
  categories: Category[];
};

type Section = "trending" | "country" | "category";

export default function TvShell({ trending, byCountry, categories }: Props) {
  const [active, setActive] = useState<{ type: Section; key?: string }>({
    type: "trending",
  });
  const [playing, setPlaying] = useState<FeedItem | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ESC and Back button to close player
  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        setPlaying(null);
      }
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  // Active rows to render
  let rows: { title: string; items: FeedItem[] }[] = [];
  if (active.type === "trending") {
    rows.push({ title: "U trendu — sve s Balkana", items: trending });
    Object.entries(byCountry).forEach(([country, items]) => {
      if (items.length === 0) return;
      rows.push({
        title: `${COUNTRY_FLAGS[country] ?? ""} ${COUNTRY_NAMES[country] ?? country}`,
        items: items.slice(0, 18),
      });
    });
  } else if (active.type === "country" && active.key) {
    rows.push({
      title: `${COUNTRY_FLAGS[active.key] ?? ""} ${COUNTRY_NAMES[active.key] ?? active.key}`,
      items: byCountry[active.key] ?? [],
    });
  } else if (active.type === "category" && active.key) {
    const all: FeedItem[] = Object.values(byCountry).flat();
    const cat = categories.find((c) => c.id === active.key);
    rows.push({
      title: `${cat?.icon ?? ""} ${cat?.label ?? active.key}`,
      items: all.filter((v) => v.channelCategories.includes(active.key!)),
    });
  }

  const countryKeys = Object.keys(byCountry);

  return (
    <div className="tv-shell">
      <div className="tv-brand">
        <span className="tv-brand-mark">B</span>
        <span className="tv-brand-text">
          BalkanBiz<span style={{ color: "#fbbf24" }}>.tv</span>
        </span>
      </div>

      {/* Sidebar nav */}
      <nav className="tv-sidebar" style={{ paddingTop: 80 }}>
        <button
          className={`tv-nav-btn ${active.type === "trending" ? "active" : ""}`}
          onClick={() => setActive({ type: "trending" })}
          autoFocus
        >
          🏠 Početna
        </button>

        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "16px 18px 4px", letterSpacing: 1 }}>
          ZEMLJE
        </div>
        {countryKeys.map((c) => (
          <button
            key={c}
            className={`tv-nav-btn ${
              active.type === "country" && active.key === c ? "active" : ""
            }`}
            onClick={() => setActive({ type: "country", key: c })}
          >
            <span style={{ fontSize: 20 }}>{COUNTRY_FLAGS[c]}</span>
            {COUNTRY_NAMES[c]}
          </button>
        ))}

        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "16px 18px 4px", letterSpacing: 1 }}>
          KATEGORIJE
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tv-nav-btn ${
              active.type === "category" && active.key === cat.id ? "active" : ""
            }`}
            onClick={() => setActive({ type: "category", key: cat.id })}
          >
            <span style={{ fontSize: 18 }}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="tv-content">
        {rows.map((row, idx) => (
          <section key={idx} className="tv-row">
            <h2 className="tv-row-title">{row.title}</h2>
            {row.items.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.4)" }}>Nema sadržaja.</p>
            ) : (
              <div className="tv-grid">
                {row.items.map((v) => (
                  <button
                    key={v.id + v.channelSlug}
                    className="tv-card"
                    onClick={() => setPlaying(v)}
                  >
                    <img
                      className="tv-thumb"
                      src={v.isShort ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : v.thumbnail}
                      alt={v.title}
                      loading="lazy"
                    />
                    <div className="tv-meta">
                      <h3 className="tv-title">{v.title}</h3>
                      <div className="tv-sub">
                        {v.channelAvatar && (
                          <img className="tv-avatar" src={v.channelAvatar} alt="" />
                        )}
                        <span>{v.channelName}</span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                        <span>{COUNTRY_FLAGS[v.country]}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Fullscreen player */}
      {playing && (
        <div className="tv-player-overlay">
          <button
            ref={closeBtnRef}
            className="tv-player-close"
            onClick={() => setPlaying(null)}
            autoFocus
          >
            ✕ Zatvori (BACK)
          </button>
          <div className="tv-player-frame">
            <iframe
              src={`https://www.youtube.com/embed/${playing.id}?autoplay=1&rel=0&modestbranding=1`}
              title={playing.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
