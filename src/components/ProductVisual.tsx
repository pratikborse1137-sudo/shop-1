import Image from "next/image";

export type ProductVisualProps = {
  name: string;
  emoji: string;
  gradient: string;
  categorySlug: string;
  imageUrl?: string | null;
  size?: "card" | "detail" | "thumb";
  priority?: boolean;
};

const categoryAccent: Record<string, string> = {
  "atta-rice-grains": "Grains",
  "dal-pulses": "Pulses",
  "oils-ghee": "Oil & Ghee",
  "spices-masalas": "Masala",
  "sugar-salt": "Essentials",
  "tea-coffee": "Beverage",
  "biscuits-snacks": "Snack",
  "fresh-produce": "Fresh",
  "dairy-eggs": "Dairy",
  "bakery-breakfast": "Breakfast",
  "personal-care": "Care",
  household: "Home",
};

export function ProductVisual({
  name,
  emoji,
  gradient,
  categorySlug,
  imageUrl,
  size = "card",
  priority = false,
}: ProductVisualProps) {
  const isThumb = size === "thumb";
  const isDetail = size === "detail";

  if (imageUrl) {
    const isEditorial =
      imageUrl.includes("images.pexels.com") || imageUrl === "/images/hero-groceries.jpg";
    return (
      <Image
        src={imageUrl}
        alt={name}
        fill
        priority={priority}
        unoptimized={imageUrl.endsWith(".svg")}
        className={`transition-transform duration-500 group-hover:scale-105 ${
          isEditorial
            ? "object-cover"
            : `object-contain ${isThumb ? "p-1" : isDetail ? "p-8" : "p-4"}`
        }`}
        sizes={
          isThumb
            ? "64px"
            : isDetail
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        }
      />
    );
  }

  if (isThumb) {
    return <span className="text-2xl">{emoji}</span>;
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
      aria-label={name}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.65),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.22),transparent)]" />
      <div
        className={`relative flex flex-col overflow-hidden rounded-[1.35rem] bg-white/92 text-brand-900 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm ${
          isDetail ? "h-[70%] w-[58%] p-6" : "h-[72%] w-[64%] p-4"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="line-clamp-1 text-[10px] font-black uppercase tracking-[0.18em] text-brand-500">
              {name.split(/\s+/).slice(0, 2).join(" ")}
            </p>
            <p className="mt-1 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
              {categoryAccent[categorySlug] ?? "Kirana"}
            </p>
          </div>
          <span className={isDetail ? "text-5xl" : "text-4xl"}>{emoji}</span>
        </div>
        <div className="my-auto flex flex-col items-center text-center">
          <span
            className={`drop-shadow-md transition-transform duration-500 group-hover:scale-110 ${
              isDetail ? "text-8xl" : "text-6xl"
            }`}
          >
            {emoji}
          </span>
          <span className="mt-3 h-px w-12 bg-brand-200" />
        </div>
        <div className="mt-auto">
          <p
            className={`line-clamp-2 font-display font-bold leading-tight text-brand-900 ${
              isDetail ? "text-xl" : "text-sm"
            }`}
          >
            {name}
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-400">
            Quality assured
          </p>
        </div>
      </div>
      <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-white/20 blur-sm" />
    </div>
  );
}
