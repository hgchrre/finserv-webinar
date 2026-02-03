import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  marketIndices: defineTable({
    name: v.string(),
    value: v.number(),
    change: v.number(),
    changePercent: v.number(),
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
  transactions: defineTable({
    client: v.string(),
    type: v.union(v.literal("buy"), v.literal("sell"), v.literal("transfer")),
    amount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("flagged")
    ),
    timestamp: v.number(), // Unix timestamp
    isCrossBorder: v.boolean(),
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
