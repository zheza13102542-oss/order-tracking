import StatusBadge from "./StatusBadge";
import { STATUS } from "@/lib/status";
import type { OrderStatus } from "@/lib/types";

const ORDER_OF_STATUS: OrderStatus[] = [
  "awaiting_payment",
  "queued",
  "in_progress",
  "completed",
];

export default function StatusLegend() {
  return (
    <section className="rounded-slab border border-line bg-card/70 px-5 py-5 sm:px-6">
      <h2 className="text-sm font-semibold text-ink">สถานะแต่ละแบบหมายความว่าอย่างไร</h2>
      <dl className="mt-4 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
        {ORDER_OF_STATUS.map((status) => (
          <div key={status} className="flex items-start gap-3">
            <dt className="shrink-0">
              <StatusBadge status={status} size="sm" />
            </dt>
            <dd className="text-[13px] leading-relaxed text-muted">
              {STATUS[status].hint}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
