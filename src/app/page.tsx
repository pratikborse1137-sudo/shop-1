import Link from "next/link";
import Image from "next/image";
import { getCategories, getFeaturedProducts } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const perks = [
  { icon: "🛒", title: "Daily Needs", text: "175+ curated essentials across 12 categories" },
  { icon: "🚚", title: "Free Home Delivery", text: "On orders over ₹499 — within 2 hours" },
  { icon: "✅", title: "Original Brands Only", text: "Parle, Amul, Tata, HUL — 100% genuine" },
  { icon: "💰", title: "Fair Prices", text: "No MRP fraud, daily discounts on combos" },
];

const trustedBrands = [
  "AMUL", "TATA", "BRITANNIA", "PARLE", "FORTUNE", "EVEREST", "HALDIRAM'S", "SURF EXCEL",
];

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-20 lg:pt-16">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
              🛍️ Apna JP SHOP — your neighbourhood general store online
            </span>
            <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] tracking-tight text-brand-900 sm:text-6xl lg:text-7xl">
              Ghar ka <span className="text-brand-500">kirana,</span> <br className="hidden sm:block" />ghar pe le aao.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-brand-600">
              Aata, chawal, dal, tel, masale, chai, biscuit, safai ka samaan, dairy aur
              bahut kuch — trusted brands at fair prices, delivered fresh to your
              door within hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95"
              >
                Shop the store 🛒
              </Link>
              <Link
                href="/products?onSale=true"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-3.5 text-base font-semibold text-brand-700 transition-all hover:border-brand-300 hover:bg-brand-50"
              >
                Today&apos;s offers
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="font-display text-2xl font-bold text-brand-800">
                  25,000+
                </p>
                <p className="text-sm text-brand-500">Happy families</p>
              </div>
              <div className="h-10 w-px bg-brand-200" />
              <div>
                <p className="font-display text-2xl font-bold text-brand-800">
                  2hr
                </p>
                <p className="text-sm text-brand-500">Avg. delivery time</p>
              </div>
              <div className="h-10 w-px bg-brand-200" />
              <div>
                <p className="font-display text-2xl font-bold text-brand-800">
                  4.8★
                </p>
                <p className="text-sm text-brand-500">Rated by customers</p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
              <Image
                src="/images/hero-groceries.jpg"
                alt="JP SHOP groceries"
                width={720}
                height={720}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="animate-float-slow absolute -left-4 top-8 rounded-2xl bg-white px-4 py-3 shadow-xl">
              <p className="text-xs text-brand-400">Delivered in</p>
              <p className="font-display text-lg font-bold text-brand-800">
                🚚 Under 2 hours
              </p>
            </div>
            <div
              className="animate-float-slow absolute -bottom-4 right-4 rounded-2xl bg-white px-4 py-3 shadow-xl"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="text-xs text-brand-400">This week&apos;s best</p>
              <p className="font-display text-lg font-bold text-brand-800">
                🌾 5kg Ashirwad Atta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-brand-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-center gap-3">
              <span className="text-3xl">{perk.icon}</span>
              <div>
                <p className="font-semibold text-brand-800">{perk.title}</p>
                <p className="text-sm text-brand-500">{perk.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-brand-100 bg-white/70">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          <span className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
            Trusted brands
          </span>
          <div className="flex min-w-max flex-1 items-center justify-between gap-7">
            {trustedBrands.map((brand) => (
              <span
                key={brand}
                className="font-display text-sm font-black tracking-wide text-brand-700/70 sm:text-base"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">
              Shop by category
            </h2>
            <p className="mt-2 text-brand-500">
              Har category mein top brands — sab ek hi jagah.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-800 sm:block"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-36 overflow-hidden sm:h-44">
                {cat.imageUrl ? (
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className={`h-full w-full bg-gradient-to-br ${cat.gradient}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/25 to-transparent" />
                <span className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-3xl shadow-sm backdrop-blur">
                  {cat.emoji}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-lg font-bold leading-tight text-white drop-shadow">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/85">
                    Explore collection →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-wide text-brand-500">
              ⭐ Most-ordered items
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-brand-900 sm:text-4xl">
              Bhai log ki pasand
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-800 sm:block"
          >
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-800 px-8 py-14 text-center shadow-xl sm:px-16">
          <div className="absolute -left-8 -top-8 text-9xl opacity-10">🛍️</div>
          <div className="absolute -bottom-10 -right-6 text-9xl opacity-10">🌾</div>
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Pehli order, special offer.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-100">
              ₹100 off on your first order above ₹300, plus free home delivery.
              Use code{" "}
              <span className="rounded-lg bg-amber-400 px-2 py-0.5 font-mono font-bold text-brand-900">
                FRESH10
              </span>{" "}
              at checkout.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-base font-semibold text-brand-900 transition-all hover:bg-amber-300 active:scale-95"
            >
              Start shopping 🛒
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
