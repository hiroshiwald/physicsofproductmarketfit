# Jekyll version (auto-builds on GitHub Pages)
Steps:
1) Create a repo. Upload `_config.yml`, `_layouts/default.html`, `index.md`, `styles.css`, `script.js` to the root.
2) Settings → Pages → Source: Deploy from `main` branch, `/ (root)`.
3) Edit `index.md` on GitHub whenever you want; Pages rebuilds automatically.
Notes:
- Delete any old `index.html` from the root; Jekyll will otherwise ignore `index.md`.
- Tables are rendered with GFM (kramdown). Styles match the narrow-column Playbook look.
