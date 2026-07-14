import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { SortSelect } from "@/components/SortSelect";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  category?: string;
  search?: string;
  sort?: string;
  organic?: string;
  onSale?: string;
}>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      category: sp.category,
      search: sp.search,
      sort: sp.sort,
      organic: sp.organic === "true",
      onSale: sp.onSale === "true",
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === sp.category);
  const heading = sp.search
    ? `Results for “${sp.search}”`
    : sp.onSale
      ? "Special Offers"
      : activeCategory
        ? activeCategory.name
        : "The Store";
  const subheading = sp.search
    ? `${products.length} products match your search`
    : activeCategory
      ? activeCategory.description
      : "Browse our full range of daily-needs products — aata to zarda.";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-brand-400">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <span className="text-brand-700">{heading}</span>
      </nav>

      <div className="relative mb-8 overflow-hidden rounded-3xl border border-brand-100 bg-brand-900 px-6 py-10 shadow-sm sm:px-10">
        {activeCategory?.imageUrl && (
          <Image
            src={activeCategory.imageUrl}
            alt={activeCategory.name}
            fill
            className="object-cover opacity-35"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/80 to-brand-900/20" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-50 backdrop-blur">
            JP SHOP Kirana Collection
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-3 max-w-2xl text-brand-50/85">{subheading}</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="mb-8 rounded-3xl border border-brand-100 bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:mb-0 lg:self-start">
          <Suspense fallback={<div className="text-sm text-brand-400">Loading filters…</div>}>
            <ProductFilters categories={categories} totalCount={products.length} />
          </Suspense>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-brand-500">
              Showing{" "}
              <span className="font-semibold text-brand-800">
                {products.length}
              </span>{" "}
              products
            </p>
            <Suspense fallback={null}>
              <SortSelect />
            </Suspense>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
              <span className="text-6xl">🔍</span>
              <p className="mt-4 font-display text-xl font-semibold text-brand-800">
                No products found
              </p>
              <p className="mt-1 text-brand-500">
                Try adjusting your filters or search.
              </p>
              <Link
                href="/products"
                className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
