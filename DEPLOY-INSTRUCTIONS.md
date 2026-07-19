# AL Zobaer — academicpages site (configured, ready to deploy)

This is the **academicpages** template, already populated with your content:
`_config.yml` (identity, links), `_pages/about.md`, `_pages/cv.md`,
three real publications in `_publications/`, and your photo at `images/profile.jpg`.
Navigation is trimmed to **About / Publications / CV**.

## ⚠️ Deploy only after your GitHub account is reinstated
Your account is under review, so the site cannot publish until it's restored.
Once GitHub confirms reinstatement, do the following.

## Deploy to alzobaer.github.io (replaces your current site)
academicpages is a **Jekyll** site — GitHub Pages builds it automatically.
The one critical difference from your previous static site: **there must be NO
`.nojekyll` file** (that file disables Jekyll, which academicpages needs).

```bash
# in your alzobaer.github.io repo clone:
cd alzobaer.github.io
git rm -r --quiet .          # remove old static-site files (kept in history)
# copy everything from this folder EXCEPT its .git:
rsync -a --exclude='.git' /media/HDD-24TB/Zobaer_Research_Lab/academicpages-site/ ./
rm -f .nojekyll              # IMPORTANT: academicpages needs Jekyll enabled
git add -A
git commit -m "Switch site to academicpages template"
git push origin master
```

GitHub Pages will build the Jekyll site in ~1–2 minutes; then visit
**https://alzobaer.github.io**. No Pages settings change is needed (it still
deploys from the `master` branch).

## Preview locally (optional, needs Docker)
academicpages ships a Docker setup, which avoids Ruby/Jekyll version headaches:
```bash
docker compose up      # then open http://localhost:4000
```

## Before you consider it final — quick edits
- **CV** (`_pages/cv.md`): fill in your **B.Sc.** line and any **awards**.
- **Publications** (`_publications/*.md`): add **co-authors** (currently
  "AL Zobaer, et al.") and, when available, `paperurl:` links to PDFs/DOIs.
- **Theme** (optional): `site_theme` in `_config.yml` — try "air", "mint",
  "sunrise", "dirt", or "contrast".
- **Optional tabs**: uncomment Talks / Teaching / Portfolio in
  `_data/navigation.yml` if you ever want them.
