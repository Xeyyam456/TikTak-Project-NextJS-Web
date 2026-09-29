# TIK TAK — Next.js Web

Onlayn ərzaq mağazası (müştəri tərəfi). Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, TanStack Query.

## İşə salmaq

`.env.local` faylı yaradın (commit olunmur):

```
NEXT_PUBLIC_API_BASE_URL=https://api.sarkhanrahimli.dev/api/tiktak
SERVICE_ACCOUNT_PHONE=...
SERVICE_ACCOUNT_PASSWORD=...
```

`SERVICE_ACCOUNT_*` yalnız server tərəfdə istifadə olunur (kataloqun SSR-i üçün, bax `AGENTS.md` → "SSR & the service account").

```bash
npm install
npm run dev      # next dev --turbopack
npm run build
npm run start
npm run lint
```

## Sənədlər

- `AGENTS.md` — qovluq strukturu və layihə qaydaları (Claude Code / AI köməkçilər üçün əsas mənbə)
- `KOD-IZAHI.md` — kodun tam izahı (0-dan 100-ə)
- `PAKET-ISTIFADESI.md` — istifadə olunan paketlər və niyə
- `web.md` — backend API sənədi (real cavablarla fərqlər `AGENTS.md`-də qeyd olunub)
