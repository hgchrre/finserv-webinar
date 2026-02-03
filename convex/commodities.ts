import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("commodities").collect();
  },
});

export const upsert = mutation({
  args: {
    symbol: v.string(),
    name: v.string(),
    price: v.number(),
    change: v.number(),
    changePercent: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("commodities")
      .withIndex("by_symbol", (q) => q.eq("symbol", args.symbol))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        lastUpdated: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("commodities", {
      ...args,
      lastUpdated: Date.now(),
    });
  },
});
