// Nusantara Data — Indonesia national statistics (make.fun entry, Node 22, standard
// library only). The site lives in app/ as plain static files: ES modules and CSS,
// no build step, no network requests — every figure is bundled in app/data.js with
// its source and year. This program hands the entry in: it copies app/ and
// screenshots/ beside this file to /output and writes /output/dossier.json with
// buildDossier from the vendored make.fun library (left unchanged, as required).
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the site locally with `node serve.ts`, then open http://localhost:8080.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Caps mirror the scorer's gate.json: text_max_bytes shapes the dossier bytes; the
// rest refuse entries the scorer would refuse (over 4 screenshots or one over
// 256 KiB; over 993 app entries or 16 MiB of app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
