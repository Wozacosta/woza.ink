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
import puppeteer, { type Browser, type Page } from "puppeteer-core";
import sharp from "sharp";
import { projects } from "../src/data/projects.ts";

const OUT_DIR = path.join(process.cwd(), "public/projects");
const WIDTH = 1280;
const HEIGHT = 800;

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface CaptureOptions {
  /** Page to capture instead of the project's homepage */
  url?: string;
  /** How long to let the page settle before (and after) `prepare` */
  waitMs?: number;
  /** Put the app in a representative state (e.g. seed demo data) */
  prepare?: (page: Page) => Promise<void>;
}

/** Seed Habitu with a few habits and ~2 weeks of mostly-done days */
async function seedHabitu(page: Page) {
  const habits = [
    "Morning stretch",
    "Read 20 pages",
    "Language learning",
    "Meditate",
    "Drink 2L water",
    "No phone before 9am",
  ];
  for (const name of habits) {
    await page.click('button[aria-label="Add new habit"]');
    await sleep(500);
    const [preset] = await page.$$(`xpath/.//button[contains(., '${name}')]`);
    await preset.click();
    await sleep(300);
    const [add] = await page.$$("xpath/.//button[normalize-space(.)='Add']");
    await add?.click();
    await sleep(500);
    await page.keyboard.press("Escape");
    await sleep(300);
  }

  // Clicks cycle a day: none → done → partial → none. Deterministic pattern,
  // mostly done with a few partial and missed days; only visible cells.
  const cells = await page.$$('button[aria-label*=", not logged"]');
  let i = 0;
  for (const cell of cells) {
    const box = await cell.boundingBox();
    if (!box || box.x < 0 || box.x + box.width > WIDTH) continue;
    const roll = (i++ * 37 + 11) % 10;
    const clicks = roll < 7 ? 1 : roll < 8 ? 2 : 0;
    for (let c = 0; c < clicks; c++) {
      await cell.click();
      await sleep(60);
    }
  }
}

/** Wait for Uchronia to finish streaming the timeline */
async function waitForUchronia(page: Page) {
  await page.waitForFunction(
    () =>
      !document.body.innerText.includes("Writing the decades") &&
      ![...document.querySelectorAll("button")].some((b) => b.textContent?.trim() === "Stop"),
    { timeout: 120_000, polling: 1_000 },
  );
}

const CAPTURE: Record<string, CaptureOptions> = {
  // Examples are free to explore and served from cache
  uchronia: {
    url: "https://uchronia.app/?q=Napoleon+won+at+Waterloo",
    prepare: waitForUchronia,
  },
  habitu: { prepare: seedHabitu },
};

let browser: Browser | null = null;

async function closeBrowser() {
  await browser?.close();
}

async function captureWithChrome(
  url: string,
  { waitMs = 4_000, prepare }: CaptureOptions = {},
): Promise<Buffer> {
  browser ??= await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
    // Don't wait for `load`: pages with streams or long polling never fire it
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await sleep(waitMs);
    if (prepare) {
      await prepare(page);
      await sleep(1_000);
    }
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
    const options = CAPTURE[project.slug] ?? {};
    const url = options.url ?? project.url;
    const png = existsSync(CHROME)
      ? await captureWithChrome(url, options)
      : await captureWithMicrolink(url);
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
