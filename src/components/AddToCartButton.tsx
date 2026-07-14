"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/db/schema";

export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  label = "Add to cart",
  fullWidth = false,
}: {
  product: Pick<
    Product,
    "slug" | "name" | "emoji" | "gradient" | "priceCents" | "unit" | "imageUrl"
  >;
  quantity?: number;
  className?: string;
  label?: string;
  fullWidth?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
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
          quantity,
        );
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md active:scale-95 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {added ? (
        <>
          <span className="animate-pop">✓</span> Added
        </>
      ) : (
        <>
          <span>🛒</span> {label}
        </>
      )}
    </button>
  );
}
