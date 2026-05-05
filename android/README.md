# BalkanBiz TV — Android TV APK

Wrapper za Android TV preko **Trusted Web Activity (TWA)** koji uvijek povlači najnoviju verziju s `https://balkanbiz.live/tv`.

## Kako radi

```
┌───────────────────────┐
│ APK (Android TV)      │
│  ┌─────────────────┐  │
│  │ Chrome WebView  │──┼──► https://balkanbiz.live/tv
│  └─────────────────┘  │       ↑
└───────────────────────┘    Vercel deploy
                             auto update
```

Svaki put kad pushneš na main → Vercel deploya → **APK automatski vidi novu verziju** pri sljedećem pokretanju (jer učitava live URL kroz WebView).

## Build APK-a (jednokratno, ~10 min)

### 1. Instaliraj Bubblewrap CLI

```bash
npm install -g @bubblewrap/cli
```

Treba ti i Java JDK 17 — Bubblewrap će ti reći kad treba.

### 2. Init projekta (radi se samo prvi put)

```bash
cd ~/Desktop/dev/balkanbiz-tv-app/android
bubblewrap init --manifest=https://balkanbiz.live/manifest.webmanifest
```

Bubblewrap će pitati par stvari (host, package name, signing key) — koristi defaultove ili:
- Application name: `BalkanBiz TV`
- Package: `live.balkanbiz.tv`
- Display mode: `standalone`
- Orientation: `landscape`

### 3. Generiraj signing keystore (jednokratno)

```bash
bubblewrap build
```

Ovo kreira `*.apk` i `*.aab` u trenutnom direktoriju.

### 4. Asset Links — povezivanje domene s APK-om

Bubblewrap će ti dati JSON za stavi na `https://balkanbiz.live/.well-known/assetlinks.json`. Stavi ga u `public/.well-known/assetlinks.json` u glavnom Next projektu pa redeploy.

### 5. Distribucija

- **Side-load**: prebaci APK preko ADB ili USB stick na Android TV → `adb install app.apk`
- **GitHub Releases**: upload APK → korisnici skidaju s repo Releases page-a
- **F-Droid**: opcionalno za open source distribution

## Re-build kad treba

Većina promjena ne zahtijeva novi APK — samo Vercel deploy. APK ti treba ponovo buildati samo kad mijenjaš:
- Naziv aplikacije
- Ikona
- Package name
- Manifest categories
- Native permissions

```bash
cd ~/Desktop/dev/balkanbiz-tv-app/android
bubblewrap update
bubblewrap build
```

## Distribucija na Smart TV-ove

Android TV (Mi Box, Nvidia Shield, Chromecast s Google TV, Fire TV s Aurora Store):
- Side-load APK preko USB ili network ADB

Tizen (Samsung) i webOS (LG) ne podržavaju TWA — za njih bi trebalo posebno rješenje (Tizen native ili LG webOS bundle).
