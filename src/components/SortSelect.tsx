"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const options = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Alphabetical" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("sort") ?? "featured";

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-brand-500">Sort</label>
      <select
        value={current}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          if (e.target.value === "featured") next.delete("sort");
          else next.set("sort", e.target.value);
          router.push(`${pathname}?${next.toString()}`, { scroll: false });
        }}
        className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-800 shadow-sm focus:border-brand-400 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
