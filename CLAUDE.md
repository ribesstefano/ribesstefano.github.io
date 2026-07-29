# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Jekyll static site (Stefano Ribes' academic homepage, `ribesstefano.github.io`) built on
the **Academic Pages** template (a fork of the Minimal Mistakes theme). There is no
application code — content is authored as Markdown/YAML front matter, and the theme is
Liquid templates + SCSS. The site is served straight from GitHub Pages (repo name matches
`<user>.github.io`, no CNAME, no custom GitHub Actions deploy workflow) — pushing to the
default branch is what publishes it.

## Commands

```bash
bundle install                        # install Ruby deps (Jekyll pinned via the github-pages gem)
bundle exec jekyll serve -l -H localhost   # local dev server at localhost:4000, live-reloads on change
bundle exec jekyll build              # one-off build into _site/
```

- Always run Jekyll through `bundle exec` so the `github-pages` gem's pinned Jekyll version is
  used (matches what GitHub Pages actually builds with).
- If `bundle install` fails after a Gemfile change, delete `Gemfile.lock` and retry (per README).
- There is no test suite, linter, or JS build step to run for content changes. The `package.json`
  `uglify`/`build:js` scripts only re-bundle the theme's vendored jQuery plugins into
  `assets/js/main.min.js` — irrelevant unless you're touching `assets/js/_main.js` or
  `assets/js/plugins/`.
- `_config.yml` is *not* hot-reloaded by `jekyll serve`; restart the server after editing it.
  `_config.dev.yml` holds local-only overrides (disables analytics, expands compressed CSS) —
  merge it in with `--config _config.yml,_config.dev.yml` if you need those overrides.
- `_site/` is the build output (gitignored) — never edit it directly.

## Content architecture

Content lives in Jekyll **collections**, each a directory of Markdown files with YAML front
matter, configured in `_config.yml` under `collections:`. Defaults for `layout`/`author_profile`/
etc. per collection are also set there under `defaults:` — don't repeat them in individual files
unless overriding.

| Collection | Dir | Layout | Index page |
|---|---|---|---|
| Publications | `_publications/` | `single` | `_pages/publications.md` |
| Talks | `_talks/` | `talk` | `_pages/talks.html` |
| Code portfolio | `_portfolio/` | `single` | `_pages/portfolio.html` |
| Blog posts | `_posts/` | `single` | `_pages/year-archive.html` |
| Teaching | (collection defined, unused — see Supervision page instead) | `single` | — |

Standalone pages (About, CV, Publications/Talks/Portfolio index, Supervision, etc.) live in
`_pages/`. The homepage is `_pages/about.md` (`permalink: /`).

**Permalinks are set explicitly in each file's front matter, not derived from the filename** —
check a sibling file before adding a new one:
- Publications use **singular** `/publication/<slug>` (e.g. `/publication/2026-02-20-PROTAC-Splitter`),
  even though the collection is `publications`. One legacy 2020 entry still uses the old plural
  `/publications/...` form — don't copy that one.
- Talks use the plural `/talks/<slug>`, matching the collection name.

`_posts/default/` contains the theme's original demo posts (2012–2015 + a year-2199 future post).
It's excluded from the build via `_posts/default/*` in `_config.yml`'s `exclude:` — it's template
reference material, not live content.

### Shared front matter: resource-link pills

`_includes/resource-links.html` renders a row of pill links (Paper, DOI, arXiv, ChemRxiv,
Preprint, PDF, Code, Demo, Colab, Dataset, Zenodo, Website, Slides, Poster, Video) from
whichever of these front-matter keys are present on a publication/talk/portfolio entry:
`paperurl, doi, arxiv, chemrxiv, preprint, pdf, github, colab, spaces, dataset, zenodo, website,
slides, poster, video`. It's included from both `_includes/archive-single.html` (list/archive
views) and `_layouts/single.html` (single publication pages) — add the relevant key to an entry's
front matter rather than hand-writing link markup in the body.

The DOI pill only renders when `doi` looks like a real DOI (`10.` prefix) — some older entries
store a Zenodo id in that field instead, which is intentionally excluded to avoid a dead link.

### News feed

`_data/news.yml` is a simple reverse-chronological list (`date` is free text, `body` is inline
HTML) rendered on the homepage via `{% include news.html limit=4 %}`. Add new entries to the top.

## Theming / styling

`assets/css/main.scss` is the single entry point that `@import`s the theme's SCSS partials from
`_sass/` in cascade order, ending with `_sass/_custom.scss` **imported last so it overrides theme
defaults**. Site-specific design (card grid, `.resource-links` pills, `.funding-note` callout,
`.news-list`, `.intro-hero`, dark-mode `.theme-toggle`, etc.) belongs in `_custom.scss`, not in the
upstream theme partials (`_page.scss`, `_archive.scss`, `_sidebar.scss`, ...) — keep the theme
partials close to stock so template updates stay mergeable.

## Other tooling in the repo

- **`markdown_generator/`** — Jupyter notebooks (`publications.ipynb`, `talks.ipynb`,
  `PubsFromBib.ipynb`) and equivalent plain-`.py` scripts that bulk-convert a TSV
  (`publications.tsv`, `talks.tsv`) or a `.bib` file into individual front-matter-formatted
  Markdown files for `_publications/`/`_talks/`. Useful for importing many entries at once instead
  of hand-writing each file.
- **`talkmap/` + `talkmap.py`/`talkmap.ipynb`** — scrapes the `location` field out of every file in
  `_talks/`, geocodes it (geopy/Nominatim), and regenerates the Leaflet cluster map assets in
  `talkmap/` via the `getorg` library. Only relevant if talk locations changed and the map (linked
  from the Talks page when `talkmap_link: true` in `_config.yml`) needs regenerating; requires the
  `getorg`/`geopy` Python packages, which aren't part of the Jekyll toolchain.
