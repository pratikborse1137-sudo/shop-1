import { db } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import { categories, products, reviews } from "@/db/schema";
import { and, asc, desc, eq, ilike, or, sql, inArray } from "drizzle-orm";
import type { Product } from "@/db/schema";

export async function getCategories() {
  await ensureDatabase();
  return db.select().from(categories).orderBy(asc(categories.id));
}

export async function getCategoryBySlug(slug: string) {
  await ensureDatabase();
  const rows = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getFeaturedProducts(limit = 8) {
  await ensureDatabase();
  return db
    .select()
    .from(products)
    .where(eq(products.featured, true))
    .orderBy(desc(products.rating))
    .limit(limit);
}

export async function getAllProducts() {
  await ensureDatabase();
  return db.select().from(products).orderBy(asc(products.id));
}

export type ProductFilters = {
  category?: string;
  search?: string;
  sort?: string;
  organic?: boolean;
  onSale?: boolean;
};

export async function getProducts(filters: ProductFilters): Promise<Product[]> {
  await ensureDatabase();
  const conditions = [];

  if (filters.category && filters.category !== "all") {
    conditions.push(eq(products.categorySlug, filters.category));
  }
  if (filters.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      or(ilike(products.name, term), ilike(products.description, term)),
    );
  }
  if (filters.organic) {
    conditions.push(eq(products.organic, true));
  }
  if (filters.onSale) {
    conditions.push(sql`${products.compareAtCents} is not null`);
  }

  const whereClause = conditions.length ? and(...conditions) : undefined;

  let orderBy;
  switch (filters.sort) {
    case "price-asc":
      orderBy = asc(products.priceCents);
      break;
    case "price-desc":
      orderBy = desc(products.priceCents);
      break;
    case "rating":
      orderBy = desc(products.rating);
      break;
    case "name":
      orderBy = asc(products.name);
      break;
    default:
      orderBy = desc(products.featured);
  }

  return db
    .select()
    .from(products)
    .where(whereClause)
    .orderBy(orderBy, asc(products.id));
}

export async function getProductBySlug(slug: string) {
  await ensureDatabase();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getReviewsForProduct(slug: string) {
  await ensureDatabase();
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.productSlug, slug))
    .orderBy(desc(reviews.createdAt));
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4,
) {
  await ensureDatabase();
  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.categorySlug, categorySlug),
        sql`${products.slug} <> ${excludeSlug}`,
      ),
    )
    .limit(limit);
}

export async function getProductsBySlugs(slugs: string[]) {
  await ensureDatabase();
  if (slugs.length === 0) return [];
  return db.select().from(products).where(inArray(products.slug, slugs));
}
