import type { OrderStatus } from "./types";

interface StatusMeta {
  label: string;
  english: string;
  /** ข้อความบอกผู้ใช้ว่าตอนนี้เกิดอะไรขึ้น และต้องทำอะไรต่อ */
  hint: string;
  chip: string;
  dot: string;
  edge: string;
  /** true = ยังเป็นงานที่เดินอยู่ (อยู่ในแท็บ "ออเดอร์ปัจจุบัน") */
  active: boolean;
}

export const STATUS: Record<OrderStatus, StatusMeta> = {
  queued: {
    label: "อยู่ในคิว",
    english: "In Queue",
    hint: "รับงานเข้าระบบแล้ว กำลังรอคิวผลิตตามลำดับ",
    chip: "bg-status-queuedBg text-status-queuedFg",
    dot: "bg-status-queuedDot",
    edge: "bg-status-queuedDot",
    active: true,
  },
  in_progress: {
    label: "กำลังดำเนินการ",
    english: "In Progress",
    hint: "ทีมผลิตกำลังทำงานชิ้นนี้อยู่",
    chip: "bg-status-progressBg text-status-progressFg",
    dot: "bg-status-progressDot",
    edge: "bg-status-progressDot",
    active: true,
  },
  awaiting_payment: {
    label: "รอชำระเงิน",
    english: "Action Required",
    hint: "ชำระเงินเพื่อให้งานเข้าคิวผลิต",
    chip: "bg-status-payBg text-status-payFg",
    dot: "bg-status-payDot",
    edge: "bg-status-payDot",
    active: true,
  },
  completed: {
    label: "เสร็จสิ้น",
    english: "Completed",
    hint: "งานเสร็จและส่งมอบเรียบร้อย",
    chip: "bg-status-doneBg text-status-doneFg",
    dot: "bg-status-doneDot",
    edge: "bg-status-doneDot",
    active: false,
  },
};

export const STEP_LABEL: Record<string, string> = {
  received: "รับออเดอร์",
  paid: "ชำระเงิน",
  queued: "เข้าคิวผลิต",
  in_progress: "กำลังผลิต",
  completed: "ส่งมอบงาน",
};
