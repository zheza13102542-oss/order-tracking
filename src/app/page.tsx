import OrderTracker from "@/components/OrderTracker";

export default function Home() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-line/70">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 place-items-center rounded-md bg-navy-deep text-[13px] font-semibold text-white"
              aria-hidden
            >
              รท
            </span>
            <span className="text-[15px] font-semibold text-ink">โรงพิมพ์ไร่ทอง</span>
          </div>
          <a
            href="tel:021234567"
            className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            ติดต่อฝ่ายบริการ
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        <OrderTracker />
      </main>

      <footer className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
        <p className="text-[13px] text-muted">
          ข้อมูลอัปเดตอัตโนมัติทุกครั้งที่เปิดหน้านี้ · เวลาแสดงตามเขตเวลาประเทศไทย
        </p>
      </footer>
    </div>
  );
}
