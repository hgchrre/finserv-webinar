import { DashboardHeader } from "@/components/dashboard/header";
import { MarketTicker } from "@/components/dashboard/market-ticker";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { ComplianceAlerts } from "@/components/dashboard/compliance-alerts";
import { RiskMetrics } from "@/components/dashboard/risk-metrics";
import { MarketChart } from "@/components/dashboard/market-chart";
import { WatchlistTable } from "@/components/dashboard/watchlist-table";
import { MacroIndicators } from "@/components/dashboard/macro-indicators";
import { SectorHeatmap } from "@/components/dashboard/sector-heatmap";
import { NewsFeed } from "@/components/dashboard/news-feed";

export default function Home() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header - Fixed height */}
      <DashboardHeader />
      
      {/* Market Ticker - Fixed height */}
      <MarketTicker />
      
      {/* Main content - Fills remaining space */}
      <div className="flex-1 flex flex-col gap-1 p-1 min-h-0">
        {/* Top row: 3 columns */}
        <div className="flex gap-1 flex-[0_0_42%]">
          <WatchlistTable className="flex-1 min-w-0" />
          <MacroIndicators className="flex-1 min-w-0" />
          <MarketChart className="flex-1 min-w-0" />
        </div>
        
        {/* Middle row: 3 columns */}
        <div className="flex gap-1 flex-[0_0_29%]">
          <SectorHeatmap className="flex-1 min-w-0" />
          <PortfolioCard className="flex-1 min-w-0" />
          <RiskMetrics className="flex-1 min-w-0" />
        </div>
        
        {/* Bottom row: Compliance (full width) */}
        <div className="flex gap-1 flex-[0_0_29%]">
          <ComplianceAlerts className="flex-1 min-w-0" />
        </div>
      </div>
      
      {/* News Ticker - Full width at bottom - Fixed height */}
      <div className="shrink-0">
        <NewsFeed />
      </div>
    </div>
  );
}
