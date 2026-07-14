import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-100 bg-brand-800 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-xl">
                🛍️
              </span>
              <span className="font-display text-2xl font-bold text-white">
                JP SHOP
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-brand-200">
              Your trusted neighbourhood kirana — aata, chawal, masale, dairy and
              daily needs delivered to your door since 2015.
            </p>
            <div className="mt-4 flex gap-3 text-xl">
              <span>🌱</span>
              <span>🚚</span>
              <span>♻️</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Shop
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white">All Products</Link></li>
              <li><Link href="/products?category=atta-rice-grains" className="hover:text-white">Staples</Link></li>
              <li><Link href="/products?category=spices-masalas" className="hover:text-white">Masalas</Link></li>
              <li><Link href="/products?category=biscuits-snacks" className="hover:text-white">Snacks</Link></li>
              <li><Link href="/products?category=household" className="hover:text-white">Household</Link></li>
              <li><Link href="/products?onSale=true" className="hover:text-white">Special Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><span className="hover:text-white">About Us</span></li>
              <li><span className="hover:text-white">Our Brands</span></li>
              <li><span className="hover:text-white">Wholesale Enquiry</span></li>
              <li><span className="hover:text-white">Careers</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Stay Fresh
            </h4>
            <p className="mt-4 text-sm text-brand-200">
              Get seasonal recipes and exclusive offers.
            </p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-full bg-brand-700 px-4 py-2.5 text-sm text-white placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <button
                type="button"
                className="rounded-full bg-amber-400 px-4 py-2.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-amber-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-700 pt-6 text-xs text-brand-300 sm:flex-row">
          <p>© {new Date().getFullYear()} JP SHOP. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
