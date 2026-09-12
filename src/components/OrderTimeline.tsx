import { formatDateTime } from "@/lib/format";
import { STEP_LABEL } from "@/lib/status";
import type { OrderEvent } from "@/lib/types";

export default function OrderTimeline({ events }: { events: OrderEvent[] }) {
  const currentIndex = events.findIndex((event) => !event.at);

  return (
    <ol className="relative ml-[7px] border-l border-line pl-5">
      {events.map((event, index) => {
        const done = Boolean(event.at);
        const isCurrent = index === currentIndex;

        return (
          <li key={event.step} className="relative pb-4 last:pb-0">
            <span
              className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 ${
                done
                  ? "border-navy bg-navy"
                  : isCurrent
                    ? "border-navy bg-white"
                    : "border-line bg-white"
              }`}
              aria-hidden
            />
            <p
              className={`text-sm ${
                done ? "font-medium text-ink" : isCurrent ? "font-medium text-navy" : "text-muted"
              }`}
            >
              {STEP_LABEL[event.step]}
            </p>
            <p className="code mt-0.5 text-xs text-muted">
              {done ? formatDateTime(event.at) : isCurrent ? "ขั้นตอนถัดไป" : "ยังไม่ถึงขั้นนี้"}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
