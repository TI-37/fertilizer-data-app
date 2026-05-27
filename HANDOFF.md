# Fertilizer Data App Handoff

## Project

- Workspace: `C:\Users\tsrwo\OneDrive\ドキュメント\New project`
- App type: static HTML/CSS/JavaScript app
- Main files:
  - `index.html`
  - `styles.css`
  - `app.js`
  - `manifest.webmanifest`
  - `service-worker.js`
  - `icon.svg`
  - `PROJECT_NOTES.md`
- Preview URL: `http://127.0.0.1:8765/index.html`
- GitHub remote: `https://github.com/TI-37/fertilizer-data-app.git`
- Important: do not push unless the user explicitly says `push`.

## Current App Direction

This is a fertilizer and soil data logging app optimized for iPhone-sized mobile layout.

Core features implemented:

- Fertilizer data registration
- Package photo upload and OCR attempt
- Component amount input
- Animated component bar graph
- Soil data registration
- Registration data list view
- Tap-to-expand record details
- Inline edit inside the registration data view
- Small animated mini bar graphs in record details
- PWA support for home screen installation

## UI Decisions

- The app should feel like a compact mobile tool, not a landing page.
- Bottom fixed button is the main view switch:
  - On input screen: `登録データ`
  - On registration data screen: `入力へ戻る`
- The old top `入力へ戻る` button in the records header is hidden.
- Records are shown as compact list rows.
- Tapping a record expands details.
- Inline edit only appears after pressing `編集`.
- `編集` and `削除` buttons are intentionally small.

## Fertilizer Tab

Current fertilizer component layout:

- Macro elements:
  - C
  - H
  - O
  - N
  - P
  - K
  - Ca
  - Mg
  - S
- Micro elements:
  - Fe
  - Mn
  - Zn
  - Cu
  - B
  - Mo
  - Cl
  - Ni

The NPK property selector strip was removed from the summary area.

Compatibility note:

- Hidden fields remain in `index.html`:
  - `nitrogenKind`
  - `phosphorusKind`
  - `potassiumKind`
- This keeps existing save/edit code from breaking.
- The removed NPK strip is documented in `PROJECT_NOTES.md` for possible reuse later.

## Soil Tab

Soil component fields are currently:

- pH
- EC
- 硝酸態窒素
- アンモニア態窒素
- 有効態リン酸
- 石灰
- 苦土
- カリ
- CEC
- リン酸吸収係数
- 腐食
- 塩基飽和度
- Ca/Mg
- Mg/K

These are defined in `soilLabels` in `app.js`.

Old soil data compatibility:

- Old `n` maps to `nitrateNitrogen`
- Old `p` maps to `availablePhosphorus`
- Old `k` maps to `potassium`

## PWA

PWA files:

- `manifest.webmanifest`
- `service-worker.js`
- `icon.svg`

When changing CSS or JS, update:

- CSS query string in `index.html`
- JS query string in `index.html`
- `CACHE_NAME` in `service-worker.js`
- matching app shell URLs in `service-worker.js`

This prevents stale mobile/PWA cache from showing old UI.

## Local Preview

If server is not running, start it from the workspace:

```powershell
Start-Process -FilePath 'C:\Users\tsrwo\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -ArgumentList @('-m','http.server','8765') -WorkingDirectory 'C:\Users\tsrwo\OneDrive\ドキュメント\New project' -WindowStyle Hidden
```

Then open:

```text
http://127.0.0.1:8765/index.html
```

## Verification Commands

Use bundled Node:

```powershell
& 'C:\Users\tsrwo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check app.js
& 'C:\Users\tsrwo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check service-worker.js
```

## Git Notes

- User wants to push only when explicitly instructed.
- Last known pushed commit was before the more recent local UI changes.
- Current local work may include unpushed changes.
- Before pushing, run:

```powershell
git status --short --branch
git diff --stat
```

Then stage, commit, and push only after the user says to push.

## Suggested First Prompt For New Chat

```text
このプロジェクトを引き継いでください。
まず HANDOFF.md を読んで、index.html / styles.css / app.js の現状を把握してください。
push はこちらが指示するまでしないでください。
```
