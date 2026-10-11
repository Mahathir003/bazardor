"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("Rezwan Ahmed");

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("লগআউট সফল হয়েছে");
    } catch {
      toast.error("লগআউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-xs text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User Info Card matching Figma */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center text-2xl font-bold text-gray-600">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              "👤"
            )}
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-900">{userName}</h2>
            <p className="text-xs text-gray-500">
              {session?.user?.email || "rezwanahmed@gmail.com"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
        >
          <span>↩</span> সাইন আউট
        </button>
      </div>

      {/* Information Box with Update action (Challenge C3) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900">তথ্য</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">
              নাম
            </label>
            <input
              type="text"
              readOnly
              value={userName}
              className="w-full bg-[#f8f9f8] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 cursor-not-allowed"
            />
          </div>

          <Link
            href="/profile/update"
            className="block text-center w-full bg-[#007a3d] hover:bg-[#006834] text-white text-sm font-bold py-3 rounded-xl transition shadow-sm"
          >
            আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}

