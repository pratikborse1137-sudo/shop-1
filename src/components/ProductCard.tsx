import Link from "next/link";
import type { Product } from "@/db/schema";
import { formatPrice } from "@/lib/format";
import { StarRating } from "@/components/StarRating";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductVisual } from "@/components/ProductVisual";

const badgeStyles: Record<string, string> = {
  Sale: "bg-rose-500 text-white",
  New: "bg-sky-500 text-white",
  Seasonal: "bg-amber-500 text-white",
  Bestseller: "bg-brand-600 text-white",
  Premium: "bg-purple-600 text-white",
  "Award Winner": "bg-yellow-500 text-white",
  Iconic: "bg-orange-500 text-white",
  Sweet: "bg-pink-500 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/products/${product.slug}`}
        className="relative flex aspect-square items-center justify-center overflow-hidden bg-white"
      >
        <ProductVisual
          name={product.name}
          emoji={product.emoji}
          gradient={product.gradient}
          categorySlug={product.categorySlug}
          imageUrl={product.imageUrl}
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${
                badgeStyles[product.badge] ?? "bg-brand-600 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.organic && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700 shadow-sm">
              🌱 Organic
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-base font-semibold leading-tight text-brand-900 transition-colors group-hover:text-brand-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-brand-500">
          {product.description}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-400">
          {product.unit}
        </p>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-brand-800">
              {formatPrice(product.priceCents)}
            </span>
            {product.compareAtCents && (
              <span className="text-sm text-brand-400 line-through">
                {formatPrice(product.compareAtCents)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-3">
          <AddToCartButton product={product} fullWidth label="Add to cart" />
        </div>
      </div>
    </div>
  );
}
