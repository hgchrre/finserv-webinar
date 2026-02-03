"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketStatus, setMarketStatus] = useState<"OPEN" | "CLOSED">("OPEN");
  const [minuteChanged, setMinuteChanged] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      const day = now.getDay();
      // Market hours: 9:30 AM - 4:00 PM ET, Mon-Fri
      if (day >= 1 && day <= 5 && hour >= 9 && hour < 16) {
        setMarketStatus("OPEN");
      } else {
        setMarketStatus("CLOSED");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkMinute = setInterval(() => {
      const now = new Date();
      if (now.getSeconds() === 0) {
        setMinuteChanged(true);
        setTimeout(() => setMinuteChanged(false), 300);
      }
    }, 1000);
    return () => clearInterval(checkMinute);
  }, []);

  const formatTime = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date).toUpperCase();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${hours}:${minutes}`;
  };

  return (
    <header className="border-b border-border bg-card px-6 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold tracking-[0.15em] text-foreground font-sans uppercase">
            CURSOR COMMAND CENTER
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className={`font-mono tabular-nums transition-opacity ${minuteChanged ? 'opacity-60' : ''}`}>
              {formatTime(currentTime)}
            </span>
            <span className={`status-capsule ${
              marketStatus === "OPEN" 
                ? "text-gain border-gain/50" 
                : "text-loss border-loss/50"
            }`}>
              <span
                className={`status-dot ${
                  marketStatus === "OPEN" 
                    ? "bg-gain" 
                    : "bg-loss"
                }`}
              />
              {marketStatus}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search… ⌘K"
              name="search"
              autoComplete="off"
              className="w-52 font-mono text-sm h-9 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              aria-label="Search"
            />
          </div>
          <div className="status-capsule text-muted-foreground border-border/50 px-3 py-1.5">
            RM
          </div>
        </div>
      </div>
    </header>
  );
}
