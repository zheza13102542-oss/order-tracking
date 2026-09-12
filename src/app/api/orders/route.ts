import { NextResponse } from "next/server";
import { ORDERS, findOrder } from "@/lib/orders";
import { isValidOrderCode, normalizeOrderCode } from "@/lib/format";
import { STATUS } from "@/lib/status";
import type { OrderTab } from "@/lib/types";

/** หน่วงเวลาเล็กน้อยเพื่อให้เห็น Loading State เหมือนเรียก API จริง */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const tab = (searchParams.get("tab") ?? "current") as OrderTab;

  await delay(700);

  if (code) {
    const normalized = normalizeOrderCode(code);

    if (!isValidOrderCode(normalized)) {
      return NextResponse.json({ error: "INVALID_FORMAT" }, { status: 400 });
    }

    // รหัสสำหรับทดสอบ Error State ฝั่งเซิร์ฟเวอร์
    if (normalized === "ORD-0000000000000-000") {
      return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
    }

    const order = findOrder(normalized);
    if (!order) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({ order });
  }

  const orders = ORDERS.filter((order) =>
    tab === "current" ? STATUS[order.status].active : !STATUS[order.status].active
  ).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return NextResponse.json({ orders });
}
