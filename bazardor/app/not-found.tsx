import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[55vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="text-7xl font-black text-[#007a3d]">৪০৪</div>
      <h2 className="text-2xl font-bold text-gray-900">
        পৃষ্ঠাটি পাওয়া যায়নি
      </h2>
      <p className="text-sm text-gray-500 max-w-sm">
        আপনি যে লিংকটি খুঁজছেন তা সরানো হয়েছে অথবা ঠিকানাটি সঠিক নয়।
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-block bg-[#007a3d] hover:bg-[#006834] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition shadow-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
