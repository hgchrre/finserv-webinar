import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear all existing data
    const tables = [
      "marketIndices",
      "portfolio",
      "transactions",
      "complianceAlerts",
      "riskMetrics",
      "marketChartData",
      "securities",
      "commodities",
      "currencies",
      "crypto",
      "news",
      "sectorPerformance",
    ] as const;

    for (const table of tables) {
      const existing = await ctx.db.query(table).collect();
      for (const item of existing) {
        await ctx.db.delete(item._id);
      }
    }

    // Seed market indices
    await ctx.db.insert("marketIndices", {
      name: "S&P 500",
      symbol: "^GSPC",
      value: 6012.45,
      change: 28.73,
      changePercent: 0.48,
    });
    await ctx.db.insert("marketIndices", {
      name: "NASDAQ",
      symbol: "^IXIC",
      value: 19478.32,
      change: -42.18,
      changePercent: -0.22,
    });
    await ctx.db.insert("marketIndices", {
      name: "DOW",
      symbol: "^DJI",
      value: 44421.91,
      change: 156.82,
      changePercent: 0.35,
    });
    await ctx.db.insert("marketIndices", {
      name: "VIX",
      symbol: "^VIX",
      value: 15.23,
      change: -0.92,
      changePercent: -5.70,
    });
    await ctx.db.insert("marketIndices", {
      name: "10Y",
      symbol: "^TNX",
      value: 4.54,
      change: 0.02,
      changePercent: 0.44,
    });

    // Seed securities (watchlist)
    const securities = [
      { symbol: "AAPL", name: "Apple Inc", price: 227.63, change: 2.41, changePercent: 1.07, volume: 52340000, marketCap: 3420000000000 },
      { symbol: "MSFT", name: "Microsoft Corp", price: 415.28, change: -3.12, changePercent: -0.75, volume: 21560000, marketCap: 3090000000000 },
      { symbol: "GOOGL", name: "Alphabet Inc", price: 188.42, change: 1.87, changePercent: 1.00, volume: 18920000, marketCap: 2340000000000 },
      { symbol: "AMZN", name: "Amazon.com Inc", price: 225.94, change: 4.23, changePercent: 1.91, volume: 38450000, marketCap: 2380000000000 },
      { symbol: "NVDA", name: "NVIDIA Corp", price: 878.35, change: -12.45, changePercent: -1.40, volume: 42180000, marketCap: 2160000000000 },
      { symbol: "META", name: "Meta Platforms", price: 612.78, change: 8.92, changePercent: 1.48, volume: 14320000, marketCap: 1560000000000 },
      { symbol: "TSLA", name: "Tesla Inc", price: 394.52, change: -8.34, changePercent: -2.07, volume: 98450000, marketCap: 1260000000000 },
      { symbol: "JPM", name: "JPMorgan Chase", price: 242.18, change: 1.56, changePercent: 0.65, volume: 8920000, marketCap: 698000000000 },
      { symbol: "V", name: "Visa Inc", price: 318.45, change: 2.78, changePercent: 0.88, volume: 6540000, marketCap: 642000000000 },
      { symbol: "UNH", name: "UnitedHealth", price: 528.92, change: -4.21, changePercent: -0.79, volume: 3210000, marketCap: 486000000000 },
      { symbol: "XOM", name: "Exxon Mobil", price: 108.34, change: 0.92, changePercent: 0.86, volume: 14560000, marketCap: 456000000000 },
      { symbol: "JNJ", name: "Johnson & Johnson", price: 152.67, change: -0.45, changePercent: -0.29, volume: 7890000, marketCap: 368000000000 },
    ];

    for (const sec of securities) {
      await ctx.db.insert("securities", { ...sec, lastUpdated: Date.now() });
    }

    // Seed commodities
    const commodities = [
      { symbol: "GC=F", name: "Gold", price: 2935.40, change: 18.20, changePercent: 0.62 },
      { symbol: "CL=F", name: "Crude Oil", price: 72.84, change: -0.92, changePercent: -1.25 },
      { symbol: "SI=F", name: "Silver", price: 32.45, change: 0.38, changePercent: 1.18 },
      { symbol: "NG=F", name: "Natural Gas", price: 3.12, change: 0.08, changePercent: 2.63 },
    ];

    for (const comm of commodities) {
      await ctx.db.insert("commodities", { ...comm, lastUpdated: Date.now() });
    }

    // Seed currencies
    const currencies = [
      { pair: "EUR/USD", rate: 1.0342, change: -0.0018, changePercent: -0.17 },
      { pair: "GBP/USD", rate: 1.2418, change: 0.0032, changePercent: 0.26 },
      { pair: "USD/JPY", rate: 154.82, change: 0.45, changePercent: 0.29 },
      { pair: "USD/CAD", rate: 1.4312, change: -0.0028, changePercent: -0.20 },
    ];

    for (const curr of currencies) {
      await ctx.db.insert("currencies", { ...curr, lastUpdated: Date.now() });
    }

    // Seed crypto
    const crypto = [
      { symbol: "BTC", name: "Bitcoin", price: 102450.00, change: 1820.00, changePercent: 1.81, marketCap: 2020000000000 },
      { symbol: "ETH", name: "Ethereum", price: 3245.80, change: -48.20, changePercent: -1.46, marketCap: 390000000000 },
      { symbol: "SOL", name: "Solana", price: 218.45, change: 12.30, changePercent: 5.97, marketCap: 102000000000 },
    ];

    for (const c of crypto) {
      await ctx.db.insert("crypto", { ...c, lastUpdated: Date.now() });
    }

    // Seed sector performance (11 GICS sectors)
    const sectors = [
      { sector: "Technology", changePercent: 1.24 },
      { sector: "Healthcare", changePercent: -0.38 },
      { sector: "Financials", changePercent: 0.82 },
      { sector: "Consumer Disc", changePercent: 0.56 },
      { sector: "Communication", changePercent: 1.02 },
      { sector: "Industrials", changePercent: 0.34 },
      { sector: "Consumer Staples", changePercent: -0.12 },
      { sector: "Energy", changePercent: -0.78 },
      { sector: "Utilities", changePercent: 0.18 },
      { sector: "Real Estate", changePercent: -0.45 },
      { sector: "Materials", changePercent: 0.28 },
    ];

    for (const sec of sectors) {
      await ctx.db.insert("sectorPerformance", { ...sec, lastUpdated: Date.now() });
    }

    // Seed news
    const newsItems = [
      { title: "Fed signals potential rate cuts in March meeting minutes", source: "Reuters", url: "#", publishedAt: Date.now() - 1800000, relatedSymbols: ["^GSPC", "^TNX"] },
      { title: "NVIDIA beats earnings expectations, guidance strong", source: "Bloomberg", url: "#", publishedAt: Date.now() - 3600000, relatedSymbols: ["NVDA"] },
      { title: "Apple announces new AI features for iPhone 17", source: "CNBC", url: "#", publishedAt: Date.now() - 7200000, relatedSymbols: ["AAPL"] },
      { title: "Oil prices fall on inventory build concerns", source: "WSJ", url: "#", publishedAt: Date.now() - 10800000, relatedSymbols: ["CL=F", "XOM"] },
      { title: "Bitcoin ETF sees record inflows as price nears $105K", source: "CoinDesk", url: "#", publishedAt: Date.now() - 14400000, relatedSymbols: ["BTC"] },
      { title: "Treasury yields rise on strong jobs data", source: "FT", url: "#", publishedAt: Date.now() - 18000000, relatedSymbols: ["^TNX"] },
      { title: "Meta launches new AR glasses, stock jumps 2%", source: "TechCrunch", url: "#", publishedAt: Date.now() - 21600000, relatedSymbols: ["META"] },
      { title: "European markets close higher on ECB comments", source: "Reuters", url: "#", publishedAt: Date.now() - 25200000 },
    ];

    for (const news of newsItems) {
      await ctx.db.insert("news", news);
    }

    // Seed portfolio
    await ctx.db.insert("portfolio", {
      totalAUM: 4200000000,
      holdings: [
        { assetClass: "Equities", value: 2604000000, allocation: 62 },
        { assetClass: "Fixed Income", value: 1176000000, allocation: 28 },
        { assetClass: "Alternatives", value: 420000000, allocation: 10 },
      ],
      performance: [
        { period: "YTD", value: 8.4, change: 0.8 },
        { period: "MTD", value: 2.1, change: 0.3 },
        { period: "QTD", value: 5.2, change: 0.5 },
      ],
    });

    // Seed transactions
    await ctx.db.insert("transactions", {
      client: "ACME Corporation",
      type: "buy",
      amount: 125000,
      status: "completed",
      timestamp: new Date("2026-02-02T10:15:00").getTime(),
      isCrossBorder: false,
    });
    await ctx.db.insert("transactions", {
      client: "Widget Industries",
      type: "sell",
      amount: 45000,
      status: "flagged",
      timestamp: new Date("2026-02-02T09:30:00").getTime(),
      isCrossBorder: true,
    });
    await ctx.db.insert("transactions", {
      client: "Global Finance LLC",
      type: "transfer",
      amount: 250000,
      status: "pending",
      timestamp: new Date("2026-02-02T08:45:00").getTime(),
      isCrossBorder: false,
    });
    await ctx.db.insert("transactions", {
      client: "Tech Ventures Inc",
      type: "buy",
      amount: 87500,
      status: "completed",
      timestamp: new Date("2026-02-01T16:20:00").getTime(),
      isCrossBorder: false,
    });
    await ctx.db.insert("transactions", {
      client: "Emerging Markets Fund",
      type: "sell",
      amount: 150000,
      status: "completed",
      timestamp: new Date("2026-02-01T14:10:00").getTime(),
      isCrossBorder: true,
    });
    await ctx.db.insert("transactions", {
      client: "ACME Corporation",
      type: "buy",
      amount: 12500,
      status: "completed",
      timestamp: new Date("2026-02-01T11:30:00").getTime(),
      isCrossBorder: false,
    });

    // Seed compliance alerts
    await ctx.db.insert("complianceAlerts", {
      client: "ACME Corporation",
      type: "kyc",
      severity: "critical",
      message: "KYC documentation expiring in 7 days",
      dueDate: new Date("2026-02-09").getTime(),
    });
    await ctx.db.insert("complianceAlerts", {
      client: "Widget Industries",
      type: "aml",
      severity: "warning",
      message: "Large cross-border transaction requires review",
    });
    await ctx.db.insert("complianceAlerts", {
      client: "Global Finance LLC",
      type: "regulatory",
      severity: "info",
      message: "All SAR filings completed on time",
    });
    await ctx.db.insert("complianceAlerts", {
      client: "Tech Ventures Inc",
      type: "kyc",
      severity: "warning",
      message: "Beneficial ownership update required",
      dueDate: new Date("2026-02-15").getTime(),
    });

    // Seed risk metrics
    await ctx.db.insert("riskMetrics", {
      sector: "Technology",
      exposure: 78,
      limit: 100,
      var: 12400000,
    });
    await ctx.db.insert("riskMetrics", {
      sector: "Finance",
      exposure: 65,
      limit: 100,
      var: 9800000,
    });
    await ctx.db.insert("riskMetrics", {
      sector: "Healthcare",
      exposure: 45,
      limit: 100,
      var: 7200000,
    });
    await ctx.db.insert("riskMetrics", {
      sector: "Energy",
      exposure: 32,
      limit: 100,
      var: 5100000,
    });
    await ctx.db.insert("riskMetrics", {
      sector: "Consumer",
      exposure: 28,
      limit: 100,
      var: 4200000,
    });

    // Seed market chart data
    const chartData = [
      { date: "2026-01-03", value: 4850.2, volume: 3200000000 },
      { date: "2026-01-04", value: 4865.8, volume: 3100000000 },
      { date: "2026-01-05", value: 4872.1, volume: 3300000000 },
      { date: "2026-01-06", value: 4880.5, volume: 3400000000 },
      { date: "2026-01-07", value: 4875.3, volume: 2900000000 },
      { date: "2026-01-10", value: 4890.7, volume: 3500000000 },
      { date: "2026-01-11", value: 4885.2, volume: 3200000000 },
      { date: "2026-01-12", value: 4895.6, volume: 3600000000 },
      { date: "2026-01-13", value: 4900.1, volume: 3100000000 },
      { date: "2026-01-14", value: 4898.4, volume: 2800000000 },
      { date: "2026-01-17", value: 4905.3, volume: 3300000000 },
      { date: "2026-01-18", value: 4910.8, volume: 3400000000 },
      { date: "2026-01-19", value: 4908.2, volume: 3200000000 },
      { date: "2026-01-20", value: 4915.7, volume: 3500000000 },
      { date: "2026-01-21", value: 4912.4, volume: 2900000000 },
      { date: "2026-01-24", value: 4920.1, volume: 3600000000 },
      { date: "2026-01-25", value: 4918.5, volume: 3100000000 },
      { date: "2026-01-26", value: 4922.3, volume: 3400000000 },
      { date: "2026-01-27", value: 4925.8, volume: 3300000000 },
      { date: "2026-01-28", value: 4923.1, volume: 2800000000 },
      { date: "2026-01-31", value: 4926.4, volume: 3500000000 },
      { date: "2026-02-01", value: 4924.8, volume: 3200000000 },
      { date: "2026-02-02", value: 4927.11, volume: 3400000000 },
    ];

    for (const data of chartData) {
      await ctx.db.insert("marketChartData", data);
    }

    return { success: true };
  },
});
