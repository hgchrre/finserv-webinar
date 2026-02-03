import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sectorPerformance").collect();
  },
});

export const upsert = mutation({
  args: {
    sector: v.string(),
    changePercent: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sectorPerformance")
      .filter((q) => q.eq(q.field("sector"), args.sector))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        changePercent: args.changePercent,
        lastUpdated: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("sectorPerformance", {
      sector: args.sector,
      changePercent: args.changePercent,
      lastUpdated: Date.now(),
    });
  },
});
