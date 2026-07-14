import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { productSeed } from "../src/db/seed-data";
import { extraProductSeed } from "../src/db/enhancements";
import { dmartProducts } from "../src/db/dmart-products";
import { expandedProducts } from "../src/db/expanded-products";

const outputDir = path.join(process.cwd(), "public/images/original");
const mappingPath = path.join(process.cwd(), "src/db/original-product-images.json");

const brandTags: Record<string, string> = {
  "24 Mantra": "24-mantra-organic", Amul: "amul", Ashirwad: "aashirvaad",
  Bingo: "bingo", Britannia: "britannia", Bournvita: "bournvita", Bru: "bru",
  Cadbury: "cadbury", "Clinic Plus": "clinic-plus", "Coca-Cola": "coca-cola",
  Colgate: "colgate", Comfort: "comfort", Daawat: "daawat", Dabur: "dabur",
  "Dark Fantasy": "sunfeast-dark-fantasy", Dettol: "dettol", Dhara: "dhara",
  Dove: "dove", Everest: "everest", Fortune: "fortune", Garnier: "garnier",
  "Good Knight": "good-knight", Haldiram: "haldiram-s", Harpic: "harpic",
  "Head & Shoulders": "head-shoulders", "Hide & Seek": "parle-hide-seek",
  Himalaya: "himalaya", Horlicks: "horlicks", "India Gate": "india-gate",
  Kellogg: "kellogg-s", Kissan: "kissan", Kurkure: "kurkure", Lay: "lay-s",
  Lifebuoy: "lifebuoy", Lijjat: "lijjat", Lizol: "lizol", Madhur: "madhur",
  Maggi: "maggi", "Marie Gold": "britannia", MDH: "mdh", Milkmaid: "milkmaid",
  "Milky Mist": "milky-mist", Modern: "modern", "Mother Dairy": "mother-dairy",
  MTR: "mtr", Nescaf: "nescafe", Nestle: "nestle", Parachute: "parachute",
  Parle: "parle", Patak: "patak-s", Ponds: "pond-s", Quaker: "quaker",
  Real: "real", "Red Label": "brooke-bond", Rin: "rin", Saffola: "saffola",
  "Scotch-Brite": "scotch-brite", "Surf Excel": "surf-excel", Tata: "tata",
  "Thums Up": "thums-up", Tiger: "britannia", "Uncle Chips": "uncle-chipps",
  Vim: "vim", YIPEE: "sunfeast-yippee", Patanjali: "patanjali", Pepsi: "pepsi",
  Frooti: "frooti", Santoor: "santoor", Aashirvaad: "aashirvaad",
};

const orderedBrands = Object.keys(brandTags).sort((a, b) => b.length - a.length);
const stop = new Set(["and", "the", "with", "pure", "fresh", "original", "classic", "pack", "large", "premium", "strong", "total", "powder", "bottle", "bar", "leaf", "refined", "pasteurised", "pasteurized", "quick", "wash", "everyday"]);

function tokens(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/)
    .filter((token) => token.length > 2 && !stop.has(token));
}

function brandFor(name: string) {
  return orderedBrands.find((brand) => name.toLowerCase().startsWith(brand.toLowerCase()));
}

function matchScore(itemName: string, result: Record<string, unknown>) {
  const itemTokens = tokens(itemName);
  const target = `${String(result.product_name ?? "")} ${String(result.brands ?? "")}`.toLowerCase();
  const targetTokens = new Set(tokens(target));
  const matches = itemTokens.filter((token) => targetTokens.has(token)).length;
  const overlap = itemTokens.length ? matches / itemTokens.length : 0;
  const india = Array.isArray(result.countries_tags) && result.countries_tags.includes("en:india") ? 0.18 : 0;
  return { score: overlap + india, matches };
}

async function fetchBrand(tag: string) {
  const url = new URL("https://world.openfoodfacts.org/api/v2/search");
  url.searchParams.set("brands_tags", tag);
  url.searchParams.set("page_size", "100");
  url.searchParams.set("fields", "product_name,brands,image_front_url,countries_tags");
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "JPShop/1.0 (professional catalogue enrichment)" },
      signal: AbortSignal.timeout(7000),
    });
    if (response.ok) {
      const data = (await response.json()) as { products?: Record<string, unknown>[] };
      return data.products ?? [];
    }
  } catch {}
  return [];
}

function fullUrl(url: string) {
  return url.replace(/\.\d+\.jpg$/, ".full.jpg");
}

async function download(url: string, output: string) {
  for (const candidate of [fullUrl(url), url]) {
    try {
      const response = await fetch(candidate, {
        headers: { "User-Agent": "JPShop/1.0 (professional catalogue enrichment)" },
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok || !(response.headers.get("content-type") ?? "").startsWith("image/")) continue;
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 5000) continue;
      await writeFile(output, bytes);
      return true;
    } catch {}
  }
  return false;
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const existing = JSON.parse(await readFile(mappingPath, "utf8")) as Record<string, string>;
  const mapping = { ...existing };
  const names = new Set<string>();
  const allItems = [...productSeed, ...extraProductSeed, ...dmartProducts, ...expandedProducts].filter((item) => {
    const key = item.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (names.has(key)) return false;
    names.add(key);
    return Boolean(brandFor(item.name));
  });
  const groups = new Map<string, typeof allItems>();
  for (const item of allItems) {
    const brand = brandFor(item.name)!;
    groups.set(brand, [...(groups.get(brand) ?? []), item]);
  }

  const brandEntries = [...groups.entries()];
  const processBrand = async ([brand, items]: (typeof brandEntries)[number]) => {
    const products = await fetchBrand(brandTags[brand]);
    for (const item of items) {
      const fileName = `${item.slug}.jpg`;
      const filePath = path.join(outputDir, fileName);
      if (existsSync(filePath)) {
        mapping[item.slug] = `/images/original/${fileName}`;
        continue;
      }
      const ranked = products
        .filter((result) => typeof result.image_front_url === "string")
        .map((result) => ({ result, ...matchScore(item.name, result) }))
        .sort((a, b) => b.score - a.score);
      const best = ranked[0];
      if (!best || best.matches < 2 || best.score < 0.48) {
        console.log(`— ${item.name}: no verified ${brand} pack`);
        continue;
      }
      const ok = await download(String(best.result.image_front_url), filePath);
      if (ok) {
        mapping[item.slug] = `/images/original/${fileName}`;
        console.log(`✓ ${item.name} → ${String(best.result.product_name)} [${best.score.toFixed(2)}]`);
      }
    }
  };

  const concurrency = 18;
  for (let i = 0; i < brandEntries.length; i += concurrency) {
    await Promise.all(brandEntries.slice(i, i + concurrency).map(processBrand));
    await writeFile(mappingPath, `${JSON.stringify(mapping, null, 2)}\n`);
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  console.log(`Saved ${Object.keys(mapping).length} verified original pack images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
