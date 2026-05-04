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
    "Kuriran katalog poslovnih, marketinških, financijskih i tech YouTube kanala iz Hrvatske, Srbije, BiH, Slovenije, Makedonije i Crne Gore. Open source, bez algoritma.",
  openGraph: {
    title: "BalkanBiz TV",
    description:
      "Balkanski poslovni YouTube — kurirano, kategorizirano, na našem jeziku.",
    type: "website",
  },
  formatDetection: { telephone: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08080b",
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
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <span className="w-7 h-7 rounded-md bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-sm">
                B
              </span>
              <span className="font-bold text-sm sm:text-base tracking-tight group-hover:text-amber-400 transition-colors">
                BalkanBiz<span className="text-amber-400">.tv</span>
              </span>
            </Link>
            <div className="flex items-center gap-4 sm:gap-6 text-sm text-zinc-400">
              <Link
                href="/feed"
                className="hover:text-amber-400 transition-colors font-medium"
              >
                Feed
              </Link>
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
                aria-label="GitHub"
                className="hover:text-amber-400 transition-colors"
              >
                {/* Icon on mobile, text on desktop */}
                <span className="hidden sm:inline">GitHub</span>
                <svg
                  className="sm:hidden w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </a>
            </div>
          </nav>
        </header>
        <main className="min-h-[80vh]">{children}</main>
        <MetaPixel />
        <footer className="border-t border-zinc-900/80 mt-20 sm:mt-32">
          <div className="max-w-7xl mx-auto px-6 py-10 sm:py-16">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-8">
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
