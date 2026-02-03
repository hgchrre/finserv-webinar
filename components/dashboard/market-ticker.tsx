"use client";

import { useEffect, useState } from "react";
import { marketIndices, type MarketIndex } from "@/app/data/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";

export function MarketTicker() {
  const [indices, setIndices] = useState<MarketIndex[]>(marketIndices);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((index, idx) => {
          const newValue = index.value + (Math.random() - 0.5) * 2;
          const newChange = index.change + (Math.random() - 0.5) * 0.5;
          const newChangePercent = ((newValue - index.value) / index.value) * 100;
          
          if (Math.abs(newChangePercent - index.changePercent) > 0.1) {
            setFlashIndex(idx);
            setTimeout(() => setFlashIndex(null), 300);
          }
          
          return {
            ...index,
            value: newValue,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate indices for seamless looping
  const duplicatedIndices = [...indices, ...indices];

  return (
    <div className="border-b border-border bg-card overflow-hidden">
      <div className="px-6 py-3 overflow-hidden">
        <div className="flex items-center gap-6 min-w-max animate-scroll">
          {duplicatedIndices.map((index, idx) => {
            const isPositive = index.changePercent >= 0;
            const originalIdx = idx % indices.length;
            const isFlashing = flashIndex === originalIdx;
            return (
              <div
                key={`${index.name}-${idx}`}
                className={`flex items-center gap-3 whitespace-nowrap transition-opacity ${isFlashing ? 'opacity-60' : ''}`}
              >
                {idx > 0 && (
                  <span className="text-border text-muted-foreground/20 font-mono">│</span>
                )}
                <span className="text-muted-foreground uppercase tracking-wider text-[11px] font-sans">
                  {index.name}
                </span>
                <span className="text-foreground font-semibold font-mono text-sm tabular-nums">
                  {index.value.toFixed(2)}
                </span>
                <div
                  className={`flex items-center gap-1.5 font-mono text-sm tabular-nums ${
                    isPositive 
                      ? "text-gain" 
                      : "text-loss"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  )}
                  <span>
                    {isPositive ? "+" : ""}
                    {index.change.toFixed(2)} ({isPositive ? "+" : ""}
                    {index.changePercent.toFixed(2)}%)
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
