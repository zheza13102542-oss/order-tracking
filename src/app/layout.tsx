import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ติดตามออเดอร์ | โรงพิมพ์ไร่ทอง",
  description:
    "ตรวจสอบสถานะงานพิมพ์ด้วยหมายเลขออเดอร์ ดูคิว ความคืบหน้า และกำหนดส่งมอบ",
};

export const viewport: Viewport = {
  themeColor: "#0C2840",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
