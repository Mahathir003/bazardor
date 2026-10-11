"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/bangla-utils";
import toast from "react-hot-toast";

const categories = [
  { name: "চাল", slug: "chal", emoji: "🍚" },
  { name: "ডাল", slug: "dal", emoji: "🫘" },
  { name: "তেল", slug: "tel", emoji: "🫙" },
  { name: "সবজি", slug: "sobji", emoji: "🥬" },
  { name: "মাছ", slug: "mach", emoji: "🐟" },
  { name: "মাংস", slug: "mangsho", emoji: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dudh", emoji: "🥛" },
  { name: "মসলা", slug: "moshla", emoji: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
      toast.success("লগআউট সফল হয়েছে");
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Bangla Date */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#007a3d] rounded-xl flex items-center justify-center text-white shadow-sm">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900 block leading-tight">
              বাজার দর
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              {getBanglaDate()}
            </span>
          </div>
        </Link>

        {/* Right Auth controls */}
        <div className="relative">
          {session ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-gray-50 transition"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    session.user.name?.charAt(0) || "U"
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-800 hidden sm:inline">
                  {session.user.name || "Rezwan"}
                </span>
                <span className="text-xs text-gray-400">▾</span>
              </button>

              {/* User Dropdown matching screenshot */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
                  <div className="pb-3 border-b border-gray-100">
                    <p className="font-bold text-sm text-gray-900">
                      {session.user.name || "Rezwan Ahmed"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <div className="py-2 space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#007a3d] p-2 rounded-lg hover:bg-gray-50"
                    >
                      <span>👤</span> আমার প্রোফাইল
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 p-2 rounded-lg"
                    >
                      <span>↩</span> সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-1.5"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="bg-[#007a3d] hover:bg-[#056835] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Category Pill Links */}
      <div className="border-t border-gray-100 py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-3 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-medium">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#007a3d] text-white font-semibold shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
