import { getLatestFeed } from "@/lib/feed";
import { data } from "@/lib/data";
import TvShell from "./TvShell";

export const revalidate = 600;

export const metadata = {
  title: "BalkanBiz TV — Android TV",
  description: "Balkanski poslovni YouTube optimiziran za TV.",
};

export default async function TvHomePage() {
  const items = await getLatestFeed(120);

  // Group by country for rows
  const byCountry: Record<string, typeof items> = {};
  for (const it of items) {
    (byCountry[it.country] ??= []).push(it);
  }

  // Trending = top 24 mixed
  const trending = items.slice(0, 24);

  return (
    <TvShell
      trending={trending}
      byCountry={byCountry}
      categories={data.categories}
    />
  );
}
