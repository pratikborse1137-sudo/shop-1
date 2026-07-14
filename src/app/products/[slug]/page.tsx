import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getReviewsForProduct,
  getRelatedProducts,
  getCategoryBySlug,
} from "@/lib/queries";
import { formatPrice, formatDate } from "@/lib/format";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery, ProductPurchase } from "@/components/ProductDetailClient";
import { ReviewForm } from "@/components/ReviewForm";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, related, category] = await Promise.all([
    getReviewsForProduct(slug),
    getRelatedProducts(product.categorySlug, slug, 4),
    getCategoryBySlug(product.categorySlug),
  ]);

  const savings = product.compareAtCents
    ? product.compareAtCents - product.priceCents
    : 0;

  const ratingBuckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-brand-400">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-600">Shop</Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/products?category=${category.slug}`}
              className="hover:text-brand-600"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-brand-700">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="animate-fade-in">
          <ProductGallery product={product} />
        </div>

        <div className="animate-fade-in flex flex-col">
          {category && (
            <Link
              href={`/products?category=${category.slug}`}
              className="text-sm font-bold uppercase tracking-wide text-brand-500 hover:text-brand-700"
            >
              {category.emoji} {category.name}
            </Link>
          )}
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-brand-900 sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} showValue />
            <a href="#reviews" className="text-sm text-brand-500 hover:text-brand-700">
              {product.reviewCount} review{product.reviewCount === 1 ? "" : "s"}
            </a>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-brand-800">
              {formatPrice(product.priceCents)}
            </span>
            {product.compareAtCents && (
              <>
                <span className="text-xl text-brand-400 line-through">
                  {formatPrice(product.compareAtCents)}
                </span>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-bold text-rose-600">
                  Save {formatPrice(savings)}
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-brand-400">
            per {product.unit}
          </p>

          <p className="mt-5 text-brand-600">{product.longDescription}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-brand-100 bg-white p-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-brand-400">Origin</p>
              <p className="font-semibold text-brand-800">{product.origin}</p>
            </div>
            <div>
              <p className="text-brand-400">Unit</p>
              <p className="font-semibold text-brand-800">{product.unit}</p>
            </div>
            <div>
              <p className="text-brand-400">Availability</p>
              <p className="font-semibold text-brand-600">
                {product.stock > 0 ? "✓ In stock" : "Out of stock"}
              </p>
            </div>
          </div>

          {product.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium capitalize text-brand-700"
                >
                  {tag.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          )}

          <div className="mt-7">
            <ProductPurchase product={product} />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-500">
            <span>🚚 Same-day home delivery</span>
            <span>✅ 100% original brands</span>
            <span>🔄 Quality guaranteed</span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section id="reviews" className="mt-16 scroll-mt-28">
        <div className="mb-8 grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="rounded-3xl bg-gradient-to-br from-brand-100 to-brand-50 p-6">
            <p className="font-display text-5xl font-bold text-brand-900">
              {product.rating.toFixed(1)}
            </p>
            <div className="mt-2">
              <StarRating rating={product.rating} size="md" />
            </div>
            <p className="mt-1 text-sm text-brand-500">
              Based on {product.reviewCount} review
              {product.reviewCount === 1 ? "" : "s"}
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              {ratingBuckets.map((bucket) => {
                const pct = reviews.length
                  ? (bucket.count / reviews.length) * 100
                  : 0;
                return (
                  <div key={bucket.star} className="flex items-center gap-2 text-xs">
                    <span className="w-8 text-brand-600">{bucket.star}★</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-brand-400">
                      {bucket.count}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <ReviewForm productSlug={product.slug} />
            </div>
          </div>

          <div>
            <h2 className="mb-5 font-display text-2xl font-bold text-brand-900">
              Customer reviews
            </h2>
            {reviews.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-brand-200 bg-white p-10 text-center">
                <p className="text-4xl">💬</p>
                <p className="mt-3 font-semibold text-brand-800">
                  No reviews yet
                </p>
                <p className="text-sm text-brand-500">
                  Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="rounded-3xl border border-brand-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-display font-bold text-brand-700">
                          {review.author.charAt(0)}
                        </span>
                        <div>
                          <p className="font-semibold text-brand-800">
                            {review.author}
                          </p>
                          <p className="text-xs text-brand-400">
                            {formatDate(review.createdAt)}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    {review.title && (
                      <p className="mt-3 font-semibold text-brand-800">
                        {review.title}
                      </p>
                    )}
                    <p className="mt-1 text-brand-600">{review.body}</p>
                    {review.verified && (
                      <p className="mt-2 text-xs font-medium text-brand-500">
                        ✓ Verified purchase
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-brand-900 sm:text-3xl">
            You might also like
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
