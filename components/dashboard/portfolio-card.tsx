"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioData } from "@/app/data/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LineChart = dynamic(() => import("recharts").then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false });
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });

const COLORS = [
  "var(--chart-1)",
  "var(--chart-3)",
  "var(--accent)",
];

interface PortfolioCardProps {
  className?: string;
}

export function PortfolioCard({ className }: PortfolioCardProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    return `$${(value / 1000000).toFixed(0)}M`;
  };

  // Generate sparkline data
  const sparklineData = portfolioData.performance.map((p, idx) => ({
    period: p.period,
    value: p.value,
  }));

  return (
    <Card className={cn("h-full flex flex-col min-h-0 panel-border rounded-none", className)}>
      <CardHeader>
        <CardTitle className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground">
          PORTFOLIO
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4 min-h-0">
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold font-mono text-foreground tabular-nums">
            {formatCurrency(portfolioData.totalAUM)}
          </div>
          <div className="text-xs text-muted-foreground font-sans uppercase tracking-wider">
            AUM
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2.5 flex-1 min-h-0">
          {portfolioData.holdings.map((holding, idx) => (
            <Fragment key={holding.assetClass}>
              <span className="text-muted-foreground font-sans uppercase tracking-wider text-xs">
                {holding.assetClass}
              </span>
              <span className="font-mono font-semibold tabular-nums text-xs text-right">
                {holding.allocation}%
              </span>
              <div className="col-span-2 h-1.5 bg-muted/30 overflow-hidden">
                <div
                  className="h-full transition-[width] duration-500"
                  style={{
                    width: `${holding.allocation}%`,
                    backgroundColor: COLORS[idx % COLORS.length],
                  }}
                />
              </div>
            </Fragment>
          ))}
        </div>

        <div className="pt-3 border-t border-border">
          <div className="grid grid-cols-3 gap-4">
            {portfolioData.performance.map((perf) => {
              const isPositive = perf.change >= 0;
              return (
                <div key={perf.period} className="flex flex-col items-center gap-1">
                  <span className="text-muted-foreground font-sans text-[10px] uppercase tracking-wider">
                    {perf.period}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className={`font-mono font-semibold text-xs tabular-nums ${isPositive ? "text-gain glow-gain" : "text-loss glow-loss"}`}>
                      {perf.value.toFixed(1)}%
                    </span>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3 text-gain glow-gain" strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-loss glow-loss" strokeWidth={2} aria-hidden="true" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-20 pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <XAxis hide domain={['dataMin', 'dataMax']} />
              <YAxis hide domain={['auto', 'auto']} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: "var(--primary)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0",
                  color: "var(--foreground)",
                }}
                labelStyle={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
