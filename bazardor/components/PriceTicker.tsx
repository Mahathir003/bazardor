import products from "@/data/products.json";
import { toBengaliNumber } from "@/lib/bangla-utils";

export default function PriceTicker() {
  const displayItems = [...products, ...products];

  return (
    <div className="bg-white border-b border-gray-100 overflow-hidden py-2.5 whitespace-nowrap">
      <div className="inline-flex gap-8 animate-marquee">
        {displayItems.map((p, idx) => {
          const isUp = p.changePercent > 0;
          const isDown = p.changePercent < 0;

          return (
            <div
              key={`${p.id}-${idx}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-gray-700"
            >
              <span className="text-sm">{p.emoji}</span>
              <span className="font-semibold text-gray-800">{p.name}</span>
              <span className="text-gray-600">
                {toBengaliNumber(p.currentPrice)} টাকা/
                {p.unit.replace("প্রতি ", "")}
              </span>
              <span
                className={`font-bold flex items-center gap-0.5 ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-emerald-600"
                      : "text-gray-400"
                }`}
              >
                {isUp && `▲ ${toBengaliNumber(p.changePercent)}%`}
                {isDown && `▼ ${toBengaliNumber(Math.abs(p.changePercent))}%`}
                {!isUp && !isDown && `— ০.০%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
