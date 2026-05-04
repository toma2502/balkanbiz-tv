export const metadata = {
  title: "O projektu — BalkanBiz TV",
  description:
    "BalkanBiz TV je open-source kuriran katalog poslovnih YouTube kanala iz balkanskih zemalja.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-invert">
      <h1 className="text-4xl font-bold mb-8">O projektu</h1>

      <p className="text-lg text-zinc-300 leading-relaxed">
        BalkanBiz TV je nekomercijalni, open-source katalog YouTube kanala koji se bave poslovnim, marketinškim, financijskim i tehnološkim temama na hrvatskom, srpskom, bosanskom, slovenskom, makedonskom i crnogorskom jeziku.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4">Zašto postoji</h2>
      <p className="text-zinc-400 leading-relaxed">
        YouTube algoritam optimizira za vrijeme gledanja i zabavu, ne za poslovni razvoj. Ovdje ne postoji algoritam — samo ručno odabrana lista kanala koje vrijedi pratiti ako se baviš ili razmišljaš o vlastitom poslu.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4">Što ne radimo</h2>
      <ul className="text-zinc-400 leading-relaxed space-y-2">
        <li>· Ne hostamo videe — sve dolazi izravno s YouTubea kroz službeni embed</li>
        <li>· Ne pratimo korisnike — bez analitike, bez kolačića, bez fingerprintinga</li>
        <li>· Ne prikazujemo oglase — projekt nema poslovni model, freeware je</li>
        <li>· Ne tvrdimo da smo povezani s YouTubeom ili Googleom</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4">Što radimo</h2>
      <ul className="text-zinc-400 leading-relaxed space-y-2">
        <li>· Održavamo listu kanala u javnom GitHub repozitoriju</li>
        <li>· Prihvaćamo prijedloge novih kanala kroz GitHub issues</li>
        <li>· Provjeravamo da kanali zaista objavljuju kvalitetan poslovni sadržaj</li>
        <li>· Razvijamo Android TV verziju za gledanje na televizoru (forkano iz SmartTube projekta)</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4">Kako doprinijeti</h2>
      <p className="text-zinc-400 leading-relaxed">
        Ako znaš za kvalitetan kanal koji nedostaje, otvori issue na GitHubu ili pošalji pull request s izmjenom <code className="text-amber-400">data.json</code> datoteke. Svi prijedlozi se ručno provjeravaju.
      </p>

      <div className="mt-8">
        <a
          href="https://github.com/toma2502/balkanbiz-tv"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors"
        >
          Otvori na GitHubu ↗
        </a>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Pravna napomena</h2>
      <p className="text-zinc-500 text-sm leading-relaxed">
        BalkanBiz TV nije povezan s YouTubeom ili Googleom. Sav video sadržaj pripada svojim autorima i hosta se na YouTube serverima. Ova stranica koristi službeni YouTube embed mehanizam i ne provodi nikakvo automatizirano dohvaćanje sadržaja izvan dozvoljenog YouTube TOS-a. Pojavljivanje ili nepojavljivanje kanala na ovoj stranici ne predstavlja stav o kvaliteti tog kanala — kuriranje je subjektivno.
      </p>
    </div>
  );
}
