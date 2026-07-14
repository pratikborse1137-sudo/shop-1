"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

const FREE_DELIVERY_THRESHOLD = 49900;

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotalCents,
    totalItems,
  } = useCart();

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotalCents);
  const progress = Math.min(100, (subtotalCents / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-brand-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[var(--color-cream)] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
          <h2 className="font-display text-xl font-bold text-brand-800">
            Your Basket{" "}
            <span className="text-base font-normal text-brand-500">
              ({totalItems})
            </span>
          </h2>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full text-brand-600 transition-colors hover:bg-brand-100"
            aria-label="Close cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="text-6xl">🧺</span>
            <p className="font-display text-xl font-semibold text-brand-800">
              Your basket is empty
            </p>
            <p className="text-sm text-brand-500">
              Time to stock up the kirana list!
            </p>
            <button
              onClick={closeCart}
              className="mt-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-brand-100 bg-white/60 px-5 py-3">
              {remaining > 0 ? (
                <p className="text-xs font-medium text-brand-600">
                  Add{" "}
                  <span className="font-bold text-brand-800">
                    {formatPrice(remaining)}
                  </span>{" "}
                  more for free delivery 🚚
                </p>
              ) : (
                <p className="text-xs font-bold text-brand-600">
                  🎉 You&apos;ve unlocked free delivery!
                </p>
              )}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li
                    key={item.slug}
                    className="flex gap-3 rounded-2xl border border-brand-100 bg-white p-3"
                  >
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white border border-brand-100"
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      ) : (
                        <span className="text-2xl">{item.emoji}</span>
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="font-medium leading-tight text-brand-800 hover:text-brand-600"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-brand-400">{item.unit}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.slug)}
                          className="text-brand-300 transition-colors hover:text-rose-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-brand-200 bg-brand-50">
                          <button
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-100"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm font-semibold text-brand-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-100"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold text-brand-800">
                          {formatPrice(item.priceCents * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-brand-100 bg-white px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-brand-500">Subtotal</span>
                <span className="font-display text-xl font-bold text-brand-800">
                  {formatPrice(subtotalCents)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md active:scale-[0.98]"
              >
                Checkout · {formatPrice(subtotalCents)}
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full py-2 text-center text-sm font-medium text-brand-500 hover:text-brand-700"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
