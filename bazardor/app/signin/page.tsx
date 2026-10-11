"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn.email({ email, password });
      if (res.error) {
        toast.error(res.error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      } else {
        toast.success("লগইন সফল হয়েছে!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("লগইন সম্পন্ন করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "github") => {
    try {
      await signIn.social({ provider, callbackURL: callbackUrl });
    } catch {
      toast.error("সোশ্যাল লগইনে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-gray-900">সাইন ইন</h1>
        <p className="text-xs text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1">
            ইমেইল
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-[#f8f9f8] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#007a3d]"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full bg-[#f8f9f8] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#007a3d]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#007a3d] hover:bg-[#006834] text-white text-sm font-bold py-3 rounded-xl transition shadow-sm"
        >
          {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
        </button>
      </form>

      <div className="relative text-center">
        <div className="border-t border-gray-100 absolute inset-0 top-3"></div>
        <span className="relative bg-white px-3 text-xs text-gray-400">
          অথবা
        </span>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => handleSocial("google")}
          className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-gray-700 transition"
        >
          <span className="font-bold text-red-500">G</span> Google দিয়ে চালিয়ে
          যান
        </button>
        <button
          type="button"
          onClick={() => handleSocial("github")}
          className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-gray-700 transition"
        >
          <span>🐙</span> GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="text-center text-xs text-gray-500">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="text-[#007a3d] font-bold hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <Suspense
        fallback={
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-96 animate-pulse" />
        }
      >
        <SignInForm />
      </Suspense>

      <div className="text-center mt-6">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-800">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
