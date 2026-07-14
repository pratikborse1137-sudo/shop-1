"use client";

import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/db/schema";

export function ProductFilters({
  categories,
  totalCount,
}: {
  categories: Category[];
  totalCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentCategory = params.get("category") ?? "all";
  const organic = params.get("organic") === "true";
  const onSale = params.get("onSale") === "true";

  const setParam = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all" || value === "false") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const hasFilters =
    currentCategory !== "all" || organic || onSale || params.get("search");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-brand-800">
          Filters
        </h2>
        {hasFilters && (
          <button
            onClick={() =>
              router.push(pathname, { scroll: false })
            }
            className="text-xs font-semibold text-brand-500 underline hover:text-brand-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-400">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setParam({ category: null })}
            className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              currentCategory === "all"
                ? "bg-brand-600 text-white"
                : "text-brand-700 hover:bg-brand-100"
            }`}
          >
            <span>🛒 All products</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setParam({ category: cat.slug })}
              className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium transition-colors ${
                currentCategory === cat.slug
                  ? "bg-brand-600 text-white"
                  : "text-brand-700 hover:bg-brand-100"
              }`}
            >
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/80 text-base">
                {cat.imageUrl ? (
                  <Image
                    src={cat.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                ) : (
                  cat.emoji
                )}
              </span>
              <span className="text-left leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-400">
          Refine
        </h3>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100">
          <input
            type="checkbox"
            checked={organic}
            onChange={(e) =>
              setParam({ organic: e.target.checked ? "true" : null })
            }
            className="h-4 w-4 accent-brand-600"
          />
          🌱 Organic only
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) =>
              setParam({ onSale: e.target.checked ? "true" : null })
            }
            className="h-4 w-4 accent-brand-600"
          />
          🏷️ On sale
        </label>
      </div>

      <p className="text-sm text-brand-400">
        {totalCount} {totalCount === 1 ? "product" : "products"} found
      </p>
    </div>
  );
}
