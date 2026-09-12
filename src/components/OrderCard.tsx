"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import StatusBadge from "./StatusBadge";
import OrderTimeline from "./OrderTimeline";
import { formatBaht, formatDateTime } from "@/lib/format";
import { STATUS } from "@/lib/status";
import type { Order } from "@/lib/types";

interface Props {
  order: Order;
  /** เปิดรายละเอียดไว้ตั้งแต่แรก — ใช้ตอนแสดงผลลัพธ์การค้นหา */
  defaultOpen?: boolean;
}

export default function OrderCard({ order, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const meta = STATUS[order.status];
  const panelId = `detail-${order.id}`;

  return (
    <article className="relative overflow-hidden rounded-slab bg-card shadow-raise">
      <span className={`absolute inset-y-0 left-0 w-1 ${meta.edge}`} aria-hidden />

      <div className="pl-5 pr-4 py-4 sm:pl-6 sm:pr-5 sm:py-5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="code text-[15px] font-medium text-ink">{order.id}</p>
              <CopyButton value={order.id} />
            </div>
            <p className="code mt-1.5 text-[13px] text-muted">
              {formatDateTime(order.createdAt)}
            </p>
          </div>

          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <StatusBadge status={order.status} />
            <p className="code text-[13px] text-muted">{formatBaht(order.total)}</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted">
          {order.items[0].name}
          {order.items.length > 1 && ` และอีก ${order.items.length - 1} รายการ`}
        </p>
        <p className="mt-1 text-[13px] text-muted/80">{meta.hint}</p>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:underline"
        >
          {open ? "ซ่อนรายละเอียด" : "ดูรายละเอียด"}
          <svg
            viewBox="0 0 16 16"
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            <path
              d="m4 6 4 4 4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <div
            id={panelId}
            className="mt-4 grid gap-6 border-t border-line pt-4 md:grid-cols-[1fr_200px]"
          >
            <div>
              <ul className="divide-y divide-line">
                {order.items.map((item) => (
                  <li key={item.name} className="flex justify-between gap-4 py-2 text-sm">
                    <span className="text-ink">{item.name}</span>
                    <span className="code shrink-0 text-muted">
                      {item.qty.toLocaleString("th-TH")} {item.unit}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div className="flex justify-between gap-3 sm:block">
                  <dt className="text-muted">ลูกค้า</dt>
                  <dd className="text-ink sm:mt-0.5">{order.customer}</dd>
                </div>
                <div className="flex justify-between gap-3 sm:block">
                  <dt className="text-muted">ช่องทางที่สั่ง</dt>
                  <dd className="text-ink sm:mt-0.5">{order.channel}</dd>
                </div>
                <div className="flex justify-between gap-3 sm:block">
                  <dt className="text-muted">กำหนดส่งมอบ</dt>
                  <dd className="code text-ink sm:mt-0.5">{formatDateTime(order.dueAt)}</dd>
                </div>
                {order.note && (
                  <div className="flex justify-between gap-3 sm:block">
                    <dt className="text-muted">บันทึกจากทีมงาน</dt>
                    <dd className="text-ink sm:mt-0.5">{order.note}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-ink">ความคืบหน้า</p>
              <OrderTimeline events={order.events} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
