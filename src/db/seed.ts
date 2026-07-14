import "dotenv/config";
import { db } from "./index";
import { categories, products, reviews } from "./schema";
import { categorySeed, productSeed, reviewSeed } from "./seed-data";
import {
  categoryImageBySlug,
  extraProductSeed,
  extraReviewSeed,
  productImageOverrides,
} from "./enhancements";
import { catalogImages } from "./image-catalog";
import originalProductImagesJson from "./original-product-images.json";
import { dmartProducts, dmartReviewSeed } from "./dmart-products";
import { expandedProducts, expandedReviews } from "./expanded-products";
import {
  originalExpansionProducts,
  originalExpansionReviews,
} from "./original-expansion";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding JP SHOP database...");

  await db.execute(sql`TRUNCATE TABLE reviews, products, categories RESTART IDENTITY CASCADE`);

  const enhancedCategories = categorySeed.map((category) => ({
    ...category,
    imageUrl: categoryImageBySlug[category.slug] ?? null,
  }));

  const originalProductImages = originalProductImagesJson as Record<string, string>;
  const productsByName = new Map<string, (typeof productSeed)[number] & { imageUrlOverride?: string | null }>();

  for (const product of [
    ...productSeed,
    ...extraProductSeed,
    ...dmartProducts,
    ...expandedProducts,
    ...originalExpansionProducts,
  ]) {
    const normalizedName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!productsByName.has(normalizedName)) productsByName.set(normalizedName, product);
  }

  const enhancedProducts = [...productsByName.values()].map((product) => ({
    ...product,
    imageUrl:
      originalProductImages[product.slug] ??
      productImageOverrides[product.slug] ??
      catalogImages[product.slug] ??
      `/images/product-art/${product.slug}.svg`,
  }));

  await db.insert(categories).values(enhancedCategories);
  console.log(`✅ Inserted ${enhancedCategories.length} categories`);

  await db.insert(products).values(enhancedProducts);
  console.log(`✅ Inserted ${enhancedProducts.length} products`);

  const allReviews = [
    ...reviewSeed,
    ...extraReviewSeed,
    ...dmartReviewSeed,
    ...expandedReviews,
    ...originalExpansionReviews,
  ];
  await db.insert(reviews).values(allReviews);
  console.log(`✅ Inserted ${allReviews.length} reviews`);

  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
