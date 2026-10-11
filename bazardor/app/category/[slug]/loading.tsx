import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 animate-pulse">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 h-28"></div>
      <div className="bg-white rounded-2xl p-3 h-12 border border-gray-100"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
