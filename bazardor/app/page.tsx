import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import LiveDateBadge from "@/components/LiveDateBadge";

export default function HomePage() {
  const risers = [...products]
    .filter((p) => p.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 6);

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      <section className="bg-[#e9f4eb] rounded-3xl p-8 sm:p-12 border border-[#d6ecda] relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <LiveDateBadge />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-block bg-[#007a3d] hover:bg-[#006834] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-sm transition"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center items-center">
            <img
              src="/bazar-hero.png"
              alt="বাজার দর হিরো চিত্র"
              className="w-64 sm:w-72 h-auto object-contain drop-shadow-md select-none"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-600 text-sm">▲</span>
          <h2 className="text-lg font-black text-gray-900">আজ দাম বেড়েছে</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {risers.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-emerald-700 text-sm">▼</span>
          <h2 className="text-lg font-black text-gray-900">আজ দাম কমেছে</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fallers.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-4">
          <h2 className="text-lg font-black text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-500">
            বাজারের সকল পণ্যের আজকের সার্বিক দর তালিকা
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
