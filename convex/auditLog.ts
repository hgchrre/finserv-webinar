import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const log = mutation({
  args: {
    action: v.string(),
    userId: v.string(),
    targetType: v.string(),
    targetId: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("auditLog", {
      ...args,
      timestamp: Date.now(),
    });
  },
});
