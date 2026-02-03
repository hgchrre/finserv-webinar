"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

interface SectorHeatmapProps {
  className?: string;
}

export function SectorHeatmap({ className }: SectorHeatmapProps) {
  const sectors = useQuery(api.sectorPerformance.list);

  // Sort sectors by absolute change for visual interest
  const sortedSectors = sectors?.slice().sort((a, b) => 
    Math.abs(b.changePercent) - Math.abs(a.changePercent)
  );

  const getHeatColor = (change: number) => {
    const intensity = Math.min(Math.abs(change) / 2, 1); // Cap at 2% for full intensity
    
    if (change > 0) {
      // Green gradient
      const alpha = 0.15 + intensity * 0.45;
      return `rgba(0, 255, 135, ${alpha})`;
    } else if (change < 0) {
      // Red gradient
      const alpha = 0.15 + intensity * 0.45;
      return `rgba(255, 59, 92, ${alpha})`;
    }
    return "rgba(115, 115, 115, 0.1)";
  };

  const getTextColor = (change: number) => {
    if (change > 0) return "text-gain";
    if (change < 0) return "text-loss";
    return "text-muted-foreground";
  };

  return (
    <div className={cn("border border-border bg-card flex flex-col min-h-0", className)}>
      <div className="panel-header flex items-center justify-between">
        <span>SECTOR PERFORMANCE</span>
        <span className="opacity-60">S&P 500</span>
      </div>
      
      <div className="flex-1 overflow-auto min-h-0 p-1">
        {sortedSectors && sortedSectors.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 h-full">
            {sortedSectors.map((sector) => (
              <div
                key={sector.sector}
                className="border border-border p-2 flex flex-col justify-between hover:border-border transition-colors"
                style={{ backgroundColor: getHeatColor(sector.changePercent) }}
              >
                <div className="text-xs text-foreground/80 uppercase tracking-wider leading-tight">
                  {sector.sector}
                </div>
                <div className={cn(
                  "font-mono text-sm font-bold tabular-nums",
                  getTextColor(sector.changePercent),
                  sector.changePercent > 0 ? "glow-gain" : sector.changePercent < 0 ? "glow-loss" : ""
                )}>
                  {sector.changePercent > 0 ? "+" : ""}{sector.changePercent.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
            {sectors === undefined ? "Loading..." : "No sector data"}
          </div>
        )}
      </div>
    </div>
  );
}
