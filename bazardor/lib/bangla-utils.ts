const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
}

export function formatBanglaPrice(price: number): string {
  const formatted = price.toLocaleString("en-US");
  return `${toBengaliNumber(formatted)} টাকা`;
}

const bengaliDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const bengaliMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function getBanglaDate(date?: Date): string {
  const d = date || new Date();
  const dayName = bengaliDays[d.getDay()];
  const dayNumber = toBengaliNumber(d.getDate());
  const monthName = bengaliMonths[d.getMonth()];
  const yearNumber = toBengaliNumber(d.getFullYear());

  return `${dayName}, ${dayNumber} ${monthName}, ${yearNumber}`;
}
