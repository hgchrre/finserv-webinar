import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const portfolio = await ctx.db.query("portfolio").first();
    return portfolio;
  },
});
