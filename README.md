# AL Zobaer — Personal Website

A lightweight, dependency-free personal/academic website (plain HTML + CSS + a
little JavaScript). No build step, no frameworks — it deploys to **GitHub Pages**
as-is.

```
personal-website/
├── index.html                # the page (edit your content here)
├── assets/
│   ├── style.css             # all styling (light + dark theme)
│   └── script.js             # theme toggle, year, scroll reveal
├── .nojekyll                 # tell Pages to serve files as-is
├── .github/workflows/deploy.yml   # optional one-click Pages deploy
└── README.md
```

---

## 🚀 Deploy to GitHub Pages

### Option A — User site (recommended: clean URL `https://alzobaer.github.io`)

1. Create a **new repository named exactly** `alzobaer.github.io`.
2. Put these files at the repository **root** and push:
   ```bash
   cd personal-website
   git init
   git add .
   git commit -m "Personal website"
   git branch -M main
   git remote add origin https://github.com/alzobaer/alzobaer.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**
   (the included `deploy.yml` handles the rest). Your site goes live at
   **https://alzobaer.github.io** in ~1 minute.

   *Alternatively:* Settings → Pages → Source → **Deploy from a branch** → `main` / `/ (root)`.

### Option B — Project site (URL `https://alzobaer.github.io/<repo>`)

Same as above but name the repo anything (e.g. `website`). The site will be at
`https://alzobaer.github.io/website/`. Relative paths already work for this case.

---

## 🖥️ Preview locally

```bash
cd personal-website
python3 -m http.server 8080
# open http://localhost:8080
```

---

## ✏️ Customize

Everything you need to edit is in **`index.html`**:

- **Profile links** — search for `data-todo`. Replace the `#` in the Google
  Scholar / ORCID / LinkedIn links with your real URLs (or delete the lines).
- **Photo** — the circular “AZ” monogram is CSS-only. To use a photo, add
  `assets/profile.jpg` and replace the `<div class="avatar">…</div>` with
  `<img class="avatar" src="assets/profile.jpg" alt="AL Zobaer">`.
- **Publications** — add/remove `<li class="pub">…</li>` blocks; the
  `pub-badge` class controls the tag (`conf`, `review`).
- **Colors** — tweak `--accent` / `--accent-2` at the top of `assets/style.css`.
- **Text** — About, Research cards, Highlights are all plain HTML in `index.html`.

The theme (light/dark) follows the visitor's OS setting and can be toggled with
the 🌙 button; the choice is remembered.

---

*Built as static files — no tracking, no external requests, works offline.*
