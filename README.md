# AL Zobaer — Academic Website

Source for my personal research website, live at **[alzobaer.github.io](https://alzobaer.github.io)**.

I am a master's (M2) student in the **Mineno Laboratory, Shizuoka University**, working at
the intersection of **robotics, computer vision, and precision agriculture** — autonomous
data acquisition and scale-invariant phenotyping for time-series crop monitoring in
greenhouse environments (3D Gaussian Splatting, low-cost agricultural UGVs).

- 🌐 Website: https://alzobaer.github.io
- 📧 Email: zobaer.al.24@shizuoka.ac.jp
- 🎓 Google Scholar: https://scholar.google.com/citations?user=VONkr7kAAAAJ
- 🆔 ORCID: https://orcid.org/0009-0009-1084-7612

## How the site is built

The site is a [Jekyll](https://jekyllrb.com/) site hosted on **GitHub Pages**. Every commit
to `master` triggers an automatic rebuild — no local tools required. Edit any file in the
browser on github.com, commit, and the change is live in about a minute.

## Where the content lives

| To edit… | Change this |
|---|---|
| Blog posts | `_posts/` — files named `YYYY-MM-DD-title.md` |
| Publications | `_publications/` |
| Talks | `_talks/` |
| Teaching | `_teaching/` |
| Portfolio | `_portfolio/` |
| About / homepage | `_pages/about.md` |
| CV | `_pages/cv.md` |
| Header menu (tabs) | `_data/navigation.yml` |
| Site-wide settings (title, links, bio) | `_config.yml` |
| Downloadable files (PDFs, etc.) | `files/` → served at `/files/…` |

### Adding a blog post

1. Open the `_posts/` folder → **Add file → Create new file**
2. Name it `YYYY-MM-DD-your-title.md`
3. Add front matter and write in Markdown:
   ```yaml
   ---
   title: "Your title"
   date: 2026-07-20
   permalink: /posts/2026/07/your-title/
   excerpt: "One-line summary."
   tags:
     - research
   ---
   ```
4. **Commit changes** — the post appears under **Blog Posts** after the rebuild.

## Running locally (optional)

Local previews are not required (editing on GitHub is enough), but if wanted:

```bash
bundle install
bundle exec jekyll serve -l -H localhost   # → http://localhost:4000
```

## Credits

Built on the [Academic Pages](https://github.com/academicpages/academicpages.github.io)
template (MIT License), which is derived from the
[Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) Jekyll theme
© Michael Rose. See [LICENSE](LICENSE) for details.
