import FeedGrid from "@/components/FeedGrid";
import { getLatestFeed } from "@/lib/feed";

export const metadata = {
  title: "Feed — Najnoviji videozapisi sa svih kanala — BalkanBiz TV",
  description:
    "Sve najnovije sa svih balkanskih poslovnih YouTube kanala na jednom mjestu. Filtriraj po zemlji, temi, ili tipu (Shorts ili regularni videozapisi).",
};

export const revalidate = 600;

export default async function FeedPage() {
  const items = await getLatestFeed();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      <div className="mb-8 sm:mb-10 max-w-3xl">
        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-2 sm:mb-3">
          Feed · {items.length} najnovijih
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-3 sm:mb-4">
          Sve s Balkana, na jednom mjestu
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          Najnoviji videozapisi sa svih kuriranih kanala — sortirano po datumu, miješano poput pravog feeda. Bez algoritamskog preusmjeravanja.
        </p>
      </div>

      <FeedGrid items={items} />
    </div>
  );
}
