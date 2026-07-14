import { db } from "./index";
import { categories, products, reviews } from "./schema";
import {
  categorySeed,
  productSeed,
  reviewSeed,
  type ProductSeed,
} from "./seed-data";
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

let bootstrapPromise: Promise<void> | null = null;

async function bootstrapDatabase() {
  await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(741852963)`);

    await tx.execute(sql`
      create table if not exists categories (
        id serial primary key,
        name text not null,
        slug text not null unique,
        emoji text not null,
        description text not null default '',
        gradient text not null default 'from-emerald-400 to-teal-500',
        image_url text
      )
    `);

    await tx.execute(sql`
      create table if not exists products (
        id serial primary key,
        name text not null,
        slug text not null unique,
        description text not null default '',
        long_description text not null default '',
        price_cents integer not null,
        compare_at_cents integer,
        category_slug text not null,
        emoji text not null,
        gradient text not null default 'from-emerald-100 to-teal-100',
        unit text not null default 'each',
        origin text not null default '',
        stock integer not null default 100,
        rating real not null default 4.5,
        review_count integer not null default 0,
        badge text,
        featured boolean not null default false,
        organic boolean not null default false,
        tags jsonb not null default '[]'::jsonb,
        image_url text
      )
    `);

    await tx.execute(sql`
      create table if not exists reviews (
        id serial primary key,
        product_slug text not null,
        author text not null,
        rating integer not null,
        title text not null default '',
        body text not null default '',
        verified boolean not null default true,
        created_at timestamp not null default now()
      )
    `);

    await tx.execute(sql`
      create table if not exists orders (
        id serial primary key,
        order_number text not null unique,
        customer_name text not null,
        email text not null,
        phone text not null default '',
        address text not null,
        city text not null,
        postal_code text not null,
        delivery_notes text not null default '',
        items jsonb not null default '[]'::jsonb,
        subtotal_cents integer not null,
        delivery_cents integer not null default 0,
        total_cents integer not null,
        status text not null default 'confirmed',
        created_at timestamp not null default now()
      )
    `);

    await tx.execute(sql`alter table categories add column if not exists image_url text`);
    await tx.execute(sql`alter table products add column if not exists image_url text`);

    const [row] = await tx
      .select({ count: sql<number>`count(*)` })
      .from(products);

    // Re-seed older preview databases so newly added products and corrected
    // original image mappings are applied on deployment.
    if (Number(row.count) >= 177) return;

    await tx.execute(sql`truncate table reviews, products, categories restart identity cascade`);

    const enhancedCategories = categorySeed.map((category) => ({
      ...category,
      imageUrl: categoryImageBySlug[category.slug] ?? null,
    }));

    const originalProductImages = originalProductImagesJson as Record<string, string>;
    const allProducts: Array<ProductSeed & { imageUrlOverride?: string | null }> = [
      ...productSeed,
      ...extraProductSeed,
      ...dmartProducts,
      ...expandedProducts,
      ...originalExpansionProducts,
    ];
    const productsByName = new Map<
      string,
      ProductSeed & { imageUrlOverride?: string | null }
    >();

    for (const product of allProducts) {
      const normalizedName = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
      if (!productsByName.has(normalizedName)) {
        productsByName.set(normalizedName, product);
      }
    }

    const enhancedProducts = [...productsByName.values()].map((product) => ({
      ...product,
      imageUrl:
        originalProductImages[product.slug] ??
        productImageOverrides[product.slug] ??
        catalogImages[product.slug] ??
        `/images/product-art/${product.slug}.svg`,
    }));

    const allReviews = [
      ...reviewSeed,
      ...extraReviewSeed,
      ...dmartReviewSeed,
      ...expandedReviews,
      ...originalExpansionReviews,
    ];

    await tx.insert(categories).values(enhancedCategories);
    await tx.insert(products).values(enhancedProducts);
    await tx.insert(reviews).values(allReviews);
  });
}

export function ensureDatabase() {
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrapDatabase().catch((error) => {
      bootstrapPromise = null;
      throw error;
    });
  }
  return bootstrapPromise;
}
