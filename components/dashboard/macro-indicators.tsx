"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MacroIndicatorsProps {
  className?: string;
}

export function MacroIndicators({ className }: MacroIndicatorsProps) {
  const indices = useQuery(api.marketIndices.get);
  const commodities = useQuery(api.commodities.list);

  const allIndicators = [
    ...(indices?.map((idx) => ({
      name: idx.name,
      value: idx.value,
      change: idx.change,
      changePercent: idx.changePercent,
      type: "index" as const,
    })) || []),
    ...(commodities?.map((comm) => ({
      name: comm.name,
      value: comm.price,
      change: comm.change,
      changePercent: comm.changePercent,
      type: "commodity" as const,
    })) || []),
  ];

  return (
    <div className={cn("border border-border bg-card flex flex-col min-h-0", className)}>
      <div className="panel-header flex items-center justify-between">
        <span>MACRO INDICATORS</span>
        <span className="opacity-60">LIVE</span>
      </div>
      
      <div className="flex-1 overflow-auto min-h-0 p-1">
        <div className="grid grid-cols-2 gap-1">
          {allIndicators.map((indicator) => {
            const isPositive = indicator.changePercent > 0;
            const isNeutral = indicator.changePercent === 0;
            
            return (
              <div
                key={indicator.name}
                className="bg-muted/20 border border-border p-2 hover:bg-muted/30 transition-colors"
              >
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {indicator.name}
                </div>
                <div className="font-mono text-sm font-semibold tabular-nums">
                  {indicator.type === "commodity" && indicator.name !== "Natural Gas" 
                    ? indicator.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : indicator.value.toFixed(2)
                  }
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-mono tabular-nums mt-0.5",
                  isNeutral ? "text-muted-foreground" : isPositive ? "text-gain glow-gain" : "text-loss glow-loss"
                )}>
                  {isNeutral ? (
                    <Minus className="h-3 w-3" strokeWidth={2} />
                  ) : isPositive ? (
                    <TrendingUp className="h-3 w-3" strokeWidth={2} />
                  ) : (
                    <TrendingDown className="h-3 w-3" strokeWidth={2} />
                  )}
                  {isPositive ? "+" : ""}{indicator.changePercent.toFixed(2)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
