import { DashboardHeader } from "@/components/dashboard/header";
import { MarketTicker } from "@/components/dashboard/market-ticker";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { TransactionTable } from "@/components/dashboard/transaction-table";
import { ComplianceAlerts } from "@/components/dashboard/compliance-alerts";
import { RiskMetrics } from "@/components/dashboard/risk-metrics";
import { MarketChart } from "@/components/dashboard/market-chart";

export default function Home() {
  return (
    <div className="h-screen bg-background text-foreground grid grid-rows-[auto_auto_1fr] overflow-hidden">
      <DashboardHeader />
      <MarketTicker />
      <main className="grid 
        grid-cols-[minmax(300px,1fr)_minmax(320px,1.1fr)_minmax(420px,1.5fr)] 
        grid-rows-[minmax(320px,1fr)_minmax(280px,1fr)] 
        gap-5 
        p-5 
        min-h-0">
        <PortfolioCard className="panel-reveal panel-reveal-delay-1" />
        <TransactionTable className="panel-reveal panel-reveal-delay-2" />
        <MarketChart className="row-span-2 panel-reveal panel-reveal-delay-3" />
        <RiskMetrics className="panel-reveal panel-reveal-delay-4" />
        <ComplianceAlerts className="panel-reveal panel-reveal-delay-5" />
      </main>
    </div>
  );
}
