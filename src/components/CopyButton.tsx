"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  label?: string;
}

export default function CopyButton({ value, label = "คัดลอกเลขออเดอร์" }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // สำรองสำหรับเบราว์เซอร์ที่ยังไม่รองรับ Clipboard API
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label} ${value}`}
      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-xs text-muted transition-colors hover:border-navy hover:text-navy"
    >
      {copied ? (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <path
            d="M3 8.5 6.2 12 13 4.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <rect
            x="5.2"
            y="5.2"
            width="8"
            height="8"
            rx="1.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M10.8 3.2a1.6 1.6 0 0 0-1.6-1.6H4.3a2.7 2.7 0 0 0-2.7 2.7v4.9a1.6 1.6 0 0 0 1.6 1.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span aria-live="polite">{copied ? "คัดลอกแล้ว" : "คัดลอก"}</span>
    </button>
  );
}
