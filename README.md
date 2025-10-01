Altman‑style Playbook Site (static, no build step)

How to use
1) Put your content into content.md using simple Markdown (## for section headers). Tip: In Google Docs, File → Download → .docx, then convert to Markdown with Pandoc or the “Docs to Markdown” add‑on; paste result into content.md.
2) Edit the <title>, #site-title, and .byline in index.html.
3) Open index.html in a browser to preview. Deploy by dragging the folder to Netlify, Vercel (static), GitHub Pages, or any static host.
4) Optional: replace tiny parser (marked.min.js) with a full parser CDN for better Markdown support.

Features
• Clean single‑column reading experience with sticky in‑page Table of Contents. 
• Linkable headings with § anchors.
• Scroll progress indicator.
• Mobile‑friendly (TOC auto‑hides).
• No frameworks, no build pipeline.

Exact‑look tips
• Use concise headings (##) to auto‑populate the TOC.
• Keep paragraphs short; avoid heavy imagery.
• For a Spanish (or other language) translation link, add to the header in index.html.

Advanced (optional)
• Fonts: swap Inter for your brand or system stack.
• Analytics: drop your snippet before </body>.
• SEO/Open Graph: update meta tags in <head>.
