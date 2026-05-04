import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BalkanBiz TV — Balkanski poslovni YouTube na jednom mjestu",
  description:
    "Kuriran katalog poslovnih, marketinških, financijskih i tech YouTube kanala iz Hrvatske, Srbije, BiH, Slovenije, Makedonije i Crne Gore. Open source, bez algoritma, bez praćenja.",
  openGraph: {
    title: "BalkanBiz TV",
    description:
      "Balkanski poslovni YouTube — kurirano, kategorizirano, na našem jeziku.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={inter.variable}>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        {/* Global ambient video — fixed iza cijele stranice */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-bg-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(1.15) brightness(1.05)" }}
            aria-hidden
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Lakša overlay maska — propušta video, ali zadržava čitljivost teksta */}
          <div className="absolute inset-0 bg-zinc-950/55" />
          {/* Suptilni gradient na bottom za bolji prijelaz s footerom */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
        <header className="border-b border-zinc-900/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="w-7 h-7 rounded-md bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-sm">
                B
              </span>
              <span className="font-bold text-base tracking-tight group-hover:text-amber-400 transition-colors">
                BalkanBiz<span className="text-amber-400">.tv</span>
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <Link
                href="/kanali"
                className="hover:text-amber-400 transition-colors"
              >
                Kanali
              </Link>
              <Link
                href="/o-projektu"
                className="hover:text-amber-400 transition-colors hidden sm:inline"
              >
                O projektu
              </Link>
              <a
                href="https://github.com/toma2502/balkanbiz-tv"
                target="_blank"
                rel="noopener"
                className="hover:text-amber-400 transition-colors hidden sm:inline"
              >
                GitHub
              </a>
            </div>
          </nav>
        </header>
        <main className="min-h-[80vh]">{children}</main>
        <MetaPixel />
        <footer className="border-t border-zinc-900/80 mt-32">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-7 h-7 rounded-md bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-sm">
                    B
                  </span>
                  <span className="font-bold text-base tracking-tight">
                    BalkanBiz<span className="text-amber-400">.tv</span>
                  </span>
                </div>
                <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
                  Open-source kuriran katalog balkanskih poslovnih YouTube kanala. Bez algoritma, bez ad-mreža.
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-2 text-sm">
                <a
                  href="https://github.com/toma2502/balkanbiz-tv"
                  target="_blank"
                  rel="noopener"
                  className="text-zinc-400 hover:text-amber-400"
                >
                  Doprinesi na GitHubu →
                </a>
                <Link
                  href="/o-projektu"
                  className="text-zinc-400 hover:text-amber-400"
                >
                  O projektu →
                </Link>
                <span className="text-xs text-zinc-600 mt-2">
                  MIT licenca · Ne hostamo videe · Bez ad-mreža
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
