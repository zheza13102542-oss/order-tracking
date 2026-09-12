"use client";

import { useId, useState } from "react";
import { ORDER_FORMAT_HINT, isValidOrderCode, normalizeOrderCode } from "@/lib/format";

interface Props {
  onSearch: (code: string) => void;
  onClear: () => void;
  loading: boolean;
  activeCode: string | null;
}

export default function SearchBar({ onSearch, onClear, loading, activeCode }: Props) {
  const [value, setValue] = useState("");
  const [formatError, setFormatError] = useState<string | null>(null);
  const inputId = useId();
  const helpId = `${inputId}-help`;

  function submit() {
    const code = normalizeOrderCode(value);

    if (!code) {
      setFormatError("กรอกหมายเลขออเดอร์ก่อนกดค้นหา");
      return;
    }
    if (!isValidOrderCode(code)) {
      setFormatError(`รูปแบบไม่ถูกต้อง ใช้ ORD- ตามด้วยตัวเลข เช่น ${ORDER_FORMAT_HINT}`);
      return;
    }

    setFormatError(null);
    setValue(code);
    onSearch(code);
  }

  function clear() {
    setValue("");
    setFormatError(null);
    onClear();
  }

  return (
    <div className="board-grid rounded-slab bg-navy-deep px-5 py-7 text-white shadow-raise sm:px-8 sm:py-9">
      <h1 className="max-w-[22ch] text-2xl font-semibold leading-snug sm:text-3xl">
        ติดตามงานของคุณด้วยหมายเลขออเดอร์
      </h1>
      <p className="mt-2 max-w-[46ch] text-sm text-white/65">
        กรอกหมายเลขที่ได้รับตอนเปิดงาน แล้วดูว่าตอนนี้งานอยู่ขั้นไหนของสายการผลิต
      </p>

      <div className="mt-6">
        <label htmlFor={inputId} className="block text-sm font-medium text-white/80">
          หมายเลขออเดอร์
        </label>

        <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
          <div className="relative flex-1">
            <span
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              aria-hidden
            >
              <svg viewBox="0 0 18 18" className="h-4.5 w-4.5" width="18" height="18">
                <circle
                  cx="8"
                  cy="8"
                  r="5.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12.2 12.2 16 16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              id={inputId}
              type="text"
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              value={value}
              placeholder={ORDER_FORMAT_HINT}
              aria-describedby={helpId}
              aria-invalid={formatError ? true : undefined}
              onChange={(event) => {
                setValue(event.target.value);
                if (formatError) setFormatError(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") submit();
              }}
              className={`code w-full rounded-lg border bg-white/95 py-3 pl-10 pr-10 text-[15px] text-ink placeholder:text-muted/50 ${
                formatError ? "border-status-payDot" : "border-transparent"
              }`}
            />
            {value && (
              <button
                type="button"
                onClick={clear}
                aria-label="ล้างช่องค้นหา"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-ink"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <path
                    d="m4 4 8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="rounded-lg bg-white px-6 py-3 text-[15px] font-semibold text-navy-deep transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "กำลังค้นหา…" : "ค้นหา"}
          </button>
        </div>

        <p
          id={helpId}
          className={`mt-2.5 text-[13px] ${
            formatError ? "text-status-payDot" : "text-white/55"
          }`}
          role={formatError ? "alert" : undefined}
        >
          {formatError ?? (
            <>
              รูปแบบที่ใช้ได้: <span className="code text-white/80">ORD-</span> ตามด้วยตัวเลข
              เช่น <span className="code text-white/80">{ORDER_FORMAT_HINT}</span>
            </>
          )}
        </p>

        {activeCode && (
          <button
            type="button"
            onClick={clear}
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-white/70 underline underline-offset-4 hover:text-white"
          >
            กลับไปดูรายการออเดอร์ทั้งหมด
          </button>
        )}
      </div>
    </div>
  );
}
