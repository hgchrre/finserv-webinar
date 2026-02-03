"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TrendingUp, TrendingDown } from "lucide-react";

export function MarketTicker() {
  const indices = useQuery(api.marketIndices.get);
  const commodities = useQuery(api.commodities.list);
  const currencies = useQuery(api.currencies.list);
  const crypto = useQuery(api.crypto.list);

  // Combine all ticker items
  const allItems = [
    ...(indices?.map((idx) => ({
      name: idx.name,
      value: idx.value,
      changePercent: idx.changePercent,
      type: "index" as const,
    })) || []),
    ...(commodities?.map((c) => ({
      name: c.name,
      value: c.price,
      changePercent: c.changePercent,
      type: "commodity" as const,
    })) || []),
    ...(currencies?.map((c) => ({
      name: c.pair,
      value: c.rate,
      changePercent: c.changePercent,
      type: "fx" as const,
    })) || []),
    ...(crypto?.map((c) => ({
      name: c.symbol,
      value: c.price,
      changePercent: c.changePercent,
      type: "crypto" as const,
    })) || []),
  ];

  // Duplicate for seamless looping
  const duplicatedItems = [...allItems, ...allItems];

  const formatValue = (value: number, type: string) => {
    if (type === "crypto" && value >= 1000) {
      return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    if (type === "fx") {
      return value.toFixed(4);
    }
    return value.toFixed(2);
  };

  return (
    <div className="border-b border-border bg-card overflow-hidden">
      <div className="px-3 py-2.5 overflow-hidden">
        <div className="flex items-center gap-5 min-w-max animate-scroll">
          {duplicatedItems.map((item, idx) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {idx > 0 && (
                  <span className="text-border text-muted-foreground/20 font-mono">│</span>
                )}
                <span className="text-muted-foreground uppercase tracking-wider text-xs font-sans">
                  {item.name}
                </span>
                <span className="text-foreground font-semibold font-mono text-sm tabular-nums">
                  {formatValue(item.value, item.type)}
                </span>
                <div
                  className={`flex items-center gap-1 font-mono text-xs tabular-nums ${
                    isPositive ? "text-gain glow-gain" : "text-loss glow-loss"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <TrendingDown className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                  )}
                  <span>
                    {isPositive ? "+" : ""}{item.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
