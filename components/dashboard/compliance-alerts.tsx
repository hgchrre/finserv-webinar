"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceAlertsProps {
  className?: string;
}

export function ComplianceAlerts({ className }: ComplianceAlertsProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-loss" strokeWidth={2} aria-hidden="true" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" strokeWidth={2} aria-hidden="true" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" strokeWidth={2} aria-hidden="true" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="destructive" className="font-mono text-xs">
            Critical
          </Badge>
        );
      case "warning":
        return (
          <Badge
            variant="secondary"
            className="font-mono text-xs bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
          >
            Warning
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="font-mono text-xs bg-blue-500/20 text-blue-500 border-blue-500/30"
          >
            Info
          </Badge>
        );
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(timestamp));
  };

  const complianceAlerts = useQuery(api.complianceAlerts.list) ?? [];
  const topAlerts = complianceAlerts.slice(0, 2);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-loss border-loss/50 bg-loss/5";
      case "warning":
        return "text-yellow-500 border-yellow-500/50 bg-yellow-500/5";
      default:
        return "text-blue-500 border-blue-500/50 bg-blue-500/5";
    }
  };

  return (
    <Card className={cn("h-full flex flex-col min-h-0 panel-border rounded-none", className)}>
      <CardHeader>
        <CardTitle className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground">
          COMPLIANCE
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-3 min-h-0">
        {topAlerts.map((alert) => (
          <div
            key={alert._id}
            className={`alert-border border p-3 space-y-1.5 hover:bg-muted/30 transition-colors ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-sm font-semibold truncate tabular-nums">
                    {alert.client}
                  </span>
                  {getSeverityBadge(alert.severity)}
                </div>
                <div className="text-xs text-muted-foreground font-sans mb-1.5 uppercase tracking-wider">
                  {alert.type}
                </div>
                <div className="text-xs text-foreground line-clamp-2 leading-relaxed">
                  {alert.message}
                </div>
                {alert.dueDate && (
                  <div className="text-xs text-muted-foreground mt-2 font-mono tabular-nums">
                    Due: {formatDate(alert.dueDate)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
