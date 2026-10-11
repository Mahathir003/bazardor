import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "বাজার দর (BazarDor) - নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
  description:
    "দৈনন্দিন কাঁচাবাজার ও খাদ্যপণ্যের হালনাগাদ মূল্যের তথ্য ভান্ডার।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col justify-between antialiased">
        <Toaster position="top-right" />
        <div>
          <Suspense
            fallback={
              <div className="h-20 bg-white border-b border-gray-100" />
            }
          >
            <Navbar />
          </Suspense>
          <PriceTicker />
          <main className="py-6">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
