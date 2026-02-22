/**
 * PNGの暗い青灰色の背景を透明にするスクリプト
 * キャラクターは残し、背景部分のみアルファを0にします。
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public/images/character-original.png");
const outputPath = join(root, "public/images/character.png");

// 背景とみなす色（ダークブルーグレー）と許容範囲
const bgColors = [
  [30, 41, 59],   // slate-800
  [51, 65, 85],   // slate-700
  [71, 85, 105],  // slate-600
  [15, 23, 42],   // より暗いネイビー
];
const luminanceThreshold = 80;  // これより暗いピクセルを背景候補に
const colorDistanceThreshold = 65;  // 背景色との距離がこれ以下なら透明に

function colorDistance(r, g, b, br, bg, bb) {
  return Math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2);
}

function isBackground(r, g, b, a) {
  if (a < 128) return true;
  const lum = (r * 0.299 + g * 0.587 + b * 0.114);
  if (lum > luminanceThreshold) return false; // 明るい部分はキャラ
  for (const [br, bg, bb] of bgColors) {
    if (colorDistance(r, g, b, br, bg, bb) <= colorDistanceThreshold) return true;
  }
  return false;
}

const buffer = readFileSync(inputPath);
const image = sharp(buffer);
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

for (let i = 0; i < width * height; i++) {
  const idx = i * channels;
  const r = out[idx];
  const g = out[idx + 1];
  const b = out[idx + 2];
  if (isBackground(r, g, b, out[idx + 3])) {
    out[idx + 3] = 0;
  }
}

await sharp(out, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log("Saved:", outputPath);
