/**
 * Capture a screenshot of each live project into public/projects/<slug>.webp.
 * Drives local Chrome via puppeteer-core (CHROME_PATH or the default macOS install),
 * falling back to Microlink (free tier: ~50 requests/day).
 *
 *   pnpm screenshots            # all live projects
 *   pnpm screenshots pomo wezer # only these slugs
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer, { type Browser } from "puppeteer-core";
import sharp from "sharp";
import { projects } from "../src/data/projects.ts";

const OUT_DIR = path.join(process.cwd(), "public/projects");
const WIDTH = 1280;
const HEIGHT = 800;

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

let browser: Browser | null = null;

async function closeBrowser() {
  await browser?.close();
}

async function captureWithChrome(url: string): Promise<Buffer> {
  browser ??= await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
    // Don't wait for `load`: pages with streams or long polling never fire it
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await new Promise((r) => setTimeout(r, 4_000));
    return Buffer.from(await page.screenshot({ type: "png" }));
  } finally {
    await page.close();
  }
}

async function captureWithMicrolink(url: string): Promise<Buffer> {
  const api = new URL("https://api.microlink.io/");
  api.searchParams.set("url", url);
  api.searchParams.set("screenshot", "true");
  api.searchParams.set("meta", "false");
  api.searchParams.set("colorScheme", "light");
  api.searchParams.set("viewport.width", String(WIDTH));
  api.searchParams.set("viewport.height", String(HEIGHT));
  api.searchParams.set("waitForTimeout", "2500");

  const res = await fetch(api);
  const body = await res.json();
  if (body.status !== "success") {
    throw new Error(`${body.code ?? res.status}: ${body.message ?? "unknown error"}`);
  }
  const image = await fetch(body.data.screenshot.url);
  return Buffer.from(await image.arrayBuffer());
}

const only = process.argv.slice(2);
const targets = projects.filter(
  (p) => p.active !== false && (only.length === 0 || only.includes(p.slug)),
);

await mkdir(OUT_DIR, { recursive: true });

let failed = 0;
for (const project of targets) {
  try {
    const png = existsSync(CHROME)
      ? await captureWithChrome(project.url)
      : await captureWithMicrolink(project.url);
    const webp = await sharp(png)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
      .webp({ quality: 82 })
      .toBuffer();
    await writeFile(path.join(OUT_DIR, `${project.slug}.webp`), webp);
    console.log(`✓ ${project.slug} (${Math.round(webp.length / 1024)} KB)`);
  } catch (err) {
    failed++;
    console.error(`✗ ${project.slug}: ${(err as Error).message}`);
  }
}

await closeBrowser();
process.exitCode = failed ? 1 : 0;
