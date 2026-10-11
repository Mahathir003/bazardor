"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    try {
      const res = await signUp.email({ name, email, password });
      if (res.error) {
        toast.error(res.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      } else {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে! দয়া করে লগইন করুন।");
        router.push("/signin");
      }
    } catch {
      toast.error("রেজিস্ট্রেশন সম্পন্ন করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "github") => {
    try {
      await signIn.social({ provider, callbackURL: "/" });
    } catch {
      toast.error("সোশ্যাল লগইনে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-xs text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full bg-[#f8f9f8] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#007a3d]"
            />
          </div>

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

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              className="w-full bg-[#f8f9f8] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#007a3d]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007a3d] hover:bg-[#006834] text-white text-sm font-bold py-3 rounded-xl transition shadow-sm"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
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
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-[#007a3d] font-bold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-800">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
