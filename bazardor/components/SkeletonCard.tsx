export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
        </div>
      </div>
      <div className="mt-5 pt-3 border-t border-gray-50 flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-100 rounded w-12"></div>
      </div>
    </div>
  );
}
