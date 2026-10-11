"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "Rezwan Ahmed");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser({ name });
      toast.success("তথ্য সফলভাবে পরিবর্তন করা হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য পরিবর্তন করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-gray-900">
            তথ্য পরিবর্তন করুন
          </h1>
          <p className="text-xs text-gray-500">
            আপনার নতুন নামটি নিচে লিখে সংরক্ষণ করুন।
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="নতুন নাম লিখুন"
              className="w-full bg-[#f8f9f8] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#007a3d]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007a3d] hover:bg-[#006834] text-white text-sm font-bold py-3 rounded-xl transition shadow-sm"
          >
            {loading ? "সংরক্ষণ হচ্ছে..." : "আপডেট ইনফরমেশন"}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/profile"
            className="text-xs text-gray-500 hover:text-gray-800"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
