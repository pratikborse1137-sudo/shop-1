import { db } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import { reviews, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    await ensureDatabase();
    const data = await req.json();
    const { productSlug, author, rating, title, body } = data ?? {};

    if (
      typeof productSlug !== "string" ||
      typeof author !== "string" ||
      !author.trim() ||
      typeof body !== "string" ||
      !body.trim() ||
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5
    ) {
      return Response.json({ error: "Invalid review data" }, { status: 400 });
    }

    const product = await db
      .select({ slug: products.slug })
      .from(products)
      .where(eq(products.slug, productSlug))
      .limit(1);

    if (product.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const [inserted] = await db
      .insert(reviews)
      .values({
        productSlug,
        author: author.trim().slice(0, 60),
        rating: Math.round(rating),
        title: (title ?? "").toString().trim().slice(0, 120),
        body: body.trim().slice(0, 1000),
        verified: false,
      })
      .returning();

    // Recompute aggregate rating and count
    const [agg] = await db
      .select({
        avg: sql<number>`avg(${reviews.rating})`,
        count: sql<number>`count(*)`,
      })
      .from(reviews)
      .where(eq(reviews.productSlug, productSlug));

    await db
      .update(products)
      .set({
        rating: Math.round(Number(agg.avg) * 10) / 10,
        reviewCount: Number(agg.count),
      })
      .where(eq(products.slug, productSlug));

    return Response.json({ review: inserted }, { status: 201 });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
