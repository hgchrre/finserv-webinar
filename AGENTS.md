# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a Next.js 16 + Convex financial dashboard (Bloomberg terminal-inspired). See `README.md` for standard commands (`pnpm dev`, `pnpm lint`, `pnpm build`).

### Services

| Service | Command | Notes |
|---------|---------|-------|
| Next.js dev server | `pnpm dev:next` | Runs on port 3000 |
| Convex dev server | `pnpm dev:convex` | Requires network access to `api.convex.dev` |
| Both together | `pnpm dev` | Uses `concurrently` |

### Network-dependent features

- **Convex CLI** (`convex dev`, `convex codegen`, `convex run`) requires outbound access to `api.convex.dev` and `*.convex.cloud`. If blocked, you must generate `convex/_generated/` files manually (see below).
- **Google Fonts** (Geist, Cousine) are fetched at build/dev time from `fonts.gstatic.com`. If blocked, use `--webpack` mode (`npx next dev --webpack`) which gracefully falls back to system fonts. Turbopack mode hard-fails on missing fonts.
- **Yahoo Finance API** is optional; the app uses seeded/mock data without it.

### Convex type generation without network

If `npx convex codegen` fails due to network restrictions, generate `convex/_generated/` manually. The three required files are:
- `convex/_generated/dataModel.ts` — dynamic data model importing from `../schema.js`
- `convex/_generated/server.ts` — re-exports of `convex/server` generics typed to the data model
- `convex/_generated/api.ts` — typed API proxy listing all modules in `convex/`

Templates for these files can be found in `node_modules/convex/src/cli/codegen_templates/`.

### Environment variables

The Convex secrets (`CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`) must be present. In Cloud Agent VMs they are injected from Cursor Secrets. For local development, `pnpm setup` generates `.env.local` automatically. If secrets are injected as env vars but `.env.local` doesn't exist, create it:

```
NEXT_PUBLIC_CONVEX_URL=$NEXT_PUBLIC_CONVEX_URL
CONVEX_DEPLOYMENT=$CONVEX_DEPLOYMENT
```

### Lint / Test / Build

- **Lint**: `pnpm lint` (ESLint 9). Pre-existing warnings/errors exist in the codebase.
- **Tests**: No test framework is configured. The workspace rules reference vitest but it is not installed.
- **Build**: `pnpm build` requires network for Google Fonts. In restricted environments, use dev mode instead.
- **Dev**: `pnpm dev:next` or `npx next dev --webpack` for font-fallback-safe mode.
