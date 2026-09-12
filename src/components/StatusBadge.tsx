import { STATUS } from "@/lib/status";
import type { OrderStatus } from "@/lib/types";

interface Props {
  status: OrderStatus;
  size?: "sm" | "md";
  showEnglish?: boolean;
}

export default function StatusBadge({
  status,
  size = "md",
  showEnglish = false,
}: Props) {
  const meta = STATUS[status];
  const scale =
    size === "sm" ? "text-xs px-2.5 py-1 gap-1.5" : "text-sm px-3 py-1.5 gap-2";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${meta.chip} ${scale}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} aria-hidden />
      {meta.label}
      {showEnglish && (
        <span className="opacity-60">· {meta.english}</span>
      )}
    </span>
  );
}
