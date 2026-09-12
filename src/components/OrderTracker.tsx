"use client";

import { useCallback, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import OrderCard from "./OrderCard";
import StatusLegend from "./StatusLegend";
import {
  EmptyList,
  InvalidFormat,
  LoadFailed,
  NotFound,
  OrderSkeleton,
} from "./States";
import type { Order, OrderTab } from "@/lib/types";

type ListState =
  | { status: "loading" }
  | { status: "ready"; orders: Order[] }
  | { status: "error" };

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; order: Order }
  | { status: "not_found" }
  | { status: "invalid" }
  | { status: "error" };

export default function OrderTracker() {
  const [tab, setTab] = useState<OrderTab>("current");
  const [list, setList] = useState<ListState>({ status: "loading" });
  const [search, setSearch] = useState<SearchState>({ status: "idle" });
  const [code, setCode] = useState<string | null>(null);
  const [listAttempt, setListAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setList({ status: "loading" });

    fetch(`/api/orders?tab=${tab}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
      })
      .then((data: { orders: Order[] }) => setList({ status: "ready", orders: data.orders }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setList({ status: "error" });
      });

    return () => controller.abort();
  }, [tab, listAttempt]);

  const runSearch = useCallback(async (value: string) => {
    setCode(value);
    setSearch({ status: "loading" });

    try {
      const res = await fetch(`/api/orders?code=${encodeURIComponent(value)}`);
      const data = await res.json();

      if (res.ok) {
        setSearch({ status: "found", order: data.order as Order });
        return;
      }
      if (data.error === "NOT_FOUND") return setSearch({ status: "not_found" });
      if (data.error === "INVALID_FORMAT") return setSearch({ status: "invalid" });
      setSearch({ status: "error" });
    } catch {
      setSearch({ status: "error" });
    }
  }, []);

  const clearSearch = useCallback(() => {
    setCode(null);
    setSearch({ status: "idle" });
  }, []);

  return (
    <div className="space-y-8">
      <SearchBar
        onSearch={runSearch}
        onClear={clearSearch}
        loading={search.status === "loading"}
        activeCode={code}
      />

      {search.status === "idle" ? (
        <section>
          <Tabs value={tab} onChange={setTab} />

          <div
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
            className="mt-5"
          >
            {list.status === "loading" && <OrderSkeleton />}
            {list.status === "error" && (
              <LoadFailed onRetry={() => setListAttempt((n) => n + 1)} />
            )}
            {list.status === "ready" &&
              (list.orders.length === 0 ? (
                <EmptyList tab={tab} />
              ) : (
                <div className="space-y-3">
                  {list.orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ))}
          </div>
        </section>
      ) : (
        <section aria-label="ผลการค้นหา">
          <p className="mb-4 text-sm text-muted">
            ผลการค้นหาสำหรับ <span className="code text-ink">{code}</span>
          </p>

          {search.status === "loading" && <OrderSkeleton rows={1} />}
          {search.status === "found" && <OrderCard order={search.order} defaultOpen />}
          {search.status === "not_found" && (
            <NotFound code={code ?? ""} onReset={clearSearch} />
          )}
          {search.status === "invalid" && <InvalidFormat onReset={clearSearch} />}
          {search.status === "error" && (
            <LoadFailed onRetry={() => code && runSearch(code)} />
          )}
        </section>
      )}

      <StatusLegend />
    </div>
  );
}
