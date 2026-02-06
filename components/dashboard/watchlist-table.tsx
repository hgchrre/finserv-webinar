"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface WatchlistTableProps {
  className?: string;
}

export function WatchlistTable({ className }: WatchlistTableProps) {
  const securities = useQuery(api.securities.list);

  const formatVolume = (vol: number) => {
    if (vol >= 1e9) return (vol / 1e9).toFixed(1) + "B";
    if (vol >= 1e6) return (vol / 1e6).toFixed(1) + "M";
    if (vol >= 1e3) return (vol / 1e3).toFixed(1) + "K";
    return vol.toString();
  };

  return (
    <div className={cn("border border-border bg-card flex flex-col min-h-0 max-h-full", className)}>
      <div className="panel-header flex items-center justify-between flex-shrink-0">
        <span>WATCHLIST</span>
        <span className="opacity-60">EQUITIES</span>
      </div>
      
      <div className="flex-1 overflow-auto min-h-0 max-h-full">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-card border-b border-border">
            <tr className="text-muted-foreground">
              <th className="text-left py-2.5 px-2 font-medium text-xs">SYMBOL</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs">LAST</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs">CHG</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs">%CHG</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs">VOL</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {securities && securities.length > 0 ? (
              securities.map((sec) => {
                const isPositive = sec.changePercent >= 0;
                return (
                  <tr
                    key={sec._id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors h-11"
                  >
                    <td className="py-2.5 px-2">
                      <span className="text-primary font-semibold">{sec.symbol}</span>
                    </td>
                    <td className="text-right py-2.5 px-2 tabular-nums text-xs">
                      {sec.price.toFixed(2)}
                    </td>
                    <td className={cn(
                      "text-right py-2.5 px-2 tabular-nums text-xs",
                      isPositive ? "text-gain glow-gain" : "text-loss glow-loss"
                    )}>
                      {isPositive ? "+" : ""}{sec.change.toFixed(2)}
                    </td>
                    <td className={cn(
                      "text-right py-2.5 px-2 tabular-nums text-xs flex items-center justify-end gap-1",
                      isPositive ? "text-gain glow-gain" : "text-loss glow-loss"
                    )}>
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" strokeWidth={2} />
                      ) : (
                        <TrendingDown className="h-3 w-3" strokeWidth={2} />
                      )}
                      {isPositive ? "+" : ""}{sec.changePercent.toFixed(2)}%
                    </td>
                    <td className="text-right py-2.5 px-2 tabular-nums text-xs text-muted-foreground">
                      {formatVolume(sec.volume)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground text-xs">
                  {securities === undefined ? "Loading..." : "No securities data"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
