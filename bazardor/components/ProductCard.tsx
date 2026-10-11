import Link from "next/link";
import { toBengaliNumber } from "@/lib/bangla-utils";

export interface MarketPrice {
  bazar: string;
  division?: string;
  min?: number;
  max?: number;
  avg?: number;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  emoji: string;
  unit: string;
  currentPrice: number;
  changePercent: number;
  description: string;
  markets: MarketPrice[];
}

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.changePercent > 0;
  const isDown = product.changePercent < 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform">
          {product.emoji}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#007a3d] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{product.unit}</p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block leading-tight">
            আজকের দাম
          </span>
          <span className="text-lg font-black text-gray-900">
            {toBengaliNumber(product.currentPrice)}{" "}
            <span className="text-sm font-semibold">টাকা</span>
          </span>
        </div>

        <div
          className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${
            isUp
              ? "text-red-600 bg-red-50/60"
              : isDown
                ? "text-emerald-700 bg-emerald-50/70"
                : "text-gray-400 bg-gray-50"
          }`}
        >
          {isUp && `▲ ${toBengaliNumber(product.changePercent)}%`}
          {isDown && `▼ ${toBengaliNumber(Math.abs(product.changePercent))}%`}
          {!isUp && !isDown && `— ০.০%`}
        </div>
      </div>
    </Link>
  );
}
