import type { Metadata, Viewport } from "next";
import "./tv.css";

export const metadata: Metadata = {
  title: "BalkanBiz TV — Android TV",
  description: "Balkanski poslovni YouTube — verzija optimizirana za TV i daljinski upravljač.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function TvLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tv-root">
      {children}
    </div>
  );
}
