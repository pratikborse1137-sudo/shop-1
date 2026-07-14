import { productSeed } from "../src/db/seed-data";
import { extraProductSeed, productImageOverrides } from "../src/db/enhancements";
import { dmartProducts } from "../src/db/dmart-products";
import { expandedProducts } from "../src/db/expanded-products";
import originalJson from "../src/db/original-product-images.json";
import catalogJson from "../src/db/catalog-images.json";

const original = originalJson as Record<string, string>;
const catalog = catalogJson as Record<string, string>;
const seen = new Set<string>();
const products = [...productSeed, ...extraProductSeed, ...dmartProducts, ...expandedProducts];

for (const product of products) {
  const normalized = product.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (seen.has(normalized)) continue;
  seen.add(normalized);
  if (!original[product.slug] && !productImageOverrides[product.slug] && !catalog[product.slug]) {
    console.log(`${product.name}|${product.slug}|${product.categorySlug}`);
  }
}
