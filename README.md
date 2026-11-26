# Nusantara Data — Indonesia in numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/shania00123/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/shania00123/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for **Indonesia**: an overview dashboard, population,
economy, health and education sections with charts, and a searchable, sortable
table of all 38 provinces. Every figure is labelled with its source and year
(BPS, World Bank WDI, APJII, Ministry of Health, UNESCO UIS, UN WPP), estimates
are marked as estimates, and the site runs fully offline from its own static
files on desktop and phone.

## Sections

- **Overview** — eight headline indicators (population 283.5M, GDP $1.40tn,
  inflation 1.6%, unemployment 4.9%, life expectancy 72, literacy 96%, internet
  users 79.5%, poverty 8.6%) plus a population chart with a line/bars toggle.
- **Population** — growth 1961–2024, age structure, urbanisation and connectivity.
- **Economy** — GDP growth / inflation chart switcher, sector shares, jobs and poverty.
- **Health** — life expectancy trend, child survival, stunting progress, coverage.
- **Education** — literacy, schooling years, enrolment by level.
- **Regions** — all 38 provinces with capitals, population, area and density;
  live search, island-group filter chips and click-to-sort columns.
- **Sources & methods** — where every number comes from and how rounding works.

## How it is built

`app/` is plain static files with no build step: `index.html`, `style.css`, and
ES modules `data.js` (all figures, each with source + year), `charts.js`
(inline-SVG line/bar/share charts, no library), `views.js` (page templates) and
`main.js` (hash routing and control wiring). `main.ts` (Node 22, standard
library only) copies `app/` and `screenshots/` to `/output` and writes
`/output/dossier.json` via the vendored `vendor/makefun-frontend.ts`.

## Run it

```sh
node serve.ts            # then open http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Bounty: https://make.fun/bounty/best-national-statistics-site-20261126-0539
