"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products" },
  { href: "/products?category=atta-rice-grains", label: "Staples" },
  { href: "/products?category=spices-masalas", label: "Masalas" },
  { href: "/products?category=household", label: "Household" },
  { href: "/products?onSale=true", label: "Offers" },
];

export function Header() {
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-[var(--color-cream)]/85 backdrop-blur-md">
      <div className="hidden bg-brand-700 py-1.5 text-center text-xs font-medium text-brand-50 sm:block">
        🚚 Free same-day home delivery on orders over ₹499 · Apna trusted kirana since 2015
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <button
          className="text-brand-800 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>

        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-xl shadow-sm">
            🛍️
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-tight text-brand-800">
              JP SHOP
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-500">
              General Kirana
            </span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href.split("?")[0] && link.href === pathname;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-brand-100 hover:text-brand-700 ${
                  active ? "text-brand-700" : "text-brand-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={submitSearch}
          className="ml-auto hidden max-w-xs flex-1 items-center rounded-full border border-brand-200 bg-white px-4 py-2 shadow-sm focus-within:border-brand-400 md:flex"
        >
          <span className="text-brand-400">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search aata, dal, chai…"
            className="ml-2 w-full bg-transparent text-sm text-brand-800 placeholder:text-brand-400 focus:outline-none"
          />
        </form>

        <button
          onClick={openCart}
          className="relative ml-auto flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md active:scale-95 md:ml-0"
          aria-label="Open cart"
        >
          <span className="text-lg">🛒</span>
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <span className="animate-pop absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-bold text-brand-900 shadow">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-brand-100 bg-[var(--color-cream)] px-4 py-4 lg:hidden">
          <form
            onSubmit={submitSearch}
            className="mb-3 flex items-center rounded-full border border-brand-200 bg-white px-4 py-2"
          >
            <span className="text-brand-400">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search aata, dal, chai…"
              className="ml-2 w-full bg-transparent text-sm focus:outline-none"
            />
          </form>
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
