import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
    <html lang="hr">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased">
        <header className="border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">📺</span>
              <span className="font-bold text-lg group-hover:text-amber-400 transition-colors">
                BalkanBiz<span className="text-amber-400">.tv</span>
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/kanali"
                className="text-zinc-400 hover:text-amber-400 transition-colors"
              >
                Svi kanali
              </Link>
              <Link
                href="/o-projektu"
                className="text-zinc-400 hover:text-amber-400 transition-colors hidden sm:inline"
              >
                O projektu
              </Link>
              <a
                href="https://github.com/toma2502/balkanbiz-tv"
                target="_blank"
                rel="noopener"
                className="text-zinc-400 hover:text-amber-400 transition-colors hidden sm:inline"
              >
                GitHub
              </a>
            </div>
          </nav>
        </header>
        <main className="min-h-[80vh]">{children}</main>
        <footer className="border-t border-zinc-800/80 mt-32 py-12 text-center text-sm text-zinc-500">
          <div className="max-w-7xl mx-auto px-6 space-y-2">
            <p>
              Open source projekt · MIT licenca · Sav video sadržaj pripada svojim autorima i hosta se na YouTubeu.
            </p>
            <p className="text-zinc-600">
              <a
                href="https://github.com/toma2502/balkanbiz-tv"
                target="_blank"
                rel="noopener"
                className="hover:text-amber-400"
              >
                Doprinesi na GitHubu
              </a>
              {" · "}
              Ne hostamo videe · Ne pratimo korisnike · Bez oglasa
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
