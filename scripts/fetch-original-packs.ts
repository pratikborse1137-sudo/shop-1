import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { productSeed } from "../src/db/seed-data";
import { extraProductSeed } from "../src/db/enhancements";
import { dmartProducts } from "../src/db/dmart-products";
import { expandedProducts } from "../src/db/expanded-products";

const outputDir = path.join(process.cwd(), "public/images/original");
const mappingPath = path.join(process.cwd(), "src/db/original-product-images.json");

const brandPattern = /^(24 Mantra|Aashirvaad|Amul|Ashirwad|Bingo|Britannia|Bournvita|Bru|Cadbury|Clinic Plus|Coca-Cola|Colgate|Comfort|Daawat|Dabur|Dark Fantasy|Dettol|Dhara|Dove|Everest|Fortune|Frooti|Garnier|Good Knight|Haldiram|Harpic|Head & Shoulders|Hide & Seek|Himalaya|Horlicks|India Gate|Kellogg|Kissan|Kurkure|Lay|Lifebuoy|Lijjat|Lizol|Madhur|Maggi|Marie Gold|MDH|Milkmaid|Milky Mist|Modern|Mother Dairy|MTR|Nescaf|Nestle|Parachute|Parle|Patak|Patanjali|Pepsi|Ponds|Quaker|Real|Red Label|Rin|Saffola|Santoor|Scotch-Brite|Surf Excel|Tata|Thums Up|Tiger|Uncle Chipps|Uncle Chips|Vim|YIPEE)/i;

const aliases: Record<string, string> = {
  "ashirwad-whole-wheat-atta": "Aashirvaad whole wheat atta",
  "amul-cow-ghee": "Amul pure ghee",
  "haldiram-aloo-bhujia": "Haldiram aloo bhujia",
  "everest-kitchen-king": "Everest Kitchen King masala",
  "red-label-tea": "Brooke Bond Red Label tea",
  "real-mixed-fruit-juice": "Real mixed fruit juice Dabur",
  "tata-ishakti-tea-bags": "Tata tea bags",
  "fortune-bottle-sunflower-oil": "Fortune sunflower oil",
  "colgate-strong-teeth-tube": "Colgate Strong Teeth toothpaste",
  "lizol-lemon-disinfectant": "Lizol lemon floor cleaner",
  "kelloggs-original-cereal": "Kelloggs corn flakes original",
  "britannia-cheese-slices-supreme": "Britannia cheese slices",
  "milkmaid-sweetened": "Nestle Milkmaid condensed milk",
  "surf-excel-quick-wash-powder": "Surf Excel Quick Wash",
};

const stopWords = new Set([
  "and", "the", "with", "pure", "fresh", "original", "classic", "pack", "large",
  "small", "premium", "strong", "total", "everyday", "quick", "wash", "powder",
  "bottle", "bar", "leaf", "sweet", "spiced", "refined", "pasteurised", "pasteurized",
]);

function tokenise(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function score(query: string, item: Record<string, unknown>) {
  const queryTokens = tokenise(query);
  const productName = String(item.product_name ?? "");
  const brands = String(item.brands ?? "");
  const target = `${productName} ${brands}`.toLowerCase();
  const targetTokens = new Set(tokenise(target));
  const matches = queryTokens.filter((token) => targetTokens.has(token)).length;
  const overlap = queryTokens.length ? matches / queryTokens.length : 0;
  const brandToken = queryTokens[0];
  const brandBonus = brandToken && target.includes(brandToken) ? 0.45 : 0;
  const indiaBonus = Array.isArray(item.countries_tags) && item.countries_tags.includes("en:india") ? 0.12 : 0;
  return { value: overlap + brandBonus + indiaBonus, matches, productName, brands };
}

async function requestSearch(domain: "in" | "world", query: string) {
  const params = new URLSearchParams({
    search_terms: query,
    search_simple: "1",
    action: "process",
    json: "1",
    page_size: "10",
    fields: "product_name,brands,image_front_url,countries_tags",
  });
  try {
    const response = await fetch(`https://${domain}.openfoodfacts.org/cgi/search.pl?${params}`, {
      headers: { "User-Agent": "JPShop/1.0 (professional catalogue enrichment)" },
      signal: AbortSignal.timeout(7000),
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as { products?: Record<string, unknown>[] };
    return payload.products ?? [];
  } catch {
    return [];
  }
}

async function findBest(query: string) {
  const indian = await requestSearch("in", query);
  const world = indian.length ? [] : await requestSearch("world", query);
  const ranked = [...indian, ...world]
    .filter((item) => typeof item.image_front_url === "string")
    .map((item) => ({ item, ...score(query, item) }))
    .sort((a, b) => b.value - a.value);
  const best = ranked[0];
  if (!best || best.value < 0.72 || best.matches < 1) return null;
  return best;
}

function fullResolution(url: string) {
  return url.replace(/\.\d+\.jpg$/, ".full.jpg");
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const byName = new Map<string, (typeof productSeed)[number] & { imageUrlOverride?: string | null }>();
  for (const item of [...productSeed, ...extraProductSeed, ...dmartProducts, ...expandedProducts]) {
    const key = item.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!byName.has(key)) byName.set(key, item);
  }
  const candidates = [...byName.values()].filter((item) => brandPattern.test(item.name));
  const mapping = JSON.parse(await readFile(mappingPath, "utf8")) as Record<string, string>;
  let downloaded = 0;

  async function processItem(item: (typeof candidates)[number]) {
    const fileName = `${item.slug}.jpg`;
    const filePath = path.join(outputDir, fileName);
    const publicPath = `/images/original/${fileName}`;
    if (mapping[item.slug] && existsSync(filePath)) return;
    if (existsSync(filePath)) {
      mapping[item.slug] = publicPath;
      return;
    }
    const query = aliases[item.slug] ?? item.name;
    const best = await findBest(query);
    if (!best) {
      console.log(`— no verified pack: ${item.name}`);
      return;
    }
    try {
      let imageUrl = fullResolution(String(best.item.image_front_url));
      let response = await fetch(imageUrl, {
        headers: { "User-Agent": "JPShop/1.0 (professional catalogue enrichment)" },
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) {
        imageUrl = String(best.item.image_front_url);
        response = await fetch(imageUrl, {
          headers: { "User-Agent": "JPShop/1.0 (professional catalogue enrichment)" },
          signal: AbortSignal.timeout(12000),
        });
      }
      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok || !contentType.startsWith("image/")) return;
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 5000) return;
      await writeFile(filePath, bytes);
      mapping[item.slug] = publicPath;
      downloaded += 1;
      console.log(`✓ ${item.name} → ${best.productName} [${best.value.toFixed(2)}]`);
    } catch {
      console.log(`× image download failed: ${item.name}`);
    }
  }

  const batchSize = 6;
  for (let index = 0; index < candidates.length; index += batchSize) {
    await Promise.all(candidates.slice(index, index + batchSize).map(processItem));
    await writeFile(mappingPath, `${JSON.stringify(mapping, null, 2)}\n`);
    await new Promise((resolve) => setTimeout(resolve, 700));
  }

  console.log(`Original pack coverage: ${Object.keys(mapping).length}/${candidates.length} (${downloaded} downloaded)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
