import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("marketIndices").collect();
  },
});

export const upsert = mutation({
  args: {
    name: v.string(),
    symbol: v.optional(v.string()),
    value: v.number(),
    change: v.number(),
    changePercent: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("marketIndices")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }

    return await ctx.db.insert("marketIndices", args);
  },
});
