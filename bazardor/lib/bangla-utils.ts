const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
}

export function formatBanglaPrice(price: number): string {
  const formatted = price.toLocaleString("en-US");
  return `${toBengaliNumber(formatted)} টাকা`;
}

export function getBanglaDate(): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}
