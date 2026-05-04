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
        BalkanBiz TV je open-source kuriran katalog YouTube kanala koji se bave poslovnim, marketinškim, financijskim i tehnološkim temama na hrvatskom, srpskom, bosanskom, slovenskom, makedonskom i crnogorskom jeziku.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4">Zašto postoji</h2>
      <p className="text-zinc-400 leading-relaxed">
        YouTube algoritam optimizira za vrijeme gledanja i zabavu, ne za poslovni razvoj. Ovdje ne postoji algoritam — samo ručno odabrana lista kanala koje vrijedi pratiti ako se baviš ili razmišljaš o vlastitom poslu.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4">Što ne radimo</h2>
      <ul className="text-zinc-400 leading-relaxed space-y-2 list-none pl-0">
        <li>· Ne hostamo videe — sve dolazi izravno s YouTubea kroz službeni embed</li>
        <li>· Ne ubacujemo Google AdSense ili slične ad-mreže oko videa</li>
        <li>· Ne pratimo korisnike trackerima trećih strana</li>
        <li>· Ne tvrdimo da smo povezani s YouTubeom ili Googleom</li>
        <li>· Ne kradimo ničije autorske prihode — svaki view ide kroz YouTube i autor zaslužuje monetizaciju</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4">Što radimo i što planiramo</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">
        Projekt je trenutno besplatan i otvoren za sve. U budućnosti ostavljamo prostor za <strong className="text-zinc-300">transparentnu suradnju</strong> koja čuva korisničko iskustvo:
      </p>
      <ul className="text-zinc-400 leading-relaxed space-y-2 list-none pl-0">
        <li>· Sponzorirana sekcija za <strong className="text-zinc-300">poslovne konferencije, seminare i edukacije</strong> — uvijek jasno označeno kao „Sponzorirano"</li>
        <li>· Newsletter s preporukama događaja i novih kanala</li>
        <li>· Eventualne premium funkcionalnosti za firme (timske playliste, transkripti, sažetci)</li>
        <li>· Suradnje s pojedinim kanalima oko cross-promocije, bez utjecaja na uredničku kuriranu listu</li>
      </ul>
      <p className="text-zinc-400 leading-relaxed mt-4">
        Što god dodali, jezgra projekta — pristup kuriranom katalogu kanala — ostaje besplatna i bez praćenja.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4">Kako doprinijeti</h2>
      <p className="text-zinc-400 leading-relaxed">
        Ako znaš za kvalitetan kanal koji nedostaje, otvori issue na GitHubu ili pošalji pull request s izmjenom <code className="text-amber-400">data.json</code> datoteke. Svi prijedlozi se ručno provjeravaju.
      </p>
      <p className="text-zinc-400 leading-relaxed mt-3">
        Ako organiziraš poslovnu konferenciju ili event i želiš se predstaviti zajednici, javi se direktno — uvijek smo otvoreni za relevantne suradnje.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://github.com/toma2502/balkanbiz-tv"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors"
        >
          Otvori na GitHubu ↗
        </a>
        <a
          href="mailto:kontakt@simplexdigital.agency?subject=BalkanBiz%20TV%20-%20suradnja"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-800 hover:border-amber-400 hover:text-amber-400 text-zinc-300 font-medium transition-colors"
        >
          Kontakt za suradnju
        </a>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Pravna napomena</h2>
      <p className="text-zinc-500 text-sm leading-relaxed">
        BalkanBiz TV nije povezan s YouTubeom ili Googleom. Sav video sadržaj pripada svojim autorima i hosta se na YouTube serverima. Ova stranica koristi službeni YouTube embed mehanizam i ne provodi automatizirano dohvaćanje sadržaja izvan dozvoljenog YouTube TOS-a. Pojavljivanje ili nepojavljivanje kanala na ovoj stranici ne predstavlja stav o kvaliteti tog kanala — kuriranje je subjektivno. Eventualne plaćene sekcije bit će uvijek vidljivo označene oznakom „Sponzorirano".
      </p>
    </div>
  );
}
