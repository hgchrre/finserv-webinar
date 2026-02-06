"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

interface NewsFeedProps {
  className?: string;
}

export function NewsFeed({ className }: NewsFeedProps) {
  const news = useQuery(api.news.list, { limit: 10 });

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className={cn("border border-border bg-card flex flex-col", className)}>
      <div className="panel-header flex items-center justify-between">
        <span>NEWS</span>
        <span className="opacity-60">LATEST</span>
      </div>
      
      <div className="overflow-hidden">
        {news && news.length > 0 ? (
          <div className="flex items-center gap-5 px-3 py-2.5 animate-scroll whitespace-nowrap">
            {news.map((item, idx) => (
              <div key={item._id} className="flex items-center gap-3 text-xs">
                {idx > 0 && (
                  <span className="text-border text-muted-foreground/20 font-mono">│</span>
                )}
                <span className="text-primary font-medium uppercase">
                  {item.source}
                </span>
                <span className="text-foreground/90">
                  {item.title}
                </span>
                <span className="text-muted-foreground font-mono">
                  {formatTime(item.publishedAt)}
                </span>
                {item.relatedSymbols && item.relatedSymbols.length > 0 && (
                  <span className="text-primary/60 font-mono text-xs">
                    [{item.relatedSymbols.slice(0, 2).join(", ")}]
                  </span>
                )}
              </div>
            ))}
            {/* Duplicate for seamless scroll */}
            {news.map((item, idx) => (
              <div key={`dup-${item._id}`} className="flex items-center gap-3 text-xs">
                <span className="text-border text-muted-foreground/20 font-mono">│</span>
                <span className="text-primary font-medium uppercase">
                  {item.source}
                </span>
                <span className="text-foreground/90">
                  {item.title}
                </span>
                <span className="text-muted-foreground font-mono">
                  {formatTime(item.publishedAt)}
                </span>
                {item.relatedSymbols && item.relatedSymbols.length > 0 && (
                  <span className="text-primary/60 font-mono text-xs">
                    [{item.relatedSymbols.slice(0, 2).join(", ")}]
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-3 py-2.5 text-center text-muted-foreground text-xs">
            {news === undefined ? "Loading..." : "No news available"}
          </div>
        )}
      </div>
    </div>
  );
}
