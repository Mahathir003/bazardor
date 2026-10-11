import Link from "next/link";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import { toBengaliNumber } from "@/lib/bangla-utils";

interface MarketItem {
  bazar: string;
  division?: string;
  min?: number;
  max?: number;
  avg?: number;
  price?: number;
}

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  emoji: string;
  unit: string;
  currentPrice: number;
  prevPrice?: number;
  changePercent: number;
  description: string;
  markets: MarketItem[];
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (productsData as ProductItem[]).find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const prices = product.markets.map(
    (m) => m.avg ?? m.price ?? product.currentPrice,
  );
  const minPrice = prices.length ? Math.min(...prices) : product.currentPrice;
  const maxPrice = prices.length ? Math.max(...prices) : product.currentPrice;
  const avgPrice = prices.length
    ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    : product.currentPrice;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <Link href="/" className="hover:text-gray-800">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.categorySlug}`}
          className="hover:text-gray-800"
        >
          {product.category}
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-bold">{product.name}</span>
      </div>

      {/* Top Hero Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-5xl">
            {product.emoji}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              {product.name}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {product.unit} · {product.category}
            </p>
            <p className="text-xs text-gray-700 font-medium mt-2">
              {product.description}
            </p>
          </div>
        </div>

        <div className="bg-[#f8fbf8] border border-[#e4eee5] rounded-2xl p-5 text-center min-w-[160px] self-stretch md:self-auto flex flex-col justify-center items-center">
          <span className="text-[11px] text-gray-500 block">আজকের দর</span>
          <span className="text-3xl font-black text-gray-900 block mt-1">
            {toBengaliNumber(product.currentPrice)}
          </span>
          <span className="text-xs text-gray-500 block">
            টাকা / {product.unit.replace("প্রতি ", "")}
          </span>
          <span
            className={`text-xs font-bold mt-2 inline-block ${
              product.changePercent >= 0 ? "text-red-600" : "text-emerald-700"
            }`}
          >
            {product.changePercent >= 0 ? "▲" : "▼"}{" "}
            {toBengaliNumber(Math.abs(product.changePercent))}%
          </span>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-900">দামের সারসংক্ষেপ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-[11px] text-gray-400 block">
              সর্বনিম্ন দর
            </span>
            <span className="text-2xl font-black text-emerald-700 block mt-1">
              {toBengaliNumber(minPrice)} টাকা
            </span>
            <span className="text-[11px] text-gray-400 block mt-1">
              সবচেয়ে কম দামের বাজার
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-[11px] text-gray-400 block">সর্বাধিক দর</span>
            <span className="text-2xl font-black text-red-600 block mt-1">
              {toBengaliNumber(maxPrice)} টাকা
            </span>
            <span className="text-[11px] text-gray-400 block mt-1">
              সবচেয়ে বেশি দামের বাজার
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-[11px] text-gray-400 block">গড় দর</span>
            <span className="text-2xl font-black text-emerald-700 block mt-1">
              {toBengaliNumber(avgPrice)} টাকা
            </span>
            <span className="text-[11px] text-gray-400 block mt-1">
              {product.unit}-এর হিসাবে
            </span>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold">
                <th className="py-3 px-3">বাজার</th>
                <th className="py-3 px-3">বিভাগ</th>
                <th className="py-3 px-3 text-center">সর্বনিম্ন</th>
                <th className="py-3 px-3 text-center">সর্বাধিক</th>
                <th className="py-3 px-3 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {product.markets.map((m, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-gray-900">
                    {m.bazar}
                  </td>
                  <td className="py-3.5 px-3 text-gray-500">
                    {m.division || "ঢাকা"}
                  </td>
                  <td className="py-3.5 px-3 text-center font-medium">
                    {toBengaliNumber(m.min ?? m.price ?? product.currentPrice)}{" "}
                    টাকা
                  </td>
                  <td className="py-3.5 px-3 text-center font-medium">
                    {toBengaliNumber(m.max ?? m.price ?? product.currentPrice)}{" "}
                    টাকা
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-gray-900">
                    {toBengaliNumber(m.avg ?? m.price ?? product.currentPrice)}{" "}
                    টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
