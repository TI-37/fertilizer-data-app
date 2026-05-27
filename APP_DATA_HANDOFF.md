# Fertilizer Data App Handoff

Last updated: 2026-05-27

## Project Summary

This is a static mobile-first fertilizer and soil logging app.

- Workspace: `C:\Users\tsrwo\OneDrive\ドキュメント\New project`
- Local preview: `http://127.0.0.1:8765/index.html`
- iPhone LAN preview: `http://192.168.86.154:8765/index.html`
- GitHub remote: `https://github.com/TI-37/fertilizer-data-app.git`
- Main branch: `main`
- Important rule: do not push unless the user explicitly says `push`.

## Main Files

- `index.html`: app markup, forms, templates, PWA meta tags.
- `styles.css`: mobile layout, record list UI, chart and mini-bar styling.
- `app.js`: state management, rendering, forms, OCR, chart drawing, record editing.
- `manifest.webmanifest`: PWA metadata.
- `service-worker.js`: app shell cache and network-first navigation handling.
- `icon.svg`: PWA/icon asset.
- `launch-app.ps1`: Windows launcher for app-style Edge/Chrome window and LAN URL output.
- `PROJECT_NOTES.md`: reusable design notes.
- `HANDOFF.md`: older handoff note; may contain stale or mojibake-rendered text.
- `APP_DATA_HANDOFF.md`: this current handoff file.

## Current Product Direction

The app should feel like a compact iPhone-sized work tool, not a landing page.

Implemented workflows:

- Fertilizer record registration.
- Package photo upload.
- OCR attempt for fertilizer package/component text.
- Fertilizer component amount input.
- Animated component bar graph.
- Soil record registration.
- Registration data list view.
- Tap-to-expand record details.
- Inline edit in the record detail view.
- Small animated mini bar graphs in expanded record details.
- PWA setup for home-screen installation.
- Windows app-style launcher using browser `--app=` mode.

## Data Storage

The app stores user data in browser `localStorage`.

- Storage key: `fertilizer-soil-log-v1`
- Shape:

```json
{
  "fertilizers": [],
  "soils": []
}
```

### Fertilizer Record Shape

```json
{
  "id": "uuid",
  "name": "string",
  "type": "string",
  "manufacturer": "string",
  "registeredAt": "YYYY-MM-DD",
  "createdAt": "ISO datetime",
  "updatedAt": "ISO datetime",
  "photo": "data URL or empty string",
  "traits": {
    "effect": "string",
    "kind": "string",
    "nitrogenKind": "string",
    "phosphorusKind": "string",
    "potassiumKind": "string"
  },
  "components": {
    "carbon": 0,
    "hydrogen": 0,
    "oxygen": 0,
    "nitrogen": 0,
    "phosphorus": 0,
    "potassium": 0,
    "calcium": 0,
    "magnesium": 0,
    "sulfur": 0,
    "iron": 0,
    "manganese": 0,
    "zinc": 0,
    "copper": 0,
    "boron": 0,
    "molybdenum": 0,
    "chlorine": 0,
    "nickel": 0
  },
  "memo": "string"
}
```

### Soil Record Shape

```json
{
  "id": "uuid",
  "place": "string",
  "date": "YYYY-MM-DD",
  "texture": "string",
  "crop": "string",
  "createdAt": "ISO datetime",
  "updatedAt": "ISO datetime",
  "components": {
    "ph": 6.5,
    "ec": 0,
    "nitrateNitrogen": 0,
    "ammoniumNitrogen": 0,
    "availablePhosphorus": 0,
    "calcium": 0,
    "magnesium": 0,
    "potassium": 0,
    "cec": 0,
    "phosphateAbsorption": 0,
    "humus": 0,
    "baseSaturation": 0,
    "calciumMagnesiumRatio": 0,
    "magnesiumPotassiumRatio": 0
  },
  "memo": "string"
}
```

Backward compatibility:

- Old soil `n` maps to `nitrateNitrogen`.
- Old soil `p` maps to `availablePhosphorus`.
- Old soil `k` maps to `potassium`.

## UI State And Behavior

- Bottom fixed button is the primary view switch.
- Entry screen button text: registration data.
- Records screen button text: return to input.
- The old top return button in the records header is hidden.
- Records are compact list rows.
- Tapping a record expands details.
- Inline edit appears only after pressing the edit button.
- Edit and delete buttons are intentionally small.
- Details mini-bars must animate every time the details row is opened.
- The `+/-` detail icon is fixed at `22px x 22px` to avoid layout shift.

## Fertilizer Components

Defined by `componentKeys` and `componentLabels` in `app.js`.

Macro elements:

- C
- H
- O
- N
- P
- K
- Ca
- Mg
- S

Micro elements:

- Fe
- Mn
- Zn
- Cu
- B
- Mo
- Cl
- Ni

Hidden compatibility fields remain in `index.html`:

- `nitrogenKind`
- `phosphorusKind`
- `potassiumKind`

