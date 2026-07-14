"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/db/schema";
import { ProductVisual } from "@/components/ProductVisual";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const hasImage = product.imageUrl;

  // If product has an image, show it as main with emoji fallback views
  // If no image, show emoji-based gallery
  const mainView = hasImage
    ? { type: "image" as const, src: product.imageUrl!, label: "Front" }
    : { type: "emoji" as const, emoji: product.emoji, label: "Front" };

  const altViews = [
    { type: "emoji" as const, emoji: product.emoji, label: "Detail" },
    { type: "emoji" as const, emoji: product.emoji, label: "Fresh" },
  ];

  const allViews = [mainView, ...altViews];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-brand-100 bg-white">
        {allViews[active].type === "image" ? (
          <ProductVisual
            name={product.name}
            emoji={product.emoji}
            gradient={product.gradient}
            categorySlug={product.categorySlug}
            imageUrl={allViews[active].src}
            size="detail"
            priority
          />
        ) : (
          <ProductVisual
            name={product.name}
            emoji={product.emoji}
            gradient={product.gradient}
            categorySlug={product.categorySlug}
            imageUrl={null}
            size="detail"
          />
        )}
        {product.badge && (
          <span className="absolute left-5 top-5 rounded-full bg-brand-800 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow">
            {product.badge}
          </span>
        )}
        {product.organic && (
          <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700 shadow">
            🌱 Organic
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {allViews.map((view, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 transition-all ${
              active === i
                ? "border-brand-600 bg-brand-50"
                : "border-brand-100 bg-white hover:border-brand-200"
            }`}
          >
            {view.type === "image" ? (
              <Image
                src={view.src}
                alt={view.label}
                width={80}
                height={80}
                className="object-contain p-2"
              />
            ) : (
              <span className="text-4xl">{view.emoji}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-brand-200 bg-white shadow-sm">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-brand-700 transition-colors hover:bg-brand-100"
            aria-label="Decrease"
          >
            −
          </button>
          <span className="w-10 text-center font-semibold text-brand-800">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-brand-700 transition-colors hover:bg-brand-100"
            aria-label="Increase"
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            addItem(
              {
                slug: product.slug,
                name: product.name,
                emoji: product.emoji,
                gradient: product.gradient,
                imageUrl: product.imageUrl ?? undefined,
                priceCents: product.priceCents,
                unit: product.unit,
              },
              qty,
            );
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-[0.98]"
        >
          🛒 Add {qty} to basket · {formatPrice(product.priceCents * qty)}
        </button>
      </div>
    </div>
  );
}
