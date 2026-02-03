"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { riskMetrics } from "@/app/data/mock-data";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface RiskMetricsProps {
  className?: string;
}

export function RiskMetrics({ className }: RiskMetricsProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const pieData = riskMetrics.map((metric) => ({
    name: metric.sector,
    value: metric.exposure,
  }));

  // Sort by exposure and take top 2
  const topSectors = [...riskMetrics]
    .sort((a, b) => b.exposure - a.exposure)
    .slice(0, 2);

  // Calculate aggregate VaR (sum of all sectors)
  const aggregateVaR = riskMetrics.reduce((sum, m) => sum + m.var, 0);

  return (
    <Card className={cn("h-full flex flex-col min-h-0 panel-border rounded-none", className)}>
      <CardHeader>
        <CardTitle className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground">
          RISK METRICS
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4 min-h-0">
        <div className="h-24 flex-shrink-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                outerRadius={44}
                innerRadius={36}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0",
                }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name,
                ]}
                labelStyle={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 flex-1 min-h-0">
          {topSectors.map((metric) => {
            const percentage = (metric.exposure / metric.limit) * 100;
            const isNearLimit = percentage > 80;
            return (
              <div key={metric.sector} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-sans uppercase tracking-wider text-xs">
                    {metric.sector}
                  </span>
                  <span
                    className={`font-mono font-semibold text-sm tabular-nums ${
                      isNearLimit ? "text-yellow-500" : ""
                    }`}
                  >
                    {metric.exposure}%/{metric.limit}%
                  </span>
                </div>
                <div className="h-1.5 bg-muted/30 overflow-hidden">
                  <div
                    className={`h-full transition-[width] duration-500 ${
                      isNearLimit ? "bg-yellow-500" : "bg-primary"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground">
              VaR (95%)
            </span>
            <Badge variant="outline" className="font-mono text-sm tabular-nums border-primary/30 px-3 py-1">
              {formatCurrency(aggregateVaR)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