These keep existing save/edit code stable after the old NPK selector strip was removed from the visible summary area.

## Soil Components

Defined by `soilLabels` in `app.js`.

- pH
- EC
- nitrate nitrogen
- ammonium nitrogen
- available phosphorus
- calcium
- magnesium
- potassium
- CEC
- phosphate absorption coefficient
- humus
- base saturation
- Ca/Mg
- Mg/K

## OCR

OCR is handled in `app.js`.

Main functions:

- `prepareOcrImage(file)`
- `createOcrVariant(sourceCanvas, mode)`
- `readTextFromImage(src)`
- `readTextFromSingleImage(src)`
- `scoreOcrText(text)`
- `parseFertilizerComponents(text)`
- `findComponentValue(text, aliases)`
- `findNpkRatio(text)`

Current OCR flow:

1. User selects or captures an image with `#packagePhoto`.
2. The app saves a resized photo preview.
3. The app creates multiple OCR image variants:
   - original high-resolution variant
   - contrast-enhanced variant
   - threshold variant
   - dark-text threshold variant
4. The app tries browser `TextDetector` when available.
5. The app falls back to Tesseract.js from jsDelivr.
6. Candidate OCR results are scored.
7. The highest-scoring result is parsed for fertilizer component values.

Current limitation:

- OCR quality still depends heavily on real package photo quality.
- Best future improvement is to collect 2-3 failed sample photos plus expected component values, then tune aliases and parsing rules.

## PWA

Current PWA files:

- `manifest.webmanifest`
- `service-worker.js`
- `icon.svg`

Current manifest highlights:

- `id`: `./index.html`
- `start_url`: `./index.html`
- `scope`: `./`
- `display`: `standalone`
- `display_override`: `["standalone", "minimal-ui"]`
- `orientation`: `portrait`

Current cache:

- `CACHE_NAME`: `fertilizer-data-app-v15`
- Asset query suffix: `20260527-pwa-ocr`

When changing CSS, JS, manifest, or service worker:

1. Update CSS query string in `index.html`.
2. Update JS query string in `index.html`.
3. Update manifest query string in `index.html` if manifest changed.
4. Update `CACHE_NAME` in `service-worker.js`.
5. Update matching app shell URLs in `service-worker.js`.

This avoids stale mobile/PWA caches.

## iOS App-Like Launch Notes

Opening the URL in Safari or the Codex in-app browser will still show browser UI.

For iOS app-like display:

1. Open the app URL in iPhone Safari.
2. Tap Share.
3. Tap Add to Home Screen.
4. Launch from the new home-screen icon.

Important:

- A normal Safari tab is not standalone mode.
- Chrome, LINE in-app browser, and Codex in-app browser are not standalone mode.
- LAN HTTP URLs such as `http://192.168...` may be treated as regular bookmarks by iOS.
- The more reliable production path is HTTPS, for example GitHub Pages.

Potential future public URL if GitHub Pages is enabled:

```text
https://ti-37.github.io/fertilizer-data-app/
```

Potential future app entry path:

```text
https://ti-37.github.io/fertilizer-data-app/app/
```

## Windows App-Style Launch

Use:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\launch-app.ps1
```

What it does:

- Starts a local Python static server on port `8765` when needed.
- Binds the server to `0.0.0.0` so LAN devices can access it.
- Opens Edge or Chrome in `--app=` mode for a browser-chrome-free desktop window.
- Prints the iPhone LAN URL when it can detect one.

## Local Preview

If the server is not running:

```powershell
Start-Process -FilePath 'C:\Users\tsrwo\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -ArgumentList @('-m','http.server','8765','--bind','0.0.0.0') -WorkingDirectory 'C:\Users\tsrwo\OneDrive\ドキュメント\New project' -WindowStyle Hidden
```

Then open:

```text
http://127.0.0.1:8765/index.html
```

For iPhone on the same Wi-Fi:

```text
http://192.168.86.154:8765/index.html
```

## Verification Commands

Use bundled Node:

```powershell
& 'C:\Users\tsrwo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check app.js
& 'C:\Users\tsrwo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check service-worker.js
& 'C:\Users\tsrwo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' -e "const fs=require('fs'); JSON.parse(fs.readFileSync('manifest.webmanifest','utf8')); console.log('manifest ok')"
```

## Git Notes

- User allows push only when explicitly requested.
- Current latest pushed commit at the time of this handoff:
  - `3ffca99 Improve PWA launch and OCR preprocessing`
- `launch-app.ps1` was added after that commit and may be untracked unless committed later.

Before pushing:

```powershell
git status --short --branch
git diff --stat
```

Then stage, commit, and push only after the user says `push`.

## Suggested First Prompt For New Chat

```text
このプロジェクトを引き継いでください。まず APP_DATA_HANDOFF.md を読んで、index.html / styles.css / app.js / manifest.webmanifest / service-worker.js / launch-app.ps1 の現状を把握してください。push はこちらが明示するまでしないでください。
```
