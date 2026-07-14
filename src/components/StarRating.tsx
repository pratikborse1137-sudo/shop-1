export function StarRating({
  rating,
  size = "sm",
  showValue = false,
  count,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
}) {
  const sizeClass =
    size === "lg" ? "text-xl" : size === "md" ? "text-base" : "text-sm";
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const roundedUp = rating - full >= 0.75;

  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex ${sizeClass} leading-none`} aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && roundedUp);
          const half = i === full && hasHalf;
          return (
            <span key={i} className="relative">
              <span className="text-amber-200">★</span>
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden text-amber-400"
                  style={{ width: half ? "50%" : "100%" }}
                >
                  ★
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-brand-700">
          {rating.toFixed(1)}
        </span>
      )}
      {typeof count === "number" && (
        <span className="text-sm text-brand-500">({count})</span>
      )}
    </div>
  );
}
