"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { toBengaliNumber } from "@/lib/bangla-utils";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default",
  );

  const categoryProducts = useMemo(() => {
    return productsData.filter((p) => p.categorySlug === params.slug);
  }, [params.slug]);

  // C1: Numeric value sorting (not alphabetical or string sorting)
  const sortedProducts = useMemo(() => {
    const list = [...categoryProducts];
    if (sortOrder === "asc")
      return list.sort((a, b) => a.currentPrice - b.currentPrice);
    if (sortOrder === "desc")
      return list.sort((a, b) => b.currentPrice - a.currentPrice);
    return list;
  }, [categoryProducts, sortOrder]);

  if (categoryProducts.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <div className="text-6xl">📁</div>
        <h2 className="text-2xl font-bold text-gray-800">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-sm text-gray-500">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
        </p>
        <Link
          href="/"
          className="inline-block bg-[#007a3d] text-white text-sm font-bold px-5 py-2.5 rounded-xl"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const categoryName = categoryProducts[0]?.category;
  const categoryEmoji = categoryProducts[0]?.emoji;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Top Banner Card matching Figma */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl">
          {categoryEmoji}
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">{categoryName}</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {toBengaliNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও
            পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort row (Challenge C1) */}
      <div className="bg-white rounded-2xl p-3 px-5 border border-gray-100 flex items-center justify-end gap-3 shadow-sm">
        <span className="text-xs text-gray-500 font-semibold">সাজান</span>
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "default" | "asc" | "desc")
          }
          className="bg-gray-50 border border-gray-200 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="text-xs text-gray-500 font-medium">
        মোট {toBengaliNumber(categoryProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
