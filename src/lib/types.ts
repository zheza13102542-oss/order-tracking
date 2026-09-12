export type OrderStatus =
  | "queued"
  | "in_progress"
  | "completed"
  | "awaiting_payment";

export interface OrderItem {
  name: string;
  qty: number;
  unit: string;
}

export interface OrderEvent {
  /** ขั้นของงาน — ใช้วาดเส้นทางเดินของออเดอร์ */
  step: "received" | "paid" | "queued" | "in_progress" | "completed";
  at: string | null;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: string;
  channel: string;
  items: OrderItem[];
  total: number;
  dueAt: string | null;
  note: string | null;
  events: OrderEvent[];
}

export type OrderTab = "current" | "past";
