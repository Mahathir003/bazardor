"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/bangla-utils";

export default function LiveDateBadge() {
  const [dateText, setDateText] = useState("রবিবার, ১১ অক্টোবর, ২০২৬");

  useEffect(() => {
    setDateText(getBanglaDate(new Date()));
  }, []);

  return (
    <span className="inline-block bg-[#d2eada] text-[#007a3d] text-xs font-semibold px-3 py-1 rounded-full">
      {dateText}
    </span>
  );
}
