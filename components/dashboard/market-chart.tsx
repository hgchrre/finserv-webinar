"use client";

import { useState } from "react";
import { marketChartData } from "@/app/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import { cn } from "@/lib/utils";

type TimeRange = "1D" | "1W" | "1M" | "3M" | "YTD" | "1Y";

interface MarketChartProps {
  className?: string;
}

export function MarketChart({ className }: MarketChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");

  const getFilteredData = () => {
    const now = new Date();
    let daysBack = 30;

    switch (timeRange) {
      case "1D":
        daysBack = 1;
        break;
      case "1W":
        daysBack = 7;
        break;
      case "1M":
        daysBack = 30;
        break;
      case "3M":
        daysBack = 90;
        break;
      case "YTD":
        daysBack = Math.floor(
          (now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        break;
      case "1Y":
        daysBack = 365;
        break;
    }

    return marketChartData.slice(-daysBack);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const data = getFilteredData();
  const latestValue = data[data.length - 1]?.value ?? 0;
  const previousValue = data[data.length - 2]?.value ?? latestValue;
  const change = latestValue - previousValue;
  const changePercent = previousValue !== 0 ? ((change / previousValue) * 100) : 0;
  const isPositive = change >= 0;
  const minValue = Math.min(...data.map(d => d.value));
  const maxValue = Math.max(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <Card className={cn("h-full flex flex-col min-h-0 panel-border rounded-none", className)}>
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground">
            MARKET PERFORMANCE
          </CardTitle>
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
            <TabsList className="h-7 gap-1 bg-muted/30">
              <TabsTrigger value="1D" className="text-xs font-mono px-2 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors">
                1D
              </TabsTrigger>
              <TabsTrigger value="1W" className="text-xs font-mono px-2 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors">
                1W
              </TabsTrigger>
              <TabsTrigger value="1M" className="text-xs font-mono px-2 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors">
                1M
              </TabsTrigger>
              <TabsTrigger value="3M" className="text-xs font-mono px-2 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors">
                3M
              </TabsTrigger>
              <TabsTrigger value="YTD" className="text-xs font-mono px-2 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors">
                YTD
              </TabsTrigger>
              <TabsTrigger value="1Y" className="text-xs font-mono px-2 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors">
                1Y
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-bold font-mono tabular-nums">
              {latestValue.toFixed(2)}
            </span>
            <span className={`flex items-center gap-1 text-xs font-mono tabular-nums ${isPositive ? "text-gain glow-gain" : "text-loss glow-loss"}`}>
              {isPositive ? "+" : ""}{change.toFixed(2)} ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="text-xs text-muted-foreground font-sans uppercase tracking-wider tabular-nums">
            Range: {minValue.toFixed(2)} - {maxValue.toFixed(2)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid
                strokeDasharray="2 2"
                stroke="var(--border)"
                opacity={0.1}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="var(--muted-foreground)"
                style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }}
                height={24}
                tick={{ fill: "var(--muted-foreground)" }}
              />
              <YAxis
                yAxisId="left"
                stroke="var(--muted-foreground)"
                style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }}
                width={50}
                domain={["auto", "auto"]}
                tick={{ fill: "var(--muted-foreground)" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="var(--muted-foreground)"
                style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}
                width={35}
                hide
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0",
                  color: "var(--foreground)",
                }}
                labelStyle={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
                formatter={(value: number | undefined) => [
                  value?.toFixed(2) ?? "0.00",
                  "S&P 500",
                ]}
              />
              <Bar
                yAxisId="right"
                dataKey="volume"
                fill="var(--muted-foreground)"
                opacity={0.1}
                radius={[0, 0, 0, 0]}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "var(--primary)" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
