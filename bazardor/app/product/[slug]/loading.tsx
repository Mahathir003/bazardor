export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-48"></div>
      <div className="bg-white rounded-3xl p-8 border border-gray-100 h-44"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 h-28"></div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 h-28"></div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 h-28"></div>
      </div>
      <div className="bg-white rounded-3xl p-8 border border-gray-100 h-72"></div>
    </div>
  );
}
