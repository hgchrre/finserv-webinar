"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Note: yahoo-finance2 is used to fetch real market data
// For production, you'd want to set up proper error handling and rate limiting

export const fetchQuotes = action({
  args: {
    symbols: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const yahooFinance = await import("yahoo-finance2").then((m) => m.default);
    
    const results = [];
    for (const symbol of args.symbols) {
      try {
        const quote = await yahooFinance.quote(symbol);
        results.push({
          symbol: quote.symbol,
          name: quote.shortName || quote.longName || symbol,
          price: quote.regularMarketPrice || 0,
          change: quote.regularMarketChange || 0,
          changePercent: quote.regularMarketChangePercent || 0,
          volume: quote.regularMarketVolume || 0,
          marketCap: quote.marketCap,
        });
      } catch (error) {
        console.error(`Failed to fetch ${symbol}:`, error);
      }
    }
    return results;
  },
});

export const refreshSecurities = action({
  args: {},
  handler: async (ctx) => {
    const symbols = [
      "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META",
      "TSLA", "JPM", "V", "UNH", "XOM", "JNJ"
    ];

    const quotes = await ctx.runAction(api.yahooFinance.fetchQuotes, { symbols });
    
    for (const quote of quotes) {
      await ctx.runMutation(api.securities.upsert, {
        symbol: quote.symbol,
        name: quote.name,
        price: quote.price,
        change: quote.change,
        changePercent: quote.changePercent,
        volume: quote.volume,
        marketCap: quote.marketCap,
      });
    }

    return { updated: quotes.length };
  },
});

export const refreshIndices = action({
  args: {},
  handler: async (ctx) => {
    const yahooFinance = await import("yahoo-finance2").then((m) => m.default);
    
    const indices = [
      { symbol: "^GSPC", name: "S&P 500" },
      { symbol: "^IXIC", name: "NASDAQ" },
      { symbol: "^DJI", name: "DOW" },
      { symbol: "^VIX", name: "VIX" },
      { symbol: "^TNX", name: "10Y" },
    ];

    for (const idx of indices) {
      try {
        const quote = await yahooFinance.quote(idx.symbol);
        await ctx.runMutation(api.marketIndices.upsert, {
          name: idx.name,
          symbol: idx.symbol,
          value: quote.regularMarketPrice || 0,
          change: quote.regularMarketChange || 0,
          changePercent: quote.regularMarketChangePercent || 0,
        });
      } catch (error) {
        console.error(`Failed to fetch index ${idx.symbol}:`, error);
      }
    }
  },
});

export const refreshCommodities = action({
  args: {},
  handler: async (ctx) => {
    const yahooFinance = await import("yahoo-finance2").then((m) => m.default);
    
    const commodities = [
      { symbol: "GC=F", name: "Gold" },
      { symbol: "CL=F", name: "Crude Oil" },
      { symbol: "SI=F", name: "Silver" },
      { symbol: "NG=F", name: "Natural Gas" },
    ];

    for (const comm of commodities) {
      try {
        const quote = await yahooFinance.quote(comm.symbol);
        await ctx.runMutation(api.commodities.upsert, {
          symbol: comm.symbol,
          name: comm.name,
          price: quote.regularMarketPrice || 0,
          change: quote.regularMarketChange || 0,
          changePercent: quote.regularMarketChangePercent || 0,
        });
      } catch (error) {
        console.error(`Failed to fetch commodity ${comm.symbol}:`, error);
      }
    }
  },
});

export const refreshCrypto = action({
  args: {},
  handler: async (ctx) => {
    const yahooFinance = await import("yahoo-finance2").then((m) => m.default);
    
    const cryptos = [
      { symbol: "BTC-USD", name: "Bitcoin" },
      { symbol: "ETH-USD", name: "Ethereum" },
      { symbol: "SOL-USD", name: "Solana" },
    ];

    for (const c of cryptos) {
      try {
        const quote = await yahooFinance.quote(c.symbol);
        await ctx.runMutation(api.crypto.upsert, {
          symbol: c.symbol.replace("-USD", ""),
          name: c.name,
          price: quote.regularMarketPrice || 0,
          change: quote.regularMarketChange || 0,
          changePercent: quote.regularMarketChangePercent || 0,
          marketCap: quote.marketCap || 0,
        });
      } catch (error) {
        console.error(`Failed to fetch crypto ${c.symbol}:`, error);
      }
    }
  },
});
