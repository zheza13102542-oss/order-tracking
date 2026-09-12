"use client";

import type { OrderTab } from "@/lib/types";

interface Props {
  value: OrderTab;
  onChange: (tab: OrderTab) => void;
}

const TABS: { id: OrderTab; label: string }[] = [
  { id: "current", label: "ออเดอร์ปัจจุบัน" },
  { id: "past", label: "ออเดอร์ที่ผ่านมา" },
];

export default function Tabs({ value, onChange }: Props) {
  return (
    <div role="tablist" aria-label="กลุ่มออเดอร์" className="flex border-b border-line">
      {TABS.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`-mb-px border-b-2 px-1 py-3 text-[15px] transition-colors first:mr-7 ${
              selected
                ? "border-navy font-semibold text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
