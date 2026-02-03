import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existingIndices = await ctx.db.query("marketIndices").collect();
    for (const index of existingIndices) {
      await ctx.db.delete(index._id);
    }

    const existingPortfolio = await ctx.db.query("portfolio").collect();
    for (const p of existingPortfolio) {
      await ctx.db.delete(p._id);
    }

    const existingTransactions = await ctx.db.query("transactions").collect();
    for (const txn of existingTransactions) {
      await ctx.db.delete(txn._id);
    }

    const existingAlerts = await ctx.db.query("complianceAlerts").collect();
    for (const alert of existingAlerts) {
      await ctx.db.delete(alert._id);
    }

    const existingRisk = await ctx.db.query("riskMetrics").collect();
    for (const risk of existingRisk) {
      await ctx.db.delete(risk._id);
    }

    const existingChart = await ctx.db.query("marketChartData").collect();
    for (const chart of existingChart) {
      await ctx.db.delete(chart._id);
    }

    // Seed market indices
    await ctx.db.insert("marketIndices", {
      name: "S&P 500",
      value: 4927.11,
      change: 40.2,
      changePercent: 0.82,
    });
    await ctx.db.insert("marketIndices", {
      name: "NASDAQ",
      value: 15628.04,
      change: -18.7,
      changePercent: -0.12,
    });
    await ctx.db.insert("marketIndices", {
      name: "DOW",
      value: 38450.23,
      change: 125.4,
      changePercent: 0.33,
    });
    await ctx.db.insert("marketIndices", {
      name: "VIX",
      value: 13.45,
      change: -0.8,
      changePercent: -5.62,
    });
    await ctx.db.insert("marketIndices", {
      name: "10Y Treasury",
      value: 4.12,
      change: 0.03,
      changePercent: 0.73,
    });

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
