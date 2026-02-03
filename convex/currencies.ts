import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("currencies").collect();
  },
});

export const upsert = mutation({
  args: {
    pair: v.string(),
    rate: v.number(),
    change: v.number(),
    changePercent: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("currencies")
      .withIndex("by_pair", (q) => q.eq("pair", args.pair))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        lastUpdated: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("currencies", {
      ...args,
      lastUpdated: Date.now(),
    });
  },
});
