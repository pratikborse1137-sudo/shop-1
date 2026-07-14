import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="text-7xl">🍂</span>
      <h1 className="mt-6 font-display text-4xl font-bold text-brand-900">
        Page not found
      </h1>
      <p className="mt-3 text-brand-600">
        Yeh item shelf pe nahi mila. Chaliye wapas shopping list pe chalte
        hain.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Back to home
      </Link>
    </div>
  );
}
