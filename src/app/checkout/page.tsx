"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

const DELIVERY_CENTS = 4900;
const FREE_DELIVERY_THRESHOLD = 49900;

type Confirmation = {
  orderNumber: string;
  totalCents: number;
  subtotalCents: number;
  deliveryCents: number;
};

const emptyForm = {
  customerName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  deliveryNotes: "",
};

export default function CheckoutPage() {
  const { items, subtotalCents, updateQuantity, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const deliveryCents =
    subtotalCents >= FREE_DELIVERY_THRESHOLD || subtotalCents === 0
      ? 0
      : DELIVERY_CENTS;
  const discountCents = promoApplied
    ? Math.min(1000, Math.round(subtotalCents * 0.33))
    : 0;
  const totalCents = Math.max(0, subtotalCents - discountCents) + deliveryCents;

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function applyPromo() {
    if (promo.trim().toUpperCase() === "FRESH10" && subtotalCents >= 30000) {
      setPromoApplied(true);
      setError("");
    } else {
      setError("Invalid code or minimum ₹300 spend not met.");
    }
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (items.length === 0) {
      setError("Your basket is empty.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not place order.");
        return;
      }
      setConfirmation(data);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="animate-fade-in rounded-[2.5rem] border border-brand-100 bg-white p-10 shadow-xl">
          <span className="animate-pop inline-block text-6xl">🎉</span>
          <h1 className="mt-4 font-display text-3xl font-bold text-brand-900">
            Order confirmed!
          </h1>
          <p className="mt-2 text-brand-600">
            Thank you for shopping with JP SHOP. A confirmation is on its way to
            your inbox.
          </p>
          <div className="mt-6 rounded-2xl bg-brand-50 p-5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-500">Order number</span>
              <span className="font-mono font-bold text-brand-800">
                {confirmation.orderNumber}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-brand-500">Total paid</span>
              <span className="font-display text-lg font-bold text-brand-800">
                {formatPrice(confirmation.totalCents)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-brand-500">Delivery</span>
              <span className="text-sm font-medium text-brand-600">
                {confirmation.deliveryCents === 0
                  ? "Free · same-day"
                  : formatPrice(confirmation.deliveryCents)}
              </span>
            </div>
          </div>
          <p className="mt-6 text-sm text-brand-500">
            🚚 Estimated delivery: today, within 2 hours
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <span className="text-6xl">🧺</span>
        <h1 className="mt-4 font-display text-3xl font-bold text-brand-900">
          Your basket is empty
        </h1>
        <p className="mt-2 text-brand-600">
          Add some fresh groceries before checking out.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Browse the market
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-brand-400">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <span className="text-brand-700">Checkout</span>
      </nav>
      <h1 className="mb-8 font-display text-4xl font-bold text-brand-900">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <form onSubmit={placeOrder} className="flex flex-col gap-6">
          <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-brand-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-sm text-white">
                1
              </span>
              Contact details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  Full name *
                </label>
                <input
                  required
                  value={form.customerName}
                  onChange={(e) => update("customerName", e.target.value)}
                  className={inputClass}
                  placeholder="Jamie Parker"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                  placeholder="jamie@email.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass}
                  placeholder="07123 456789"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-brand-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-sm text-white">
                2
              </span>
              Delivery address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  Street address *
                </label>
                <input
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className={inputClass}
                  placeholder="12 Orchard Lane"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  City *
                </label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClass}
                  placeholder="London"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  Postcode *
                </label>
                <input
                  required
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                  className={inputClass}
                  placeholder="SW1A 1AA"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  Delivery notes
                </label>
                <textarea
                  value={form.deliveryNotes}
                  onChange={(e) => update("deliveryNotes", e.target.value)}
                  className={inputClass}
                  rows={2}
                  placeholder="Leave with the neighbour, gate code 1234…"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-brand-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-sm text-white">
                3
              </span>
              Payment
            </h2>
            <div className="rounded-xl bg-brand-50 p-4 text-sm text-brand-600">
              💳 This is a demo store. No real payment will be taken — click
              “Place order” to simulate a successful checkout.
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  Card number
                </label>
                <input
                  className={inputClass}
                  placeholder="4242 4242 4242 4242"
                  defaultValue="4242 4242 4242 4242"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  Expiry
                </label>
                <input className={inputClass} placeholder="12/28" defaultValue="12/28" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-600">
                  CVC
                </label>
                <input className={inputClass} placeholder="123" defaultValue="123" />
              </div>
            </div>
          </section>

          {error && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-[0.98] disabled:opacity-60"
          >
            {submitting
              ? "Placing order…"
              : `Place order · ${formatPrice(totalCents)}`}
          </button>
        </form>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-display text-xl font-bold text-brand-800">
              Order summary
            </h2>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.slug} className="flex items-center gap-3">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-100 bg-white">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    ) : (
                      <span className="text-2xl">{item.emoji}</span>
                    )}
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-700 px-1 text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight text-brand-800">
                      {item.name}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-200"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="text-xs text-brand-500">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-200"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-brand-800">
                    {formatPrice(item.priceCents * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-brand-100 pt-4">
              <div className="flex gap-2">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code"
                  disabled={promoApplied}
                  className="w-full rounded-full border border-brand-200 px-4 py-2 text-sm focus:border-brand-400 focus:outline-none disabled:bg-brand-50"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  disabled={promoApplied}
                  className="shrink-0 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-200 disabled:opacity-60"
                >
                  {promoApplied ? "Applied ✓" : "Apply"}
                </button>
              </div>
              {promoApplied && (
                <p className="mt-2 text-xs font-medium text-brand-600">
                  🎉 FRESH10 applied — you saved {formatPrice(discountCents)}!
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-brand-100 pt-4 text-sm">
              <div className="flex justify-between text-brand-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalCents)}</span>
              </div>
              {discountCents > 0 && (
                <div className="flex justify-between text-brand-600">
                  <span>Discount</span>
                  <span>−{formatPrice(discountCents)}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-600">
                <span>Delivery</span>
                <span>
                  {deliveryCents === 0 ? (
                    <span className="font-semibold text-brand-600">Free</span>
                  ) : (
                    formatPrice(deliveryCents)
                  )}
                </span>
              </div>
              <div className="mt-2 flex justify-between border-t border-brand-100 pt-3">
                <span className="font-display text-lg font-bold text-brand-800">
                  Total
                </span>
                <span className="font-display text-lg font-bold text-brand-800">
                  {formatPrice(totalCents)}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-brand-400">
            🔒 Secure checkout · 100% original products · Quality guaranteed
          </p>
        </aside>
      </div>
    </div>
  );
}
