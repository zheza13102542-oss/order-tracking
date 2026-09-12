import type { Order } from "./types";

/**
 * ข้อมูลจำลองสำหรับการทดสอบ — ในระบบจริงจะถูกแทนที่ด้วยการอ่านจากฐานข้อมูล
 * โดยที่ฝั่ง UI ไม่ต้องแก้ เพราะเรียกผ่าน /api/orders เหมือนกัน
 */
export const ORDERS: Order[] = [
  {
    id: "ORD-2587965432159-458",
    createdAt: "2026-08-21T15:42:00+07:00",
    status: "in_progress",
    customer: "บริษัท ไร่ทองการพิมพ์ จำกัด",
    channel: "หน้าร้าน สาขาพระราม 2",
    items: [
      { name: "นามบัตร 4 สี เคลือบด้าน", qty: 2000, unit: "ใบ" },
      { name: "ซองจดหมายพิมพ์โลโก้", qty: 500, unit: "ซอง" },
    ],
    total: 8450,
    dueAt: "2026-08-26T17:00:00+07:00",
    note: "แก้ไขสีโลโก้ตามไฟล์ล่าสุดที่ส่งวันที่ 22/08",
    events: [
      { step: "received", at: "2026-08-21T15:42:00+07:00" },
      { step: "paid", at: "2026-08-21T16:10:00+07:00" },
      { step: "queued", at: "2026-08-22T09:05:00+07:00" },
      { step: "in_progress", at: "2026-08-24T08:30:00+07:00" },
      { step: "completed", at: null },
    ],
  },
  {
    id: "ORD-2587965432160-102",
    createdAt: "2026-08-23T10:18:00+07:00",
    status: "awaiting_payment",
    customer: "คุณศิริพร ตั้งมั่น",
    channel: "LINE Official",
    items: [{ name: "สติกเกอร์ฉลากสินค้า ไดคัท", qty: 1200, unit: "ดวง" }],
    total: 3200,
    dueAt: "2026-08-29T17:00:00+07:00",
    note: "ยืนยันแบบแล้ว รอชำระมัดจำ 50%",
    events: [
      { step: "received", at: "2026-08-23T10:18:00+07:00" },
      { step: "paid", at: null },
      { step: "queued", at: null },
      { step: "in_progress", at: null },
      { step: "completed", at: null },
    ],
  },
  {
    id: "ORD-2587965432161-771",
    createdAt: "2026-08-24T09:02:00+07:00",
    status: "queued",
    customer: "ร้านกาแฟ บ้านสวนริมคลอง",
    channel: "เว็บไซต์",
    items: [
      { name: "เมนูตั้งโต๊ะ A5 เคลือบมัน", qty: 60, unit: "ชุด" },
      { name: "ป้ายไวนิลหน้าร้าน 1.2 x 2 ม.", qty: 2, unit: "ผืน" },
    ],
    total: 5980,
    dueAt: "2026-08-30T12:00:00+07:00",
    note: null,
    events: [
      { step: "received", at: "2026-08-24T09:02:00+07:00" },
      { step: "paid", at: "2026-08-24T09:40:00+07:00" },
      { step: "queued", at: "2026-08-24T11:15:00+07:00" },
      { step: "in_progress", at: null },
      { step: "completed", at: null },
    ],
  },
  {
    id: "ORD-2587965432162-034",
    createdAt: "2026-08-25T13:26:00+07:00",
    status: "queued",
    customer: "โรงเรียนวัดบางปลา",
    channel: "อีเมล",
    items: [{ name: "หนังสือรุ่น ปกแข็ง 120 หน้า", qty: 300, unit: "เล่ม" }],
    total: 74500,
    dueAt: "2026-09-15T17:00:00+07:00",
    note: "ตรวจปรู๊ฟรอบสุดท้ายก่อนขึ้นแท่น",
    events: [
      { step: "received", at: "2026-08-25T13:26:00+07:00" },
      { step: "paid", at: "2026-08-25T14:02:00+07:00" },
      { step: "queued", at: "2026-08-26T08:00:00+07:00" },
      { step: "in_progress", at: null },
      { step: "completed", at: null },
    ],
  },
  {
    id: "ORD-2587965431884-219",
    createdAt: "2026-07-30T11:07:00+07:00",
    status: "completed",
    customer: "บริษัท ไร่ทองการพิมพ์ จำกัด",
    channel: "หน้าร้าน สาขาพระราม 2",
    items: [{ name: "โบรชัวร์พับสามตอน 4 สี", qty: 5000, unit: "แผ่น" }],
    total: 18900,
    dueAt: "2026-08-05T17:00:00+07:00",
    note: null,
    events: [
      { step: "received", at: "2026-07-30T11:07:00+07:00" },
      { step: "paid", at: "2026-07-30T11:45:00+07:00" },
      { step: "queued", at: "2026-07-31T08:20:00+07:00" },
      { step: "in_progress", at: "2026-08-01T09:10:00+07:00" },
      { step: "completed", at: "2026-08-04T16:35:00+07:00" },
    ],
  },
  {
    id: "ORD-2587965431790-660",
    createdAt: "2026-07-12T16:55:00+07:00",
    status: "completed",
    customer: "คุณธนกฤต ใจดี",
    channel: "LINE Official",
    items: [
      { name: "การ์ดแต่งงาน พิมพ์ฟอยล์ทอง", qty: 400, unit: "ใบ" },
      { name: "ซองการ์ด พิมพ์ชื่อ", qty: 400, unit: "ซอง" },
    ],
    total: 22400,
    dueAt: "2026-07-20T17:00:00+07:00",
    note: null,
    events: [
      { step: "received", at: "2026-07-12T16:55:00+07:00" },
      { step: "paid", at: "2026-07-12T17:20:00+07:00" },
      { step: "queued", at: "2026-07-13T09:00:00+07:00" },
      { step: "in_progress", at: "2026-07-15T10:30:00+07:00" },
      { step: "completed", at: "2026-07-18T15:10:00+07:00" },
    ],
  },
  {
    id: "ORD-2587965431655-903",
    createdAt: "2026-06-28T08:41:00+07:00",
    status: "completed",
    customer: "ร้านกาแฟ บ้านสวนริมคลอง",
    channel: "เว็บไซต์",
    items: [{ name: "ถุงกระดาษคราฟท์ พิมพ์โลโก้", qty: 1000, unit: "ใบ" }],
    total: 12750,
    dueAt: "2026-07-06T17:00:00+07:00",
    note: null,
    events: [
      { step: "received", at: "2026-06-28T08:41:00+07:00" },
      { step: "paid", at: "2026-06-28T09:15:00+07:00" },
      { step: "queued", at: "2026-06-29T08:30:00+07:00" },
      { step: "in_progress", at: "2026-07-01T13:00:00+07:00" },
      { step: "completed", at: "2026-07-04T11:20:00+07:00" },
    ],
  },
];

export function findOrder(code: string): Order | undefined {
  return ORDERS.find((order) => order.id === code);
}
