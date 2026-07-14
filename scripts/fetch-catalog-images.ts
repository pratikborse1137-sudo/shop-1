import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { productSeed } from "../src/db/seed-data";
import { extraProductSeed, productImageOverrides } from "../src/db/enhancements";

const outputDir = path.join(process.cwd(), "public/images/catalog");
const mappingPath = path.join(process.cwd(), "src/db/catalog-images.json");
const allProducts = [...productSeed, ...extraProductSeed];

const skipCategories = new Set(["fresh-produce", "personal-care", "household"]);
const stopWords = new Set([
  "the", "and", "for", "with", "pure", "fresh", "original", "classic", "pack",
  "whole", "instant", "white", "yellow", "red", "green", "gold", "india",
]);

function tokens(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function scoreResult(queryName: string, result: Record<string, unknown>) {
  const queryTokens = tokens(queryName);
  const target = `${String(result.product_name ?? "")} ${String(result.brands ?? "")}`;
  const targetTokens = new Set(tokens(target));
  const matches = queryTokens.filter((token) => targetTokens.has(token)).length;
  const overlap = queryTokens.length ? matches / queryTokens.length : 0;
  const indiaBonus = Array.isArray(result.countries_tags) && result.countries_tags.includes("en:india") ? 0.2 : 0;
  const exactBonus = String(result.product_name ?? "").toLowerCase() === queryName.toLowerCase() ? 0.4 : 0;
  return overlap + indiaBonus + exactBonus;
}

async function searchProduct(name: string) {
  const params = new URLSearchParams({
    search_terms: name,
    search_simple: "1",
    action: "process",
    json: "1",
    page_size: "8",
    fields: "product_name,brands,image_front_url,countries_tags",
  });
  const response = await fetch(`https://in.openfoodfacts.org/cgi/search.pl?${params}`, {
    headers: { "User-Agent": "JPShop/1.0 (catalog image enrichment)" },
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) return null;
  const payload = (await response.json()) as { products?: Record<string, unknown>[] };
  const ranked = (payload.products ?? [])
    .filter((item) => typeof item.image_front_url === "string")
    .map((item) => ({ item, score: scoreResult(name, item) }))
    .sort((a, b) => b.score - a.score);
  return ranked[0] && ranked[0].score >= 0.34 ? ranked[0] : null;
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const mapping: Record<string, string> = {};
  let downloaded = 0;

  const candidates = allProducts.filter(
    (product) =>
      !productImageOverrides[product.slug] &&
      !product.imageUrl &&
      !skipCategories.has(product.categorySlug),
  );

  async function processProduct(product: (typeof candidates)[number]) {
    const fileName = `${product.slug}.jpg`;
    const localPath = path.join(outputDir, fileName);
    const publicPath = `/images/catalog/${fileName}`;

    if (existsSync(localPath)) {
      mapping[product.slug] = publicPath;
      return;
    }

    try {
      const result = await searchProduct(product.name);
      if (!result) {
        console.log(`— no confident match: ${product.name}`);
        return;
      }
      const imageUrl = String(result.item.image_front_url);
      const imageResponse = await fetch(imageUrl, {
        headers: { "User-Agent": "JPShop/1.0 (catalog image enrichment)" },
        signal: AbortSignal.timeout(6000),
      });
      const contentType = imageResponse.headers.get("content-type") ?? "";
      if (!imageResponse.ok || !contentType.startsWith("image/")) return;
      const bytes = Buffer.from(await imageResponse.arrayBuffer());
      await writeFile(localPath, bytes);
      mapping[product.slug] = publicPath;
      downloaded += 1;
      console.log(`✓ ${product.name} (${result.score.toFixed(2)})`);
    } catch (error) {
      console.log(`× ${product.name}: ${error instanceof Error ? error.message : "failed"}`);
    }
  }

  const batchSize = 12;
  for (let index = 0; index < candidates.length; index += batchSize) {
    await Promise.all(candidates.slice(index, index + batchSize).map(processProduct));
    await writeFile(mappingPath, `${JSON.stringify(mapping, null, 2)}\n`, "utf8");
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  console.log(`Saved ${Object.keys(mapping).length} mapped images (${downloaded} downloaded).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
