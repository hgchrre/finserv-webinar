import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  marketIndices: defineTable({
    name: v.string(),
    symbol: v.optional(v.string()),
    value: v.number(),
    change: v.number(),
    changePercent: v.number(),
  }),
  
  // Individual securities (stocks/ETFs)
  securities: defineTable({
    symbol: v.string(),
    name: v.string(),
    price: v.number(),
    change: v.number(),
    changePercent: v.number(),
    volume: v.number(),
    marketCap: v.optional(v.number()),
    lastUpdated: v.number(),
  }).index("by_symbol", ["symbol"]),
  
  // Commodities (Gold, Oil, etc.)
  commodities: defineTable({
    symbol: v.string(),
    name: v.string(),
    price: v.number(),
    change: v.number(),
    changePercent: v.number(),
    lastUpdated: v.number(),
  }).index("by_symbol", ["symbol"]),
  
  // Currency pairs
  currencies: defineTable({
    pair: v.string(),
    rate: v.number(),
    change: v.number(),
    changePercent: v.number(),
    lastUpdated: v.number(),
  }).index("by_pair", ["pair"]),
  
  // Crypto
  crypto: defineTable({
    symbol: v.string(),
    name: v.string(),
    price: v.number(),
    change: v.number(),
    changePercent: v.number(),
    marketCap: v.number(),
    lastUpdated: v.number(),
  }).index("by_symbol", ["symbol"]),
  
  // News headlines
  news: defineTable({
    title: v.string(),
    source: v.string(),
    url: v.string(),
    publishedAt: v.number(),
    relatedSymbols: v.optional(v.array(v.string())),
  }),
  
  // Sector performance (11 GICS sectors)
  sectorPerformance: defineTable({
    sector: v.string(),
    changePercent: v.number(),
    lastUpdated: v.number(),
  }),
  portfolio: defineTable({
    totalAUM: v.number(),
    holdings: v.array(
      v.object({
        assetClass: v.string(),
        value: v.number(),
        allocation: v.number(),
      })
    ),
    performance: v.array(
      v.object({
        period: v.string(),
        value: v.number(),
        change: v.number(),
      })
    ),
  }),
  clients: defineTable({
    name: v.string(),
    tin: v.string(),              // Tax ID Number (will be masked in UI)
    entityType: v.union(
      v.literal("corporation"), 
      v.literal("llc"), 
      v.literal("individual")
    ),
    address: v.object({
      street: v.string(),
      city: v.string(),
      state: v.optional(v.string()),
      country: v.string(),
    }),
    riskRating: v.union(
      v.literal("low"), 
      v.literal("medium"), 
      v.literal("high")
    ),
    relationshipManager: v.string(),
    onboardedAt: v.number(),       // Unix timestamp
  }).index("by_name", ["name"]),
  transactions: defineTable({
    clientId: v.optional(v.id("clients")),     // Link to clients table
    client: v.string(),             // Keep for backwards compat
    type: v.union(v.literal("buy"), v.literal("sell"), v.literal("transfer")),
    amount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("flagged")
    ),
    timestamp: v.number(), // Unix timestamp
    isCrossBorder: v.boolean(),
    destinationCountry: v.optional(v.string()), // For cross-border txns
    accountNumber: v.optional(v.string()),      // Will be masked in UI
  }),
  sarDrafts: defineTable({
    transactionId: v.id("transactions"),
    clientId: v.id("clients"),
    narrative: v.string(),         // AI-generated narrative
    status: v.union(
      v.literal("draft"), 
      v.literal("pending_review"), 
      v.literal("submitted")
    ),
    generatedBy: v.string(),       // User who generated it
    generatedAt: v.number(),       // Unix timestamp
    reviewedBy: v.optional(v.string()),
    reviewedAt: v.optional(v.number()),
    filingType: v.string(),        // "Initial Report", "Continuing Activity", etc.
    riskFactors: v.array(v.string()),
  }),
  auditLog: defineTable({
    action: v.string(),            // "viewed_client", "generated_sar", "exported_data"
    userId: v.string(),
    targetType: v.string(),        // "client", "transaction", "sar"
    targetId: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.any()), // Additional context
  }),
  complianceAlerts: defineTable({
    client: v.string(),
    type: v.union(
      v.literal("kyc"),
      v.literal("aml"),
      v.literal("regulatory")
    ),
    severity: v.union(
      v.literal("critical"),
      v.literal("warning"),
      v.literal("info")
    ),
    message: v.string(),
    dueDate: v.optional(v.number()), // Unix timestamp
  }),
  riskMetrics: defineTable({
    sector: v.string(),
    exposure: v.number(),
    limit: v.number(),
    var: v.number(),
  }),
  marketChartData: defineTable({
    date: v.string(), // ISO date string
    value: v.number(),
    volume: v.number(),
  }),
});
