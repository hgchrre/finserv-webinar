This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and integrated with [Convex](https://convex.dev) for real-time data.

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Convex (First Time Only)

Run the setup script to initialize and seed your Convex database:

```bash
pnpm setup
```

This will:
- Initialize your Convex project (prompts for GitHub login if needed)
- Generate `.env.local` with your `NEXT_PUBLIC_CONVEX_URL`
- Seed the database with initial dashboard data

### 3. Start Development Servers

Start both Convex and Next.js servers together:

```bash
pnpm dev
```

This runs both servers concurrently. Open [http://localhost:3000](http://localhost:3000) to see the dashboard with real-time data.

### Alternative: Run Servers Separately

If you prefer to run them in separate terminals:

```bash
# Terminal 1 - Convex dev server
pnpm dev:convex

# Terminal 2 - Next.js dev server
pnpm dev:next
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both Convex and Next.js servers concurrently |
| `pnpm dev:convex` | Start only the Convex dev server |
| `pnpm dev:next` | Start only the Next.js dev server |
| `pnpm setup` | Initialize Convex and seed database (first time setup) |
| `pnpm convex:init` | Initialize Convex project (generates types and config) |
| `pnpm convex:seed` | Seed database with initial data |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |

## Convex Backend

The Convex backend is located in the `convex/` directory:
- `schema.ts` - Database schema definitions
- `marketIndices.ts`, `portfolio.ts`, `transactions.ts`, etc. - Query functions
- `seed.ts` - Seed mutation to populate initial data

All dashboard components use Convex's `useQuery` hook for real-time data updates.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
