/** รูปแบบที่ระบบรับ: ORD- ตามด้วยตัวเลข และต่อท้ายด้วย -ตัวเลข ได้อีกหนึ่งชุด */
export const ORDER_PATTERN = /^ORD-\d{4,}(?:-\d{1,6})?$/;

export const ORDER_FORMAT_HINT = "ORD-2587965432159-458";

export function normalizeOrderCode(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidOrderCode(value: string): boolean {
  return ORDER_PATTERN.test(normalizeOrderCode(value));
}

const pad = (n: number) => String(n).padStart(2, "0");

/** 21/08/2026 15:42 น. */
export function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())} น.`;
}

export function formatBaht(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}
