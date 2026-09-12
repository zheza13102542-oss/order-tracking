import { ORDER_FORMAT_HINT } from "@/lib/format";

export function OrderSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">กำลังโหลดรายการออเดอร์</span>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-slab bg-card px-5 py-5 shadow-raise sm:px-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="w-full max-w-sm space-y-2.5">
              <div className="h-4 w-2/3 rounded bg-line" />
              <div className="h-3 w-1/3 rounded bg-line/70" />
            </div>
            <div className="h-6 w-28 shrink-0 rounded-full bg-line" />
          </div>
          <div className="mt-4 h-3 w-1/2 rounded bg-line/70" />
        </div>
      ))}
    </div>
  );
}

interface MessageProps {
  title: string;
  body: React.ReactNode;
  action?: React.ReactNode;
  tone?: "neutral" | "warning";
}

function Message({ title, body, action, tone = "neutral" }: MessageProps) {
  return (
    <div
      className={`rounded-slab border border-dashed px-6 py-10 text-center ${
        tone === "warning"
          ? "border-status-payDot/50 bg-status-payBg/40"
          : "border-line bg-card/60"
      }`}
    >
      <p className="text-base font-semibold text-ink">{title}</p>
      <div className="mx-auto mt-2 max-w-[52ch] text-sm text-muted">{body}</div>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function EmptyList({ tab }: { tab: "current" | "past" }) {
  return (
    <Message
      title={tab === "current" ? "ยังไม่มีงานที่กำลังเดินอยู่" : "ยังไม่มีงานที่ปิดจบ"}
      body={
        tab === "current"
          ? "เมื่อเปิดออเดอร์ใหม่ งานจะขึ้นมาที่นี่พร้อมสถานะล่าสุด"
          : "งานที่ส่งมอบแล้วจะถูกย้ายมาเก็บไว้ในแท็บนี้"
      }
    />
  );
}

export function NotFound({ code, onReset }: { code: string; onReset: () => void }) {
  return (
    <Message
      title="ไม่พบออเดอร์นี้ในระบบ"
      body={
        <>
          ไม่มีรายการที่ตรงกับ <span className="code text-ink">{code}</span>{" "}
          ลองตรวจตัวเลขอีกครั้งจากใบรับงานหรืออีเมลยืนยัน
        </>
      }
      action={
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-deep"
        >
          ดูรายการออเดอร์ทั้งหมด
        </button>
      }
    />
  );
}

export function InvalidFormat({ onReset }: { onReset: () => void }) {
  return (
    <Message
      tone="warning"
      title="รูปแบบหมายเลขไม่ถูกต้อง"
      body={
        <>
          หมายเลขออเดอร์ขึ้นต้นด้วย <span className="code text-ink">ORD-</span>{" "}
          แล้วตามด้วยตัวเลข เช่น{" "}
          <span className="code text-ink">{ORDER_FORMAT_HINT}</span>
        </>
      }
      action={
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-deep"
        >
          ล้างและค้นหาใหม่
        </button>
      }
    />
  );
}

export function LoadFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <Message
      tone="warning"
      title="โหลดข้อมูลไม่สำเร็จ"
      body="ระบบติดต่อเซิร์ฟเวอร์ไม่ได้ ข้อมูลออเดอร์ของคุณยังอยู่ครบ ลองโหลดใหม่อีกครั้ง"
      action={
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-deep"
        >
          ลองใหม่
        </button>
      }
    />
  );
}
