import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    const news = await ctx.db.query("news").order("desc").take(limit);
    return news;
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    source: v.string(),
    url: v.string(),
    publishedAt: v.number(),
    relatedSymbols: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("news", args);
  },
});

export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const allNews = await ctx.db.query("news").collect();
    for (const item of allNews) {
      await ctx.db.delete(item._id);
    }
  },
});
