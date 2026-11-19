#!/usr/bin/env npx tsx
/**
 * Mirror NHSRCL progress photos into public/progress/{slug}/ (see data/station-progress/nhsrcl-media.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STATION_PROGRESS_SYNC_MANIFEST } from "../data/station-progress/timelines";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, "../public/progress");

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

fs.mkdirSync(outRoot, { recursive: true });

for (const file of STATION_PROGRESS_SYNC_MANIFEST) {
  const dest = path.join(outRoot, file.dest);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    console.log(`skip ${file.dest} (exists)`);
    continue;
  }
  console.log(`fetch ${file.dest}…`);
  const res = await fetch(file.url, {
    headers: { "User-Agent": "BulletTrainStation/1.0 (image sync; bullettrainstation.com)" },
  });
  if (!res.ok) {
    console.error(`  failed: HTTP ${res.status} for ${file.url}`);
    await sleep(3000);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`  wrote ${buf.length} bytes`);
  await sleep(2000);
}

console.log(`done (${STATION_PROGRESS_SYNC_MANIFEST.length} NHSRCL files)`);