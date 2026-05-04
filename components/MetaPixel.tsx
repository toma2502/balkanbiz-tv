"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fbq?: any;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const STORAGE_KEY = "balkanbiz-consent";

type Consent = "granted" | "denied" | null;

function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "granted" || v === "denied") return v;
  return null;
}

function setConsent(value: Consent) {
  if (typeof window === "undefined") return;
  if (value === null) localStorage.removeItem(STORAGE_KEY);
  else localStorage.setItem(STORAGE_KEY, value);
}

function loadPixel(pixelId: string) {
  if (typeof window === "undefined") return;
  if (window.fbq) return;
  // Standard Meta Pixel snippet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");
}

export default function MetaPixel() {
  const [consent, setConsentState] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsentState(getConsent());
  }, []);

  useEffect(() => {
    if (consent === "granted" && PIXEL_ID) {
      loadPixel(PIXEL_ID);
    }
  }, [consent]);

  function accept() {
    setConsent("granted");
    setConsentState("granted");
  }
  function decline() {
    setConsent("denied");
    setConsentState("denied");
  }
  function reset() {
    setConsent(null);
    setConsentState(null);
  }

  // Don't render during SSR (mismatch). Hide after consent set.
  if (!mounted) return null;

  return (
    <>
      {/* Banner — only when consent === null */}
      {consent === null && (
        <div className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-md shadow-2xl shadow-black/50 p-5 sm:p-6">
            <h3 className="font-semibold text-zinc-100 mb-2 text-sm sm:text-base">
              Kolačići i Meta Pixel
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
              Koristimo Meta Pixel kako bismo razumjeli koji kanali zanimaju zajednicu i ponekad informirali zainteresirane o novim sadržajima i događanjima na Facebooku/Instagramu. Bez tvog pristanka, Pixel se ne pokreće.{" "}
              <a
                href="/o-projektu"
                className="text-amber-400 hover:underline"
              >
                Saznaj više
              </a>
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={accept}
                className="px-4 py-2 rounded-full bg-amber-400 text-zinc-950 text-sm font-semibold hover:bg-amber-300 transition-colors"
              >
                Prihvaćam
              </button>
              <button
                onClick={decline}
                className="px-4 py-2 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-300 text-sm font-medium transition-colors"
              >
                Samo nužni
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent settings link */}
      <div
        id="cookie-settings"
        className="fixed bottom-3 right-3 z-50"
      >
        {consent !== null && (
          <button
            onClick={reset}
            className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border border-zinc-800/70 bg-zinc-950/70 backdrop-blur text-zinc-500 hover:text-amber-400 hover:border-amber-400 transition-colors"
            title={
              consent === "granted"
                ? "Pixel je aktivan. Klikni za promjenu."
                : "Pixel je odbijen. Klikni za promjenu."
            }
          >
            Kolačići: {consent === "granted" ? "ON" : "OFF"}
          </button>
        )}
      </div>

      {/* noscript fallback */}
      {PIXEL_ID && consent === "granted" && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      )}
    </>
  );
}
