<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# TIK TAK — project structure & conventions

## Folder layout
- `src/app` — routing only. Each `page.tsx` is a thin wrapper: imports a view from `@/views`, adds `metadata`/`generateMetadata`, and wraps with `RequireAuth`/`RedirectIfAuth` if needed. No business logic here.
- `src/views` — the real per-route UI + data fetching (client components, `useEffect`/`useState` fetch pattern). One file per route, barrel-exported via `src/views/index.ts`.
- `src/shared/components` — reusable UI (`ui/`, `layout/`, `landing/`, `auth/`, plus top-level like `ProductCard.tsx`). Barrel: `src/shared/components/index.ts`.
- `src/shared/hooks` — reusable hooks (e.g. `useCardCarousel`).
- `src/services` — one file per API domain (`product.service.ts`, `order.service.ts`, etc.), all going through `src/services/httpClient.ts` (axios wrapper with token refresh interceptor). `src/services/Auth/auth.service.ts` is the one exception living in a subfolder.
- `src/types` — **the only place `interface`/`type`/enum-const declarations may live.** Organized by domain folder (`user/`, `product/`, `campaign/`, `order/`, `basket/`, `category/`, `auth/`, `upload/`, `shared/`, `common/`). One declaration per file, filename === export name (e.g. `types/product/Product.ts`, `types/product/ProductCardProps.ts`). Each domain folder has its own `index.ts` barrel; component `*Props` types live here too (not inline in the component file). Cross-domain imports go through the sibling domain's barrel (`from '../category'`); same-domain imports are direct (`from './OrderStatus'`). Top-level `src/types/index.ts` re-exports everything.

## Backend / API
- Real backend: `https://api.sarkhanrahimli.dev/api/tiktak` (documented in `web.md` at repo root — client/web scope only; there's a separate admin API not covered here).
- Base URL comes from `NEXT_PUBLIC_API_BASE_URL` in `.env.local` (not committed — recreate it if missing: `NEXT_PUBLIC_API_BASE_URL=https://api.sarkhanrahimli.dev/api/tiktak`). Without it, every request silently fails and pages render empty.
- Auth is bearer-token based, tokens stored in `localStorage` (`access_token`/`refresh_token`, managed in `httpClient.ts`). `RequireAuth`/`RedirectIfAuth` (in `src/shared/components/auth/`) check `localStorage` client-side only — they don't validate the token server-side.
- **Most endpoints require auth** (`/products`, `/products/:id`, `/categories`, `/basket`, `/orders/*`, `/profile`) — confirmed via direct testing, not just docs. Only `/campaigns` is public. Any route that calls one of the auth-required endpoints must be wrapped in `RequireAuth` (see `src/app/products/page.tsx`, `categories/page.tsx`, `basket/page.tsx`, etc.) or it'll silently show empty data instead of a real error.
- `next.config.ts` `images.remotePatterns` must list every real image host the API returns (currently `picsum.photos`, `uploads.sarkhanrahimli.dev`, `www.tiktak.az`) or `next/image` throws at render time and the whole subtree fails silently.
- There is a reference admin panel at `https://github.com/Xeyyam456/TikTak-Project-Admin-Panel` (Vite/React) — same backend, useful to cross-check endpoint paths/response shapes and its `src/types` folder structure (which this project's `src/types` convention was modeled after, minus its `*Api`-vs-UI-model split since this app renders the API shape directly).

## Layout / chrome rules
- `SiteChrome.tsx` controls Header/Footer per route: `/login` and `/register` render with **no chrome** at all; **Footer only renders on `/` (landing)** — every other route gets Header but no Footer.
- Header shows a centered search input + address placeholder (no request wired yet) on every route except `/`; on `/` it's just the logo + nav.
- Brand color is `--primary: #114F2E` (green), defined in `globals.css` and used via `text-primary`/`bg-primary`/`border-primary` Tailwind classes — don't hardcode the hex elsewhere, use the token.
- Global scrollbar is hidden everywhere (`globals.css`) but scrolling still works; this was intentional, not a bug.

## Known intentional gaps (don't "fix" without asking)
- "Bizim göstəricilər" stats on the homepage (`StatsSection.tsx`) are hardcoded — there's no stats endpoint in `web.md` yet (`stats.service.ts` is an empty TODO placeholder).
- `/account`, `/favorites`, `/categories` pages are intentionally empty placeholders (heading only) — interior design/data-fetching hasn't been requested yet.
- `ProductCard` renders a blank placeholder square instead of the real product image — not yet wired to `next/image`.
