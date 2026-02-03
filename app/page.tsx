import { DashboardHeader } from "@/components/dashboard/header";
import { MarketTicker } from "@/components/dashboard/market-ticker";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { TransactionTable } from "@/components/dashboard/transaction-table";
import { ComplianceAlerts } from "@/components/dashboard/compliance-alerts";
import { RiskMetrics } from "@/components/dashboard/risk-metrics";
import { MarketChart } from "@/components/dashboard/market-chart";
import { WatchlistTable } from "@/components/dashboard/watchlist-table";
import { MacroIndicators } from "@/components/dashboard/macro-indicators";
import { SectorHeatmap } from "@/components/dashboard/sector-heatmap";
import { NewsFeed } from "@/components/dashboard/news-feed";

export default function Home() {
  return (
    <div className="h-screen bg-background text-foreground grid grid-rows-[auto_auto_1fr_auto_auto] gap-0.5 overflow-hidden p-1">
      <DashboardHeader />
      <MarketTicker />
      
      {/* Main dashboard grid - Bloomberg-style dense layout */}
      <main className="grid grid-cols-4 grid-rows-2 gap-1 min-h-0">
        {/* Left column: Watchlist spans both rows */}
        <WatchlistTable className="row-span-2 panel-reveal panel-reveal-delay-1" />
        
        {/* Middle columns: Stacked panels */}
        <MacroIndicators className="panel-reveal panel-reveal-delay-2" />
        <SectorHeatmap className="panel-reveal panel-reveal-delay-3" />
        
        {/* Right column: Main chart spans both rows */}
        <MarketChart className="row-span-2 panel-reveal panel-reveal-delay-4" />
        
        {/* Second row middle panels */}
        <PortfolioCard className="panel-reveal panel-reveal-delay-5" />
        <div className="grid grid-rows-2 gap-1">
          <RiskMetrics className="panel-reveal panel-reveal-delay-6" />
          <ComplianceAlerts className="panel-reveal panel-reveal-delay-7" />
        </div>
      </main>
      
      {/* News ticker */}
      <NewsFeed className="panel-reveal panel-reveal-delay-8" />
      
      {/* Transactions table */}
      <TransactionTable className="panel-reveal panel-reveal-delay-9 max-h-48" />
    </div>
  );
}
