# Tik Tak (Next.js) — Kodun Tam İzahı (0-dan 100-ə)

Bu sənəd, layihədəki **hər qatı və demək olar hər faylı** kodu ilə birgə izah edir. Heç bir proqramlaşdırma təcrübəsi olmayan biri (kursa yeni başlayan səviyyəsi) belə, bu sənədi oxuyub layihənin necə işlədiyini başa düşə bilməlidir.

**Bu layihə TypeScript-dədir** (adi JavaScript deyil) — hər faylın sonu `.js`/`.jsx` yox, `.ts`/`.tsx`-dir. TypeScript nədir, niyə var, necə oxunur — bunlar aşağıda, ayrıca bir bölmədə, addım-addım izah olunub.

**Bu layihə həm də "adi" Next.js DEYİL.** Layihənin kökündəki `AGENTS.md` faylında açıq yazılıb: bu versiyada breaking-change-lər var, API-lər/konvensiyalar sizin öyrəşdiyinizdən fərqli ola bilər (məsələn, aşağıda görəcəyiniz kimi, dinamik route-ların `params`-ı bir `Promise`-dir, `error.tsx`-in retry funksiyası `reset` yox `unstable_retry` adlanır). Bu sənəd məhz BU layihənin faktiki qurulduğu şəkli izah edir.

**Necə oxumaq lazımdır:** Əvvəlcə Hissə 1-4-ü oxuyun (JavaScript/React, TypeScript və Next.js-ə xas anlayışlar). Sonra istənilən sırayla, istədiyiniz faylın izahına keçə bilərsiniz.

---

## Mündəricat

1. [Bu layihə nədir və nə üçün belə qurulub](#hissə-1-bu-layihə-nədir)
2. [JavaScript/React sintaksis lüğəti](#hissə-2-sintaksis-lüğəti)
3. [TypeScript sintaksis lüğəti](#hissə-3-typescript-lüğəti)
4. [Next.js-ə xas anlayışlar](#hissə-4-nextjs-anlayışları)
5. [Qovluq strukturu](#hissə-5-qovluq-strukturu)
6. [`src/types/` qovluğu — bütün tip faylları](#hissə-6-types-qovluğu)
7. [Giriş nöqtəsi: `src/app/layout.tsx` və `globals.css`](#hissə-7-giriş-nöqtəsi)
8. [Routing: `src/app/` faylları tək-tək](#hissə-8-routing)
9. [Auth qatı: `httpClient.ts`, `auth.service.ts`, tokenlər](#hissə-9-auth)
10. [SSR və "servis hesabı": `serviceAccount.ts`](#hissə-10-ssr-və-servis-hesabı)
11. [API qatı: `src/services/` bütün fayllar](#hissə-11-api-qatı)
12. [Data fetching: `src/shared/hooks/` bütün hook-lar](#hissə-12-data-fetching)
13. [Ortaq (shared) komponentlər — tək-tək](#hissə-13-shared-komponentlər)
14. [`RequireAuth`, `RedirectIfAuth` və digər auth komponentləri](#hissə-14-requireauth-redirectifauth)
15. [Layout: `SiteChrome`, `Header`, `Footer`, `Container`](#hissə-15-layout)
16. [Səhifələr (`src/views/`) — hər fayl ayrıca](#hissə-16-səhifələr)
17. [SEO: `seo.ts`, `robots.ts`, `sitemap.ts`, OG-şəkillər](#hissə-17-seo)
18. [Stil: Tailwind CSS və `globals.css`-in dizayn token-ləri](#hissə-18-stil)
19. [Alətlər (Tooling): `next.config.ts`, `tsconfig.json`, `package.json`](#hissə-19-tooling)
20. [Lüğət](#hissə-20-lüğət)

---

## Hissə 1: Bu layihə nədir

Bu, **Tik Tak** adlı bir market/e-ticarət brendinin **müştəri tərəfi (client) saytıdır** — kateqoriyalara baxmaq, məhsul axtarmaq, səbətə əlavə etmək, sevimlilərə salmaq, sifariş vermək və hesabı idarə etmək kimi funksiyaları olan, adi istifadəçilərin gördüyü veb-saytdır (admin panel yox — admin panel ayrı, Vite/React ilə yazılmış başqa bir repo-dur).

### Texnologiyalar və NİYƏ seçilib

- **Next.js 16 (App Router)** — React-in üzərində qurulmuş framework. Route-ları qovluq strukturu ilə idarə edir, server-side rendering (SSR) VƏ React Server Component-lər dəstəkləyir. Niyə: sırf React/Vite ilə (admin paneldə olduğu kimi) bu saytı qursaydıq, HEÇ bir SEO-uyğun SSR ola bilməzdi (bax Hissə 4/10).
- **React 19** — UI-ı komponentlərdən qurmaq üçün.
- **TypeScript** — tip yoxlaması. Hissə 3.
- **Turbopack** — Next.js-in sürətli bundler-i. Bu layihədə HƏM `dev`, HƏM DƏ `build` üçün istifadə olunur (`package.json`-da `"dev": "next dev --turbopack"`) — bu, adi Next.js layihələrindən fərqdir (adətən `build` hələ webpack-lə gedir, `dev`-də isə Turbopack defolt idi). Niyə: layihədə ÇOX sayda route var, hər biri server-də render olunur (servis-hesabı round-trip-ləri ilə) — Turbopack-ın on-demand kompilyasiyası bunu HƏQİQƏTƏN sürətləndirir.
- **axios** (`^1.18.1`) — HTTP sorğuları üçün. `src/services/httpClient/index.ts`-də "sarılıb". Niyə `fetch` YOX: layihə tarixən axios-la başlayıb, `fetch`-ə keçid DÜŞÜNÜLDÜ AMMA rədd EDİLDİ (bax Hissə 10-un React `cache()` izahı — problem başqa yolla həll olundu).
- **@tanstack/react-query** (`^5.101.4`) — server datasının cache-lənməsi/yenilənməsi. Hissə 12.
- **react-hook-form** + **zod** + **@hookform/resolvers** — formalar.
- **sonner** — toast bildirişləri.
- **lucide-react** — ƏSAS ikon kitabxanası. **react-icons** (`fa6` alt-paketi) YALNIZ Footer-in sosial media ikonları üçün (Facebook, Instagram və s. — lucide-də brend ikonları yoxdur).
- **Tailwind CSS 4** (`@tailwindcss/postcss` ilə) — CSS-in "utility-first" yanaşması.
- **server-only** (`^0.0.1`) — kiçik bir paket, `serviceAccount.ts`-in başına `import 'server-only'` yazmaqla, əgər bu fayl SƏHVƏN bir Client Component-ə import olunsa, BUILD ZAMANI XƏTA versin deyə (bax Hissə 10).

### Bu saytın ən mühüm memarlıq qərarı

Backend-in (`https://api.sarkhanrahimli.dev/api/tiktak`) demək olar BÜTÜN endpoint-ləri (`/products`, `/categories` daxil) token TƏLƏB EDİR — "qonaq" (anonim) üçün açıq bir "kataloqa bax" endpoint-i YOXDUR (bu, `web.md` sənədini oxumaqla YOX, real API-ni sınamaqla TƏSDİQLƏNİB). Amma bu sayt, giriş etməmiş istifadəçilərin də kateqoriyalara/məhsullara baxa bilməsini istəyir — həm ADİ istifadəçi təcrübəsi üçün (kim login etmədən mağazaya "girə" bilmir?), həm SEO üçün (axtarış botları HEÇ VAXT login edə bilməz). Bunu necə həll etdiyi Hissə 10-da ("servis hesabı") ətraflı izah olunur.

**Qısaca "niyə TypeScript?"** Adi JavaScript-də bir funksiyaya səhvən massiv əvəzinə obyekt versəniz, bunu YALNIZ proqramı işə salıb o hissəyə gələndə (bəzən istifadəçinin kompüterində!) xəta kimi görürsünüz. TypeScript isə bunu siz kodu yazarkən, redaktorda qırmızı xətt çəkərək dərhal göstərir.

---

## Hissə 2: Sintaksis lüğəti

Kodun içində dəfələrlə görəcəyiniz simvolları burda sadələşdirib izah edirik. (Bu bölmə TypeScript-ə aid deyil — sadəcə JavaScript/React. TypeScript üçün Hissə 3-ə keçin.)

### `import` / `export` — fayllar arası əlaqə

```ts
import { useState } from 'react'               // "react" paketindən useState-i gətir
import { Button } from '@/shared/components'   // Button-u shared/components-in barrel-indən gətir
export function AuthPage() { ... }              // adlı (named) export
export default function Page() { ... }          // default export (Next.js-in page.tsx-ləri bunu tələb edir)
```
- `export const X` / `export function X` (adlı export) — bir fayldan bir neçə ola bilər, import edərkən **dəqiq həmin adla**, fiqurlu mötərizədə gətirilir: `import { X } from '...'`. Bu layihədə demək olar hər şey belə export olunur.
- `export default` — Next.js-in `page.tsx`/`layout.tsx` fayllarında MƏCBURİDİR, başqa yerlərdə bu layihə demək olar heç istifadə etmir.
- `@/` — bu layihədə "qısayoldur", `src/`-ə işarə edir (`tsconfig.json`-da `paths` ilə təyin olunub, bax Hissə 19). `@/shared/components/Button` = `src/shared/components/Button/` qovluğu.

### Dəyişən elan etmək: `const` və `let`

```ts
const x = 5   // x-ə bir dəfə dəyər verilir, sonra dəyişdirilə bilməz
let y = 5     // y-ə sonra yenidən dəyər verilə bilər
```
Bu kodda demək olar həmişə `const` görəcəksiniz.

### Ox funksiyası (arrow function)

```ts
function topla(a, b) { return a + b }
const topla = (a, b) => a + b
const kvadrat = (x) => x * x   // { return } yazmasan avtomatik "return" olur
```
`(parametrlər) => nəticə` — kodun demək olar hər yerində, xüsusən `.map()`, `onClick={() => ...}` daxilində istifadə olunur.

### Destructuring

```ts
const user = { name: 'Ali', age: 20 }
const { name, age } = user

function Card({ title, price }: CardProps) { ... }  // props-u birbaşa parametrdə "açmaq"

const [x, y] = [1, 2]              // massivdən sıralı çıxarma
const { data: basket } = useBasket() // "data" sahəsini AYRI ADLA (basket) çıxarma
```
Bu layihədə demək olar hər komponent, öz props-unu funksiyanın parametrlərində belə "açır". `useQuery()`-nin qaytardığı `{ data }`-nı `{ data: basket }` kimi YENİDƏN ADLANDIRMAQ (hook-lar EYNİ komponentdə bir neçə dəfə çağırılanda, hamısının `data`-sı eyni adda ola BİLMƏZ) BÜTÜN layihə boyu təkrarlanan bir pattern-dir.

### Spread (`...`)

```ts
const yeni = { ...köhnə, price: 10 }     // köhnə obyektin bütün sahələrini kopyala, price-ı üstələ
const kopya = [...massiv]                 // massivi kopyala
<Button {...props} />                     // props obyektinin BÜTÜN sahələrini JSX atributu kimi "yay"
```

### Template literal

```ts
`${product.title} | TIK TAK`   // dəyişəni string-in içinə yerləşdirmək
```

### Ternar operator

```ts
isLoading ? <Loader /> : <Content />
```

### `&&` ilə şərti göstərmək (JSX-də çox işlədilir)

```tsx
{favoritesCount > 0 && <span>{favoritesCount}</span>}
```
Sol tərəf `false`/`0`/`null` olsa, sağ tərəf HEÇ render olunmur.

### Optional chaining `?.`

```ts
profile?.address   // profile null/undefined-dursa, xəta atmadan undefined qaytarır
fileInputRef.current?.click()
```

### Nullish coalescing `??`

```ts
profile?.address ?? 'Ünvanınızı seçin'   // profile.address yoxdursa (null/undefined) bunu göstər
basket?.count ?? 0
```
**Diqqət:** `??` YALNIZ `null`/`undefined`-i "boş" sayır — `||` isə HƏR "falsy" dəyəri (`0`, `''`, `false` daxil). Bu layihədə HƏR İKİSİ işlədilir, seçim məqsəddən asılıdır (məs. `product.img_url || PRODUCT_IMAGE_FALLBACK` — boş string-i DƏ fallback-a keçirmək istəyirik, ona görə `||`).

### Massiv metodları: `.map()`, `.filter()`, `.find()`, `.reduce()`, `.some()`

```ts
products.map(p => <ProductCard key={p.id} product={p} />)
basket.items.find(item => item.product.id === productId)
basket.items.reduce((sum, item) => sum + item.quantity, 0)
favorites?.some(favorite => favorite.id === product.id)
products.filter(product => product.category.id === categoryId)
```

### `async`/`await`

```ts
async function load() {
  const res = await productService.list()  // Promise "həll olunana" qədər gözlə
  return res.data
}
```

### React-in özü: komponent, `props`, JSX

Komponent — adı BÖYÜK hərflə başlayan, JSX (HTML-ə bənzər sintaksis) qaytaran adi bir funksiyadır. `props` — bu funksiyaya valideyn komponentdən ötürülən "parametrlər"dir.

### `useState` — komponentin "yaddaşı"

```ts
const [query, setQuery] = useState('')
```
`query` — cari dəyər, `setQuery` — onu dəyişən funksiya. `setQuery` çağırılanda komponent YENİDƏN render olunur.

### `useEffect` — "yan təsir"

```ts
useEffect(() => {
  document.title = product.title
}, [product])
```
İkinci arqument (`[product]`) — bu massivdəki dəyərlərdən HANSISA dəyişəndə funksiya YENİDƏN işə düşür. Boş massiv (`[]`) — yalnız komponent İLK dəfə ekrana çıxanda.

**Bu layihədə vacib bir qayda:** `useEffect`-i sırf "bu propsu/query nəticəsini state-ə köçür" üçün İSTİFADƏ ETMİRLƏR (layihənin ESLint qaydası — `react-hooks/set-state-in-effect` — bunu qadağan edir). Bunun əvəzinə "render zamanı state tənzimləmək" pattern-i işlədilir — Hissə 12-də konkret nümunə ilə izah olunur.

### `useRef` — render-lər arası "qutucuq"

```ts
const trackRef = useRef<HTMLDivElement>(null)
<div ref={trackRef}>...</div>
```
`useState`-dən fərqli olaraq, `.current`-i dəyişmək komponenti YENİDƏN RENDER ETMİR. DOM elementinə birbaşa "əl atmaq" (`trackRef.current.scrollBy(...)`) üçün istifadə olunur.

### Custom hook — öz `useXxx()` funksiyanız

`use` ilə başlayan, öz daxilində başqa hook-lar çağıran, təkrar istifadə edilən funksiya. Bu layihədə `useBasket`, `useProfile`, `useHasMounted` və s. — Hissə 12 və 14.

---

## Hissə 3: TypeScript lüğəti

### TypeScript ümumiyyətlə nədir?

JavaScript-in ÜZƏRİNƏ "bu dəyər hansı formadadır" məlumatı əlavə edən bir dil. Brauzer TypeScript-i başa düşmür — kod işə düşməzdən əvvəl adi JavaScript-ə "compile" olunur (Turbopack bunu avtomatik edir).

### Əsas tiplər

```ts
let name: string = 'Ali'
let age: number = 20
let active: boolean = true
let ids: number[] = [1, 2, 3]
let val: number | null = null
```

### `interface` — "bu obyektin FORMASI belədir"

```ts
export interface Product {
  id: number
  title: string
  price: number
  img_url: string | null
}
```
Bu layihədə **BÜTÜN** `interface`/`type` elanları YALNIZ `src/types/` qovluğunda yaşayır — komponent fayllarının içində inline tip YAZILMIR (framework-un özünün tələb etdiyi 1-2 istisna xaricində, məs. `RootLayout`-un `Readonly<{ children: React.ReactNode }>` tipi, `Layout({ children }: { children: ReactNode })` kimi bəzi `layout.tsx`-lər). Hər tip öz faylındadır, fayl adı = export adı (`types/product/Product.ts` → `export interface Product`).

### `?` — "bu sahə OLA da bilər, OLMAYA da"

```ts
interface UpdateProfilePayload {
  full_name?: string   // ötürməsən də olar
}
```

### Union tiplər (`|`)

```ts
type AuthTab = 'login' | 'register'   // YA bu, YA da o
img_url: string | null                 // ya string, ya da null
type ModalStep = 'idle' | 'confirming' | 'success'
```

### `enum`

```ts
export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
}
```
Layihədə `PaymentMethod`, `OrderStatus`, `UserRole` kimi sabit dəyər dəstləri `enum`-la yazılıb — `Record<OrderStatus, string>` kimi tiplərlə birlikdə "bu enum-un HƏR üzvü üçün bir dəyər" tələb edən map-lər qurmaq üçün əlverişlidir (bax `orderStatus.ts`, Hissə 12).

### Generic-lər (`<T>`)

```ts
export function serviceGet<T>(path: string): Promise<T> { ... }
serviceGet<Category[]>('/categories')   // "T = Category[]" — nəticənin tipini çağıran tərəf seçir
```
`useQuery`, `useMutation` (TanStack Query-dən) da generic-dir — bu layihədə hər `useX()` hook-u öz data tipini beləcə "ötürür". `httpClient.ts`-in `get<T>(url)` metodu da eyni pattern-i işlədir.

### `Record<Açar, Dəyər>`

```ts
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'Gözləmədə',
  ...
}
```
"Bu obyektin açarları `OrderStatus` enum-unun HƏR üzvü olmalıdır, dəyərləri isə string." TypeScript, ƏGƏR `OrderStatus`-a yeni bir üzv ƏLAVƏ EDİLSƏ, AMMA bu map-ə uyğun sətir ƏLAVƏ EDİLMƏSƏ, DƏRHAL xəta verəcək — beləliklə "unudulmuş status" mümkün deyil.

### `as` — tip assersiyası

```ts
const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
```
"Mənə inan, bu, BU tipdədir" deməkdir — TypeScript-i MƏCBURİ inandırır, runtime yoxlaması ETMİR.

### `import type` / `export type`

```ts
import type { Product } from '@/types'
```
Yalnız TİP üçün import — kompilyasiya zamanı tamamilə silinir, run-time-da heç bir iz qalmır.

### Funksiya tipləri

```ts
onSuccess?: (message: string) => void
```
"bu prop, bir string alıb heç nə qaytarmayan funksiyadır".

### Next.js-ə xas tip nümunələri (bu layihənin BREAKING CHANGE-lərindən biri)

```ts
export default async function Page({ params }: { params: Promise<{ id: string }> }) { ... }
const { id } = await params
```
Bu layihədə (Next.js-in bu versiyasında) dinamik route-ların `params`-ı bir `Promise`-dir (bəzi əvvəlki Next.js versiyalarında birbaşa obyekt idi) — `await params` etmək LAZIMDIR. `src/types/product/ProductPageParams.ts` kimi tip faylları məhz bunu əks etdirir:
```ts
export interface ProductPageParams {
  params: Promise<{ id: string }>
}
```

### Tip xətası gördükdə nə etməli

Adətən ya səhv tip ötürülüb, ya da `src/types/`-dəki tip real API cavabına uyğun deyil (`web.md`-ə həmişə güvənməyin — bax Hissə 11). `npx tsc --noEmit -p .` əl ilə bütün layihəni tip-yoxlamaqdan keçirir.

---

## Hissə 4: Next.js anlayışları

Bu bölmə admin panelində (Vite/React) YOXDUR — çünki bu layihənin ƏN böyük fərqi məhz Next.js-in App Router-idir.

### App Router — qovluq = route

`src/app/` daxilindəki hər qovluq, brauzerdəki bir URL-ə uyğun gəlir. `src/app/categories/[id]/page.tsx` → `/categories/5` kimi bir URL-i render edir (`[id]` — "dinamik seqment", istənilən dəyəri tuta bilər).

Bu layihədəki xüsusi fayl adları:
- `page.tsx` — bu route-un ƏSAS məzmunu.
- `layout.tsx` — bu qovluq VƏ onun BÜTÜN alt-route-ları üçün ORTAQ "qabıq". `page.tsx` onun `{children}`-i kimi render olunur, naviqasiya zamanı YENİDƏN QURULMUR.
- `loading.tsx` — bu route yüklənərkən avtomatik göstərilən fallback (React Suspense-in üzərində qurulub). Bu layihədə kökdə (`src/app/loading.tsx`) BİR DƏNƏ var, animasiyalı spinner göstərir.
- `not-found.tsx` — `notFound()` çağırılanda VƏ ya uyğun route tapılmayanda avtomatik göstərilir.
- `error.tsx` — bu qovluqdakı (VƏ alt-qovluqlardakı) İSTƏNİLƏN render xətasını "tutan" React Error Boundary. **BREAKING CHANGE:** adi Next.js-də bu komponentin ikinci propu `reset: () => void` adlanır, BU LAYİHƏDƏ isə `unstable_retry: () => void` (bax Hissə 8).
- `robots.ts` / `sitemap.ts` / `opengraph-image.tsx` / `icon.tsx` — "file convention"-lar, Next.js bu ADLARI xüsusi tanıyır və avtomatik `/robots.txt`, `/sitemap.xml`, OG-şəkil, favicon kimi generasiya edir.

### Server Component vs Client Component

Bu, bütün layihənin ən vacib konseptual fərqidir.

- **Server Component** (defolt — heç nə yazmasan BUDUR): YALNIZ serverdə işə düşür, brauzerə JavaScript-i GÖNDƏRİLMİR. İçində `useState`/`useEffect`/`onClick` OLA BİLMƏZ, amma birbaşa `await` ilə data çəkə bilər (adi `async function` kimi). Nümunə: `src/views/Home/index.tsx`:
  ```tsx
  export async function HomePage() {
    const campaigns: Campaign[] = await campaignService.list().then(res => res.data).catch(() => [])
    return <Container>...</Container>
  }
  ```
- **Client Component**: faylın ƏN yuxarısında `'use client'` yazılıb. Bu layihədə demək olar bütün `src/views/*/index.tsx` (HomePage İSTİSNA olmaqla) və `src/shared/components/*` `'use client'`-dir.

### SSR (Server-Side Rendering) və niyə vacibdir

Adi bir React SPA-da brauzer boş bir HTML alır, sonra JS yüklənir, sonra data çəkilir, SONRA məzmun görünür — botlar üçün pisdir. Next.js-də server artıq HAZIR HTML-i göndərir. Bax Hissə 10.

### `generateMetadata` / `metadata`

Hər `page.tsx`-in ixrac edə biləcəyi xüsusi funksiya/obyekt — `<title>`, `<meta description>` və s.-i SERVERDƏ render etməyə imkan verir. Bax Hissə 17.

### `revalidate` (ISR)

```ts
export const revalidate = 300
```
Bu route, HƏR sorğuda YENİDƏN backend-ə getmir — 300 saniyə (5 dəqiqə) render olunmuş HTML "cache"-də saxlanılır.

### React `cache()` funksiyası

```ts
export const serviceGet = cache(async function serviceGet<T>(path: string) { ... })
```
`revalidate`-dən FƏRQLİ bir problemi həll edir: EYNİ SORĞU İÇİNDƏ (`generateMetadata` VƏ `page.tsx` EYNİ path-i iki dəfə çəkəndə) təkrarlanan çağırışların YALNIZ BİRİNCİSİ şəbəkəyə gedir. Bax Hissə 10.

---

## Hissə 5: Qovluq strukturu

```
src/
  app/            → YALNIZ routing (page.tsx-lər nazik "wrapper"dır, biznes məntiqi yoxdur)
  views/          → hər route üçün əsl UI + data fetching
  shared/
    components/   → təkrar istifadə olunan UI
    hooks/        → data domain-i üzrə bir fayl
    utils/        → sadə köməkçi funksiyalar, React-siz
    constants/    → sabit dəyərlər
  services/       → API domain-i üzrə bir fayl
  types/          → interface/type elanlarının YEGANƏ yeri
  assets/         → ES-import olunan statik fayllar
```

### `src/views/` daxilində domen qovluqları

```
src/views/
  Home/                          → index.tsx, components/ (BannerCarousel, SpecialOffers, StatsSection, PromoBanner, StatCard)
  Auth/
    AuthPage/                    → index.tsx, constants.ts, utils.ts, components/ (LoginForm, RegisterForm, PhoneField, PasswordVisibilityToggle, PasswordVisibilityIcon)
    LoginPage/                   → index.tsx (AuthPage-i initialTab="login" ilə çağırır)
    RegisterPage/                → index.tsx (AuthPage-i initialTab="register" ilə çağırır)
  Category/
    CategoriesPage/               → index.tsx (Server Component, /categories-in özü)
    CategoryDetailLayout/         → index.tsx (persistent shell, /categories/[id] üçün)
    CategoryProductsSection/      → index.tsx (grid, /categories/[id]-nin page.tsx-i üçün)
    CategoryProductDetailSection/ → index.tsx (/categories/[id]/products/[productId] üçün)
  Product/
    ProductsPage/                 → index.tsx (Server Component, /products)
    ProductsGrid/                 → index.tsx (paginasiya edən Client grid)
    ProductDetailPage/            → index.tsx (/products/[id])
  Basket/                         → index.tsx, components/ (BasketPageItemRow, BasketTotalCard) — TƏK səhifə olduğu üçün əlavə "BasketPage/" nesting-i YOXDUR
  Checkout/                       → index.tsx, constants.ts, components/ (ConfirmOrderModal, OrderDetailsCard, OrderSummaryCard, OrderSuccessModal, PaymentMethodOption) — Basket-dən AYRI domen (checkout basketin bir "alt-hissəsi" DEYİL, öz axını olan ayrı bir mərhələdir)
  Account/
    AccountLayout/                → index.tsx, components/ (AccountSidebarNav), constants.ts
    AccountPage/                  → index.tsx, constants.ts, components/ (AvatarUploader, PersonalInfoFields, PasswordFields)
  Orders/
    OrdersPage/                   → index.tsx, constants.ts, components/ (OrdersTable)
    OrderDetailSection/           → index.tsx, constants.ts, components/ (OrderInfoGrid, OrderItemsList)
  FavoritesPage/                  → index.tsx, constants.ts, utils.ts, components/ (FavoritesGrid) — TƏK səhifə, "Favorites/FavoritesPage/" nesting-i YOXDUR
  Profile/                        → index.tsx — TƏK səhifə (köhnə, ARTIQ istifadə olunmayan `/profile` route-u üçün, bax Hissə 8)
```

**Qayda görürsünüzmü?** Bir domendə YALNIZ BİR səhifə/komponent varsa (Basket, Checkout, Home, Profile, Favorites), əlavə bir alt-qovluq (`Basket/BasketPage/`) YARADILMIR — domen qovluğunun ÖZÜ birbaşa `index.tsx`+`components/` daşıyır. Bir domendə BİRDƏN ÇOX ayrı səhifə/komponent varsa (Category-də 4 dənə, Account-da 2, Orders-da 2, Auth-da 3), HƏR BİRİ öz adlı alt-qovluğunu alır — çünki orda "domen qovluğu" ilə "səhifə" EYNİ ŞEY DEYİL, məsələn `Category/`-nin özü bir səhifə deyil, sadəcə 4 fərqli category-related komponentin ORTAQ EVİDİR.

**Bəs niyə `Account/`, `Auth/`, `Category/`, `Orders/`, `Product/` qovluqlarının KÖKÜNDƏ birbaşa `index.tsx` YOXDUR?** Çünki bu 5 domendə BİRDƏN ÇOX, BİR-BİRİNDƏN MÜSTƏQİL ROUTE-A aid komponent var — domen qovluğunun ÖZÜ HEÇ BİR TƏK route-u TƏMSİL ETMİR:
- `Account/` → `/account` (AccountPage) VƏ `/account/orders` (OrdersPage, AYRI `Orders/` domenində) — `AccountLayout` bunların İKİSİNİ DƏ saran ORTAQ qabıqdır, ÖZÜ bir route DEYİL.
- `Auth/` → `AuthPage` (əsl UI) + `LoginPage`/`RegisterPage` (onu FƏRQLİ `initialTab` ilə çağıran NAZİK wrapper-lər) — 3 AYRI komponent.
- `Category/` → 4 AYRI komponent, HƏR BİRİ FƏRQLİ bir route-a aid (`/categories`, `/categories/[id]` layout-u, `/categories/[id]`-in grid-i, `/categories/[id]/products/[id]`).
- `Orders/` → `OrdersPage` (`/account/orders`) + `OrderDetailSection` (`/account/orders/:id`) — 2 AYRI komponent.
- `Product/` → 3 AYRI komponent (siyahı səhifəsi, grid, detal səhifəsi).

Kök səviyyəsində bir `index.tsx` YAZILSAYDI, O NƏYİ export EDƏRDİ — 2-4 həmqonşu komponentdən HANSINI? Bunun MƏNASI OLMAZDI. HƏR alt-komponent ARTIQ ÖZ `index.tsx`-İNİ daşıyır, `src/views/index.ts` BARREL-İ DƏ onların HAMISINI ayrı-ayrı export edir (bax aşağı) — deməli DOMEN kökündə əlavə bir `index.tsx`-ə EHTİYAC YOXDUR, bu QƏSDƏN belədir, boşluq/nöqsan DEYİL. **Qısaca: TƏK-səhifəli domenlər DÜZLƏŞDİRİLİR (kök = səhifə), ÇOX-səhifəli domenlər DÜZLƏŞDİRİLMİR (hər səhifə öz qovluğunda qalır, kökdə HEÇ NƏ yoxdur).**

### Qovluq adlandırma qaydası

Demək olar hər komponent/səhifə/hook öz `Ad/` qovluğunda yaşayır, içində `index.tsx` (əsas fayl) və lazım olsa `components/` (yalnız o komponentə aid alt-hissələr) və `constants.ts`/`utils.ts`. İdxal edərkən faylın öz adını yox, YALNIZ qovluğu yazırsınız: `import { Button } from '@/shared/components/Button'` — bu, `Button/index.tsx`-i tutur.

**Dairəvi import (circular import) təhlükəsi:** `src/shared/components/` daxilindəki bir fayl, EYNİ ağacın (`src/shared/components/`) içindəki BAŞQA bir komponenti işlədəndə, ƏSLA yuxarı səviyyə barrel-dən (`@/shared/components`) YOX, NİSBİ yoldan (`'../Button'`) import edir. Səbəb: barrel-in özü bu faylı transitiv olaraq YENİDƏN export edir, deməli barrel-dən import etmək faylın ÖZ AĞACINA dairəvi referans yaradır. Məsələn `ConfirmModal` daxilində `Button` belə gətirilir: `import { Button } from '../Button'`, `@/shared/components`-dən YOX. Eyni qayda `HeartToggle`, `BackButton`, `CarouselNavButton` üçün də keçərlidir.

### `src/assets/`

Şəkillər (`category.png`, `tiktak-login.webp`, `basket-empty.svg`), fontlar kimi ES-import olunan statik fayllar — `import x from '@/assets/images/foo.png'` ilə gətirilir və `<img src={x.src}>` (adi API-dən gələn şəkillər üçün) və ya birbaşa `next/image`-ə (yalnız iki statik banner üçün, `CategoriesPage`/`CategoryDetailLayout`) ötürülür.

---

## Hissə 6: `src/types/` qovluğu

Hər domain (`user/`, `product/`, `category/`, `basket/`, `order/`, `campaign/`, `favorites/`, `account/`, `auth/`, `upload/`, `shared/`, `common/`) öz qovluğunda, hər qovluqda bir `index.ts` barrel-i. Ən yuxarıda `src/types/index.ts` — hər domain barrel-ini yenidən export edir, beləliklə istənilən yerdən `import type { Product, Category } from '@/types'` yazmaq kifayətdir.

**`*Props` tipləri də burada yaşayır**, komponentin öz faylında YOX. Məsələn `ButtonProps` — `src/types/shared/ButtonProps.ts`-də, `Button/index.tsx`-in içində deyil.

### Bütün domain-lər və nümunə tiplər

**`common/`** — layihə-boyu paylaşılan generic tiplər:
```ts
// ApiResponse.ts — demək olar HƏR endpoint-in zərfi
export interface ApiResponse<T> {
  message: string
  data: T
  result: boolean
}

// PaginatedResponse.ts — /products kimi siyahı endpoint-ləri
export interface PaginatedResponse<T> {
  message: string
  data: T[]
  result: boolean
  pagination?: Pagination
}

// CachedSession.ts — serviceAccount.ts-in yaddaşda saxladığı sessiya
export interface CachedSession {
  accessToken: string
  refreshToken: string
  accessExpiresAt: number
}
```

**`user/`**:
```ts
// User.ts — DİQQƏT: web.md `email`-i göstərmir, amma real API-dən gəlir
export interface User {
  id: number
  full_name: string
  phone: string
  email: string | null
  address: string | null
  img_url: string | null
  role?: UserRole
}

// AuthTokens.ts
export interface AuthTokens {
  access_token: string
  refresh_token: string
}

// AuthResponseData.ts — POST /auth/login-in "data" sahəsi
export interface AuthResponseData {
  user: User
  tokens: AuthTokens
}
```

**`product/`**:
```ts
// Product.ts
export interface Product {
  id: number
  title: string
  description: string
  price: number
  img_url: string | null
  type: ProductMeasure     // "ədəd", "kg" və s. — real API sahəsi, göstərmək üçün
  is_favorite?: boolean
  category: Category
}
```

**`basket/`**:
```ts
// Basket.ts
export interface Basket {
  items: BasketItem[]
  total: number
  count: number
}

// BasketItem.ts
export interface BasketItem {
  id: number
  product: Product
  quantity: number
  total_price: number
}
```

**`order/`**:
```ts
// Order.ts
export interface Order {
  id: number
  orderNumber: string
  createdAt: string
  address: string
  phone: string
  note?: string
  paymentMethod: PaymentMethod
  status: OrderStatus
  items: OrderItem[]
  total: number
  deliveryFee: number
}

// OrderStatus.ts
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// PaymentMethod.ts
export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
}
```

**Dərs:** `web.md`-nin (backend sənədi) nümunə JSON-una həmişə güvənməyin — real API cavabını `curl`/brauzer ilə yoxlamaq lazımdır. `User.email` buna konkret nümunədir.

### Digər domain tipləri (qısaca)

Yuxarıda göstərilməyən, amma tez-tez rast gələcəyiniz digər tiplər:
```ts
// category/Category.ts
export interface Category {
  id: number
  name: string
  description?: string
  img_url: string | null
}

// campaign/Campaign.ts — /campaigns endpoint-inin qaytardığı forma
export interface Campaign {
  id: number
  title: string
  img_url: string | null
  // ...
}

// product/ProductMeasure.ts — Product.type sahəsinin mümkün dəyərləri
export type ProductMeasure = 'ədəd' | 'kg' | ...   // real API sahəsi, QuantityStepper-də "3 ədəd" kimi göstərilir

// user/UserRole.ts — sənədləşməmiş, amma real API sahəsi (web.md-də yoxdur, User.email kimi)
export enum UserRole { ... }

// user/LoginPayload.ts, SignupPayload.ts, UpdateProfilePayload.ts — auth/profil formalarının göndərdiyi body-lər
export interface LoginPayload { phone: string; password: string }
export interface SignupPayload { full_name: string; phone: string; password: string }
export interface UpdateProfilePayload { full_name?: string; address?: string; img_url?: string; password?: string; password_repeat?: string }

// order/CheckoutPayload.ts — POST /orders/checkout-un body-si
export interface CheckoutPayload { paymentMethod: PaymentMethod; note?: string; address: string; phone: string }

// order/OrderItem.ts — Order.items-in hər elementi (BasketItem-ə OXŞAR, amma AYRI tip — sifariş VERİLDİKDƏN sonra məhsulun qiyməti DƏYİŞSƏ belə, sifarişin ÖZÜNDƏKİ qiymət SABİT qalmalıdır)
export interface OrderItem {
  id: number
  product: Product
  quantity: number
  total_price: number
}

// common/ListQueryParams.ts, common/Pagination.ts — productService.list(params)-in QƏBUL ETDİYİ VƏ PaginatedResponse-un DAŞIDIĞI köməkçi tiplər
export interface ListQueryParams { page?: number; limit?: number; ... }
export interface Pagination { page: number; limit: number; total: number; totalPages: number }
```
`UserRole`/`ProductMeasure` KİMİ TİPLƏR bir layihə auditində "İSTİFADƏ OLUNMUR, SİLİNSİN Mİ?" DEYƏ SORĞULANIB — YOXLANILIB Kİ, `ProductMeasure` HƏQİQƏTƏN GÖSTƏRİLİR (`product.type` MƏTN KİMİ RENDER OLUNUR), `UserRole`/`role` İSƏ `User.email` KİMİ SƏNƏDLƏŞMƏMİŞ, AMMA REAL BİR API SAHƏSİDİR — HEÇ BİRİ SİLİNMƏYİB.

### `*Props` tipləri — HANSI FAYLDA NƏ VAR

Hər komponentin `Props` tipi ÖZ DOMENİNDƏ, KOMPONENTİN ADI+`Props` FAYL ADI İLƏ YAŞAYIR: `ButtonProps.ts` (`shared/`), `CategoryCardProps.ts` (`category/`), `OrderInfoGridProps.ts` (`order/`) VƏ S. — HƏR BİRİ AYRI-AYRI GÖSTƏRİLMİR (80-DƏN ÇOX FAYLDIR), AMMA QAYDA SABİTDİR: **əgər bir komponentin PROP-LARI VARSA, ONLARIN TİPİ HƏMİŞƏ `src/types/`-DƏ, KOMPONENTİN ÖZ FAYLINDA DEYİL.** Bu, Hissə 13/16-DA GÖSTƏRİLƏN HƏR KOMPONENTƏ AİDDİR.

### Domain-lər arası import qaydası

Domain-lər arası import barrel üzərindən (`from '../category'`), eyni domain daxilində birbaşa (`from './OrderStatus'`).

---

## Hissə 7: Giriş nöqtəsi

### `src/app/layout.tsx` — Root Layout

Bütün saytın "ən xarici qabığı":

```tsx
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext"],   // Azərbaycan hərfləri (ə,ş,ç,ğ,ö,ü) latin-ext-dədir
  weight: ["400", "500", "600", "700", "800"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "TIK TAK | Onlayn Supermarket", template: "%s | TIK TAK" },
  ...
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={`${roboto.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }" }} />
      </head>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <SiteChrome>{children}</SiteChrome>
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
```

Nöqtə-nöqtə:
- İki font: `Roboto` (sayt-boyu default, `--font-sans`) və `Poppins` (yalnız yaşıl promo bannerlərin daxilində, inline `style={{ fontFamily: 'var(--font-poppins)' }}` ilə). `Roboto` MÜTLƏQ `subsets: ["latin", "latin-ext"]` ilə — olmasa Azərbaycan hərfləri səssizcə başqa sistem fontuna keçir.
- `<script>`: `history.scrollRestoration = 'manual'` — brauzerin öz "geri qayıdanda əvvəlki scroll mövqeyinə qayıt" davranışını söndürür (Next.js-in öz naviqasiya scroll-idarəsi ilə TOQQUŞMASIN deyə).
- `metadata.title.template: "%s | TIK TAK"` — hər səhifənin öz `title`-ı avtomatik `"Bu Başlıq | TIK TAK"` formasına düşür (`buildMetadata`-nın verdiyi tək sözlə).
- `<QueryProvider>` → `<SiteChrome>` → `<Toaster>` — İYERARXİYA vacibdir: `QueryProvider` ən xaricdə olmalıdır ki, İÇİNDƏKİ HƏR ŞEY (Header-in `useProfile()`-i daxil) TanStack Query-yə çata bilsin.
- `<Toaster position="top-right" richColors />` — BİR DƏFƏ, kökdə. Başqa yerdə İKİNCİ `<Toaster>` ƏLAVƏ EDİLMİR.

### `providers/QueryProvider.tsx`

```tsx
'use client'
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } }),
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
```
`QueryClient`-i `useState`-in "lazy initializer"-i (`() => new QueryClient(...)`) ilə yaradır ki, HƏR render-də TƏZƏDƏN yaranmasın (əgər sadəcə `useState(new QueryClient())` yazılsaydı, `new QueryClient()` HƏR render-də İCRA olunardı, sadəcə nəticəsi atılardı — israf). `staleTime: 30_000` — bütün sorğular üçün qlobal defolt: data 30 saniyə "təzə" sayılır, bu müddətdə komponent yenidən mount olsa belə TƏKRAR şəbəkə sorğusu getmir. Kod daxilindəki şərh bunun SƏBƏBİNİ belə izah edir: mutasiyalar ARTIQ öz təsir etdikləri query-ləri `invalidate` edir, ona görə 0ms staleTime sadəcə HƏR remount/pəncərə-fokuslanmada DƏYİŞMƏMİŞ datanı TƏKRAR çəkmək deməkdir — 30san bunu, real dəyişiklik ilə cari data arasında mənalı fərq yaratmadan, azaldır.

---

## Hissə 8: Routing — `src/app/` faylları tək-tək

`src/app/` daxilində hər qovluq bir route-dur (bax Hissə 4). Bu layihədə `page.tsx`-lər **nazik** saxlanılır — biznes məntiqi `src/views/`-dədir.

### `src/app/page.tsx` — Ana səhifə

```tsx
export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'Ana səhifə',
  description: '...',
  path: '/',
  robots: { index: true, follow: true },   // YEGANƏ səhifə ki, robots index=true ötürür
})

export default function Page() {
  return <HomePage />
}
```

### `src/app/login/page.tsx`, `register/page.tsx`

```tsx
export default function Page() {
  return (
    <RedirectIfAuth>
      <LoginPage />
    </RedirectIfAuth>
  )
}
```
`RedirectIfAuth` — artıq login olmuş istifadəçini bu səhifədən uzaqlaşdırır (bax Hissə 14). `metadata` burada `robots` VERMİR — deməli `buildMetadata`-nın DEFOLTU (`{ index: false, follow: false }`) tətbiq olunur, çünki login/register səhifələri indekslənməyə DƏYƏR VERMİR.

### `src/app/categories/page.tsx`, `layout.tsx`, `[id]/page.tsx`, `[id]/products/[productId]/page.tsx`

Bu, layihənin "Persistent Layout + Swappable Page" pattern-inin ƏN AYDIN nümunəsidir:

```tsx
// src/app/categories/layout.tsx
export const revalidate = 300

export default async function Layout({ children }: { children: ReactNode }) {
  const categories: Category[] = await serviceGet<ApiResponse<Category[]>>('/categories')
    .then((res) => res.data)
    .catch(() => [])

  return <CategoryDetailLayout categories={categories}>{children}</CategoryDetailLayout>
}
```
```tsx
// src/app/categories/[id]/page.tsx
export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const { id } = await params
  ...
}

export default async function Page({ params }: CategoryPageParams) {
  const { id } = await params
  const categoryId = Number(id)
  const products: Product[] = await serviceGet<PaginatedResponse<Product>>('/products')
    .then((res) => res.data.filter((product) => product.category.id === categoryId))
    .catch(() => [])

  return <CategoryProductsSection products={products} />
}
```
Diqqət: `layout.tsx` KATEQORİYA SİYAHISINI, `[id]/page.tsx` isə MƏHSUL SİYAHISINI ayrı-ayrı `serviceGet` çağırışları ilə çəkir — bunlar FƏRQLİ path-lərdir (`/categories` vs `/products`), ona görə `cache()`-in dedup-u burada tətbiq olunmur (dedup yalnız EYNİ path İKİ dəfə çağırılanda işə düşür — bax `generateMetadata` + `Page`-in İKİSİNİN də `/categories` çəkdiyi HAL).

**Kritik qayda (əməli olaraq təsdiqlənib, Playwright ilə yoxlanılıb):** bu ortaq layout MÜTLƏQ `src/app/categories/layout.tsx`-də olmalıdır, YOX `src/app/categories/[id]/layout.tsx`-də. `[id]` qovluğunun İÇİNDƏKİ bir layout, `id` DƏYİŞƏNDƏ YENƏ DƏ REMOUNT olunur (DOM identikliyi itir, effect-lər təkrar işə düşür) — bu, "persistent" olmağın bütün mənasını itirir. Dinamik `id`-ni server `params`-dan YOX, client-side `useParams()`-dan oxuyun (`CategoryDetailLayout` məhz belə edir).

### `src/app/products/[id]/page.tsx`

```tsx
export const revalidate = 300

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { id } = await params
  const path = `/products/${id}`
  try {
    const product = await serviceGet<ApiResponse<Product>>(`/products/${id}`).then((res) => res.data)
    return buildMetadata({ title: product.title, description: product.description || '...', path })
  } catch {
    return buildMetadata({ title: 'Məhsul detalları', description: '...', path })
  }
}

export default async function Page({ params }: ProductPageParams) {
  const { id } = await params
  const product = await serviceGet<ApiResponse<Product>>(`/products/${id}`).then((res) => res.data).catch(() => null)
  return <ProductDetailPage productId={Number(id)} initialProduct={product} />
}
```
Diqqət: `generateMetadata` VƏ `Page` EYNİ path-i (`/products/${id}`) AYRI-AYRI çağırır — `serviceGet`-in `cache()`-lə sarılması (Hissə 4, Hissə 10) məhz bunun İKİ DƏFƏ şəbəkəyə getməsinin QARŞISINI ALIR. `try/catch` hər ikisində var — servis hesabı XƏTA versə belə (backend vaxtıcə cavab verməsə), səhifə TAM ÇÖKMƏK yerinə boş/generic bir başlıqla RENDER OLUNMAĞA davam edir.

### `src/app/basket/page.tsx`, `src/app/checkout/page.tsx`

```tsx
// basket/page.tsx
export default function Page() {
  return (
    <RequireAuth>
      <BasketPage />
    </RequireAuth>
  )
}
```
```tsx
// checkout/page.tsx — EYNİ pattern, AYRI komponent (CheckoutPage, İNDİ `src/views/Checkout/`-dan)
export default function Page() {
  return (
    <RequireAuth>
      <CheckoutPage />
    </RequireAuth>
  )
}
```
Hər ikisi `RequireAuth`-a sarılıb — çünki `/basket` VƏ `/checkout` şəxsi datadır (ziyarətçinin ÖZ səbəti), servis hesabından KEÇMİR.

### `src/app/account/layout.tsx`, `account/page.tsx`, `account/orders/page.tsx`, `account/orders/[id]/page.tsx`

```tsx
// account/layout.tsx
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <AccountLayout>{children}</AccountLayout>
    </RequireAuth>
  )
}
```
`RequireAuth` BURADA, layout-un ÖZÜNDƏ BİR DƏFƏ qoyulub — bu, ALT-ROUTE-LARIN (`/account`, `/account/orders`, `/account/orders/:id`) HƏR BİRİNDƏ AYRICA `RequireAuth` YAZMAQ ehtiyacını ARADAN QALDIRIR (`layout.tsx` bütün alt-ağac üçün BİR DƏFƏ render olunur, bax Hissə 4).

### `src/app/favorites/page.tsx`, `favorites/[id]/page.tsx`

```tsx
export default function Page() {
  return (
    <RequireAuth>
      <Suspense fallback={<Loader />}>
        <FavoritesPage />
      </Suspense>
    </RequireAuth>
  )
}
```
`<Suspense>` LAZIMDIR çünki `FavoritesPage` (VƏ `ProductsGrid`) `useSearchParams()` OXUYUR — Next.js bunu TƏLƏB EDİR (əks halda build zamanı xəbərdarlıq/xəta).

### `src/app/error.tsx` — BREAKING CHANGE nümunəsi

```tsx
'use client'

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string }
    unstable_retry: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>...
            <button type="button" onClick={() => unstable_retry()}>Yenidən cəhd et</button>
        </div>
    )
}
```
**Diqqət:** adi Next.js-də bu propun adı `reset` olur. BU layihənin Next.js versiyasında `unstable_retry` adlanır — `AGENTS.md`-nin "bu, sizin bildiyiniz Next.js deyil" xəbərdarlığının KONKRET bir nümunəsidir. Köhnə tutorial-lardakı `reset()` nümunəsini KOPYALASANIZ, `reset is not a function` xətası alarsınız.

### `src/app/not-found.tsx`, `src/app/loading.tsx`

Sadə, statik komponentlər — `not-found.tsx` "404" göstərir + ana səhifəyə keçid, `loading.tsx` bütün kök-səviyyəli Suspense fallback-ı kimi bir spinner göstərir (`Yüklənir...`).

### Köhnə `/profile` route-u

`src/app/profile/page.tsx` VƏ `src/views/Profile/index.tsx` HƏLƏ mövcuddur (məhsuldar `useState`+`useEffect` ilə profil çəkir, `useProfile()` hook-una KEÇİRİLMƏYİB) — bu, `AccountPage`-dən ƏVVƏLKİ, köhnə bir profil səhifəsidir. Layihə auditində açıq SUAL olaraq qaldırılıb, İSTİFADƏÇİ ONU SAXLAMAĞI seçib (silinməyib) — YENİ kodda bu YERİNƏ `AccountPage`-i (`/account`) nümunə götürün, `ProfilePage`-in `useState`+`useEffect` pattern-ini KOPYALAMAYIN:

```tsx
// src/views/Profile/index.tsx — KÖHNƏ pattern, YENİ koda nümunə DEYİL
export function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    profileService.get().then((res) => setProfile(res.data)).finally(() => setLoading(false))
  }, [])
  ...
}
```

---

## Hissə 9: Auth

### `src/services/httpClient/index.ts` — ən mürəkkəb servis faylı, diqqətlə oxuyun

```ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

const isBrowser = () => typeof window !== 'undefined'

export function getAccessToken() {
  if (!isBrowser()) return null
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}
```
`isBrowser()` YOXLAMASI VACİBDİR — bu fayl HƏM server-render zamanı (Client Component-lərin İLK render-i server-də DƏ baş verir), HƏM DƏ brauzerdə IMPORT OLUNUR. `localStorage` server-də MÖVCUD DEYİL — yoxlamasız çağırsanız, "localStorage is not defined" XƏTASI ALARSINIZ. `getAccessToken()` serverdə HƏMİŞƏ `null` qaytarır — bu, `useHasMounted()`-in HƏLL ETDİYİ hidrasiya probleminin KÖKÜDÜR (bax Hissə 12).

```ts
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Accept-Language': 'az' },
})

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```
**Interceptor** — HƏR sorğudan ƏVVƏL avtomatik işə düşən funksiya. Bu, hər `httpClient.get(...)` çağırışına ƏL İLƏ `Authorization` başlığı ƏLAVƏ ETMƏK EHTİYACINI ARADAN QALDIRIR — token varsa, HƏR sorğuya ÖZÜ əlavə olunur.

```ts
let refreshPromise: Promise<string> | null = null

async function refreshAccessToken() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token available')
  const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refresh_token: refreshToken })
  setTokens(data.data.access_token, data.data.refresh_token)
  return data.data.access_token as string
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        refreshPromise ??= refreshAccessToken()
        const newAccessToken = await refreshPromise
        refreshPromise = null
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        refreshPromise = null
        clearTokens()
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)
```
Bu, TOKEN YENİLƏMƏ (refresh) MƏNTİQİDİR — addım-addım:
1. Hər hansı sorğu **401** (icazə yoxdur) qaytarsa VƏ bu sorğu ARTIQ BİR DƏFƏ TƏKRARLANMAYIBSA (`!originalRequest._retry`) — `_retry = true` qoyulur (SONSUZ dövrün QARŞISINI ALMAQ üçün: refresh ÖZÜ DƏ 401 qaytarsa, İKİNCİ dəfə TƏKRAR CƏHD EDİLMİR).
2. `refreshPromise ??= refreshAccessToken()` — **BU SƏTIR ÇOX VACİBDİR.** Əgər İKİ sorğu EYNİ ANDA 401 alsa (məsələn səhifə açılanda basket VƏ favorites EYNİ VAXTDA çağırılırsa), İKİSİ DƏ BURAYA GƏLİR — AMMA `??=` (nullish assignment) sayəsində YALNIZ BİRİNCİSİ `refreshAccessToken()`-i HƏQİQƏTƏN ÇAĞIRIR, İKİNCİSİ isə HƏMİN EYNİ Promise-i "gözləyir". Bu OLMASAYDI, İKİ AYRI refresh sorğusu backend-ə GEDƏRDİ — bir yarışın (race condition) İKİ FƏRQLİ yeni refresh token QAYTARMASI RİSKİ olardı.
3. Uğurlu refresh-dən sonra ORİJİNAL sorğu YENİ token İLƏ TƏKRARLANIR (`axiosInstance(originalRequest)`).
4. Refresh ÖZÜ DƏ uğursuz olsa (refresh token DA bitibsə) — `clearTokens()` çağırılır (istifadəçi FAKTİKİ OLARAQ "çıxış edilmiş" olur).

```ts
const httpClient = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.get<T>(url, config).then((res) => res.data)
  },
  post<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return axiosInstance.post<T>(url, body, config).then((res) => res.data)
  },
  ...
}
export default httpClient
```
Hər metod `.then((res) => res.data)` edir — YƏNİ ÇAĞIRAN TƏRƏF axios-un ÖZ CAVAB OBYEKTİNİ (`res.status`, `res.headers` və s.) HEÇ VAXT GÖRMÜR, birbaşa backend-in CAVAB BODY-sini alır. Bu, `productService.list()` kimi çağırışların NİYƏ birbaşa `ApiResponse<T>` qaytardığının SƏBƏBİDİR.

### `src/services/Auth/auth.service.ts`

```ts
export const authService = {
  login(payload: LoginPayload) {
    return httpClient.post<ApiResponse<AuthResponseData>>("/auth/login", payload);
  },
  signup(payload: SignupPayload) {
    return httpClient.post<ApiResponse<null>>("/auth/signup", payload);
  },
  refresh(refresh_token: string) {
    return httpClient.post<ApiResponse<AuthTokens>>("/auth/refresh", { refresh_token });
  },
};
```
`login`/`signup`-un `LoginPayload`/`SignupPayload` növü, `refresh(refresh_token)` isə ADİ bir string PARAMETR ALIR (obyekt DEYİL) — çünki YALNIZ BİR sahə lazımdır.

### `LoginForm.tsx`-də token axını

```tsx
const onSubmit = form.handleSubmit(async (values) => {
    onError('')
    try {
        const res = await authService.login(values)
        setTokens(res.data.tokens.access_token, res.data.tokens.refresh_token)
        toast.success('Uğurla daxil oldunuz')
        onSuccess()
        router.push('/')
    } catch {
        onError('Telefon nömrəsi və ya şifrə yanlışdır.')
    }
})
```
1. İstifadəçi formu göndərir.
2. `authService.login(values)` — backend-ə sorğu.
3. `setTokens(...)` — `localStorage`-a YAZILIR.
4. Bundan sonra `httpClient.ts`-in interceptor-u HƏR sorğuya AVTOMATİK bu token-i əlavə edir.

### `Header`-in "Çıxış" düyməsi (`NavLinks.tsx`)

```tsx
const handleConfirmLogout = () => {
    clearTokens()
    queryClient.clear()
    setConfirmLogoutOpen(false)
    toast.success('Hesabdan uğurla çıxdınız')
    router.push('/')
}
```
`queryClient.clear()` — BÜTÜN cache-lənmiş şəxsi datanı (profil, səbət, sevimlilər) SİLİR ki, KEÇMİŞ istifadəçinin datası BİR ANLIQ da olsa GÖRÜNMƏSİN (növbəti istifadəçi EYNİ brauzerdə giriş edərsə).

---

## Hissə 10: SSR və "servis hesabı"

Bu, layihənin ən "ağıllı" hissəsidir — Hissə 1-də qeyd olunan problemi həll edir: backend-də AÇIQ/qonaq `/categories`, `/products` endpoint-i yoxdur, amma bu sayt onları login olmadan da göstərmək istəyir.

### `src/services/serviceAccount/index.ts` — tam kod, sətir-sətir

```ts
import 'server-only'
import { cache } from 'react'
import axios from 'axios'
```
`import 'server-only'` — bu paketin ÖZÜ heç bir funksiya EXPORT ETMİR, sadəcə "yan təsiri" var: əgər bu fayl SƏHVƏN bir Client Component-dən (`'use client'`) import olunmağa cəhd etsə, **build zamanı XƏTA** verir. Bu, `SERVICE_ACCOUNT_PASSWORD` kimi MƏXFİ məlumatın TƏSADÜFƏN brauzer bundle-ına düşməsinin QARŞISINI ALAN bir TƏHLÜKƏSİZLİK ŞƏBƏKƏSİDİR.

```ts
let session: CachedSession | null = null

function decodeExpiryMs(jwt: string): number {
  const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString('utf-8')) as { exp: number }
  return payload.exp * 1000
}
```
`session` — MODUL-SƏVİYYƏLİ dəyişən (funksiya DAXİLİNDƏ DEYİL, faylın ÖZÜNDƏ). Bu, Node.js-in modul sistemi sayəsində, server prosesi YAŞADIQCA YADDAŞDA QALIR — HƏR YENİ sorğu, EYNİ `session` dəyişəninə MÜRACİƏT EDİR (fərqli ziyarətçilərin sorğuları BELƏ). `decodeExpiryMs` — JWT (JSON Web Token) formatının ÖZÜNÜ ƏL İLƏ PARSE EDİR: JWT `header.payload.signature` formasındadır (nöqtə İLƏ AYRILMIŞ 3 hissə), `payload` hissəsi base64-lə KODLANMIŞ bir JSON-dur, İÇİNDƏ `exp` (expiry — bitmə vaxtı, Unix saniyə) sahəsi var.

```ts
async function loginServiceAccount(): Promise<CachedSession> {
  const phone = process.env.SERVICE_ACCOUNT_PHONE
  const password = process.env.SERVICE_ACCOUNT_PASSWORD
  if (!phone || !password) {
    throw new Error('SERVICE_ACCOUNT_PHONE / SERVICE_ACCOUNT_PASSWORD env vars are not set')
  }
  const { data } = await axios.post<ApiResponse<AuthResponseData>>(`${BASE_URL}/auth/login`, { phone, password })
  return toSession(data.data.tokens)
}
```
`SERVICE_ACCOUNT_PHONE`/`SERVICE_ACCOUNT_PASSWORD` — `NEXT_PUBLIC_` PREFİKSİ YOXDUR, deməli Next.js bunları BRAUZER BUNDLE-INA HEÇ QATMIR (yalnız `NEXT_PUBLIC_`-lə başlayanlar client-ə göndərilir) — YALNIZ server prosesi bunları OXUYA BİLİR.

```ts
async function getServiceAccessToken(forceRelogin = false): Promise<string> {
  const now = Date.now()

  if (!forceRelogin && session && session.accessExpiresAt - now > 60_000) {
    return session.accessToken
  }

  if (!forceRelogin && session) {
    try {
      session = await refreshServiceAccount(session.refreshToken)
      return session.accessToken
    } catch {
      // refresh_token itself has expired too — fall through to a full re-login below
    }
  }

  session = await loginServiceAccount()
  return session.accessToken
}
```
Bu funksiya 3 SƏVİYYƏLİ bir "özü-özünü sağaldan" (self-healing) MƏNTİQDİR:
1. **Cache HIT** — `session` VAR VƏ hələ EN AZI 1 dəqiqə (`60_000` ms) vaxtı QALIB → mövcud token-i QAYTAR, HEÇ BİR sorğu GETMİR.
2. **Refresh** — `session` VAR AMMA VAXTI BİTMƏK ÜZRƏDİR → `refreshToken`-lə YENİ access token AL.
3. **Tam yenidən login** — YA `session` HEÇ YOXDUR (ilk çağırış), YA DA refresh ÖZÜ DƏ UĞURSUZ oldu (refresh token DA BİTİB) → TAM YENİDƏN login OL.

```ts
export const serviceGet = cache(async function serviceGet<T>(path: string): Promise<T> {
  const token = await getServiceAccessToken()
  try {
    const { data } = await axios.get<T>(`${BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}`, 'Accept-Language': 'az' },
    })
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const retryToken = await getServiceAccessToken(true)
      const { data } = await axios.get<T>(`${BASE_URL}${path}`, {
        headers: { Authorization: `Bearer ${retryToken}`, 'Accept-Language': 'az' },
      })
      return data
    }
    throw error
  }
})
```
`serviceGet<T>(path)` — komponentlərin çağırdığı YEGANƏ funksiya. `cache()` İLƏ SARILIB (React-in ÖZ funksiyası, Hissə 4) — EYNİ `path`-in EYNİ RENDER-PASS-I DAXİLİNDƏ TƏKRAR ÇAĞIRILMASI, İKİNCİ dəfə ŞƏBƏKƏYƏ GETMİR, YADDAŞDAN QAYTARILIR. İçəridəki `try/catch` isə AYRI bir problem HƏLL EDİR: token, `getServiceAccessToken()`-in DÜŞÜNDÜYÜNDƏN DAHA TEZ ETİBARSIZLAŞA BİLƏR (backend TƏRƏFDƏ LEĞV OLUNMA VƏ S.) — 401 alınsa, `forceRelogin=true` İLƏ BİR DƏFƏ DAHA CƏHD EDİLİR.

### Bunun MƏNTİQİ nəticəsi

`/categories`, `/products` VƏ onların detal səhifələri — bu data HƏR ziyarətçi üçün EYNİDİR (servis hesabının "GÖRÜŞÜ"dür, real ziyarətçinin YOX). Buna görə:
- `RequireAuth`-a EHTİYAC YOXDUR (anonim ziyarətçi DƏ görə bilər).
- `revalidate = 300` TƏHLÜKƏSİZDİR (ISR cache).
- AMMA "şəxsi" hissələr (səbətdəki miqdar, sevimli ürəyi doldurulubmu) BU YOLLA GƏLMİR — onlar HƏLƏ DƏ ziyarətçinin ÖZ `useBasket()`/`useFavorites()` hook-larından gəlir.
- Səbətə əlavə et / ürəyə klikləmək kimi hərəkətlər anonim ziyarətçi üçün SƏSSİZCƏ uğursuz OLMUR — `useBasketMutations`/`useToggleFavorite` əvvəlcə `getAccessToken()`-i yoxlayır, token yoxdursa `/login`-ə yönləndirir (bax Hissə 12).

---

## Hissə 11: API qatı

`src/services/` — hər domain üçün bir fayl, hamısı `httpClient.ts` üzərindən keçir (`serviceAccount.ts` İSTİSNADIR — o, ÖZ `axios` instansiyasını işlədir, bax Hissə 10). `src/services/index.ts` — hamısını yenidən export edən barrel.

### `Basket/basket.service.ts`

```ts
export const basketService = {
  list() {
    return httpClient.get<ApiResponse<Basket>>('/basket')
  },
  add(productId: number) {
    return httpClient.post<ApiResponse<Basket>>(`/basket/${productId}/add`)
  },
  remove(productId: number) {
    return httpClient.post<ApiResponse<Basket>>(`/basket/${productId}/remove`)
  },
  removeAll(productId: number) {
    return httpClient.delete<ApiResponse<Basket>>(`/basket/${productId}/remove-all`)
  },
  clear() {
    return httpClient.delete<ApiResponse<Basket>>('/basket/clear')
  },
}
```
Diqqət: `add`/`remove` HTTP metod olaraq `POST` işlədir (miqdarı 1 vahid ARTIRIR/AZALDIR), `removeAll`/`clear` isə `DELETE` (tam SİLMƏ əməliyyatı). Bu, REST konvensiyasının "hər `POST/PUT/DELETE`-in mənası HƏMİŞƏ CRUD-a UYĞUNDUR" qaydasından bir qədər AZAD davranır — backend-in ÖZ API dizaynına UYĞUNLAŞMAQ üçün (bu, `service` faylının VƏZİFƏSİDİR: backend-in QƏRİBƏLİKLƏRİNİ BURADA "udmaq", çağıran koda TƏMİZ bir interfeys VERMƏK).

### `Product/product.service.ts`

```ts
export const productService = {
  list(params?: ListQueryParams) {
    return httpClient.get<PaginatedResponse<Product>>('/products', { params })
  },
  getById(id: number) {
    return httpClient.get<ApiResponse<Product>>(`/products/${id}`)
  },
  favorites() {
    return httpClient.get<ApiResponse<Product[]>>('/products/favorites')
  },
  toggleFavorite(id: number) {
    return httpClient.post<ApiResponse<null>>(`/products/${id}/favorite`)
  },
}
```
`toggleFavorite` — TƏK bir endpoint HƏM ƏLAVƏ ETMƏ, HƏM DƏ SİLMƏ üçün işlədilir (backend "artıq varsa sil, yoxdursa əlavə et" MƏNTİQİNİ ÖZÜ İDARƏ EDİR) — bu SƏBƏBDƏNDİR ki, `useToggleFavorite` (Hissə 12) cavabın `message`-inə BAXARAQ "əlavə edildi" YA "silindi" TOASTUNU seçir, ÇAĞIRAN TƏRƏF ÖNCƏDƏN BİLMİR.

### `Order/order.service.ts`

```ts
export const orderService = {
  checkout(payload: CheckoutPayload) {
    return httpClient.post<ApiResponse<Order>>('/orders/checkout', payload)
  },
  list() {
    return httpClient.get<ApiResponse<Order[]>>('/orders/user')
  },
  getById(id: number) {
    return httpClient.get<Order>(`/orders/user/${id}`)   // XAM — ZƏRFSİZ!
  },
}
```
**Cavab zərfi (envelope) məsələsi — ən vacib "tələ":** Çoxu endpoint cavabı `{ message, data, result }` formasında "zərfləyir" — AMMA `GET /orders/user/:id` **XAM (unwrapped)** `Order` obyektini QAYTARIR, zərfsiz — `web.md` isə onu SİYAHI ENDPOINT-İ KİMİ ZƏRFLƏNMİŞ göstərir (SƏHVDİR). Bu, canlı API-yə birbaşa `curl` ilə vurmaqla TƏSDİQLƏNİB, sənədə güvənməklə YOX. `getById`-in geri qaytardığı tipin `Order` (`ApiResponse<Order>` YOX) olması BUNU əks etdirir.

Bunu səhv yazsanız, TypeScript XƏTA VERMİR (axios generic-i bunu tuta bilmir) — sadəcə səssizcə boş render olur və ya `orders.map is not a function` kimi runtime xətası çıxır. `useOrder(id)` hook-u (Hissə 12) bunu belə istifadə edir: `queryFn: () => orderService.getById(orderId)` — `.then((res) => res.data)` YOXDUR, çünki artıq XAM data qayıdır.

### `Profile/profile.service.ts`

```ts
export const profileService = {
  get() {
    return httpClient.get<ApiResponse<User>>('/profile')
  },
  update(payload: UpdateProfilePayload) {
    return httpClient.put<ApiResponse<User>>('/profile', payload)
  },
}
```
`update` HƏQİQİ bir `PUT`-dur — YALNIZ DƏYİŞDİRİLƏN sahələri GÖNDƏRMƏK KİFAYƏT ETMİR, DİGƏR sahələr İTİR (bax Hissə 16, `AccountPage`-in avatar yükləmə axını — bu, layihədə BİR DƏFƏ real BUG kimi TƏSDİQLƏNİB VƏ DÜZƏLDİLİB).

### `Campaign/campaign.service.ts`

```ts
export const campaignService = {
  list() {
    return httpClient.get<ApiResponse<Campaign[]>>('/campaigns')
  },
}
```
`/campaigns` — YEGANƏ HƏQİQƏTƏN AÇIQ (login TƏLƏB ETMƏYƏN) endpoint. Buna görə `HomePage` bunu `serviceAccount.ts`-in `serviceGet`-i ÜZƏRİNDƏN YOX, birbaşa `campaignService.list()` İLƏ çəkir (servis hesabına EHTİYAC yoxdur, artıq açıqdır).

### `Upload/upload.service.ts`

```ts
export const uploadService = {
  upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return httpClient.post<ApiResponse<UploadResponseData>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
```
`FormData` — brauzerin ÖZ API-si, fayl YÜKLƏMƏ sorğuları üçün. `Content-Type: multipart/form-data` ADƏTƏN AXIOS TƏRƏFİNDƏN AVTOMATİK TƏYİN OLUNUR (FormData ÖTÜRÜLƏNDƏ), amma bura AÇIQ YAZILIB — HANSI SƏBƏBDƏNSƏ AVTOMATİK AŞKARLAMA İŞLƏMƏSƏ, EHTİYAT VARİANT kimi.

### `Stats/stats.service.ts` — hazır olmayan bir TODO

```ts
// TODO: statsService — "Bizim gostericiler" bolmesi ucun API servisi
// Backend hazir olanda endpoint-i bura elave et.
export const statsService = {}
```
Bu fayl QƏSDƏN BOŞ — `StatsSection.tsx` (Hissə 16) HAZIRDA HARDCODE rəqəmlər GÖSTƏRİR, çünki backend-də hələ ki statistika ENDPOINT-İ YOXDUR. **Bunu "düzəltmə" cəhdi ETMƏYİN** — bu, layihənin "Known intentional gaps" siyahısında AÇIQ QEYD OLUNMUŞ bir MƏHDUDIYYƏTDİR.

### `src/services/index.ts` — barrel

```ts
export { default as httpClient } from "./httpClient";
export * from "./Auth/auth.service";
export * from "./Profile/profile.service";
export * from "./Product/product.service";
export * from "./Campaign/campaign.service";
export * from "./Basket/basket.service";
export * from "./Order/order.service";
export * from "./Upload/upload.service";
```
Diqqət: `httpClient`-in export FORMASI DİGƏRLƏRİNDƏN FƏRQLİDİR (`export { default as httpClient }`, `export *` YOX) — çünki `httpClient/index.ts` ÖZÜ `export default httpClient` yazır (BİR DƏNƏ default export), digər servis fayları isə `export const xService = {...}` (adlı export) yazır. `serviceAccount`-un ÖZÜ bu barrel-də YOXDUR — ÇÜNKİ `server-only` olduğu üçün, EGƏR bura ƏLAVƏ EDİLSƏ, bu barrel-i import edən İSTƏNİLƏN Client Component build XƏTASI VERƏRDİ (bax Hissə 10-un `server-only` izahı).

### Sənədlə (`web.md`) real davranış arasında fərqlər

- `GET /products?category_id=` sənəddə var, AMMA real backend-də 400 qaytarır ("(disabled)" işarəli sətirlər HƏQİQƏTƏN deaktivdir, "opsional" DEYİL) — ona görə kateqoriyaya görə filtrasiya CLIENT-SIDE (daha DOĞRUSU, SERVER COMPONENT-İN İÇİNDƏ, `product.category.id`-ə görə) edilir, bax `src/app/categories/[id]/page.tsx`.
- `User.email` sənəddə HEÇ yoxdur, amma real API-dən gəlir.
- `GET /orders/user/:id` ZƏRFSİZ qaytarır, sənəd isə ZƏRFLƏNMİŞ göstərir.

**Dərs:** yeni bir endpoint bağlayanda, sənədə güvənmədən əvvəl real API-yə sınaq sorğusu göndərin — `curl`/brauzer console-u ilə.

---

## Hissə 12: Data fetching

`src/shared/hooks/` — hər fayl bir data domain-i: `useBasket.ts`, `useFavorites.ts`, `useProfile.ts`, `useProducts.ts`, `useOrders.ts`. Bunlardan başqa, data-siz "utility" hook-lar da var: `useHasMounted`, `useIsomorphicLayoutEffect`, `useCardCarousel`, `useAuthSync` (bax Hissə 14).

### `useBasket.ts` — ən tam nümunə, tam kod

```ts
export const basketQueryKey = ['basket']

export function useBasket() {
    return useQuery({
        queryKey: basketQueryKey,
        queryFn: () => basketService.list().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useBasketMutations() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const invalidate = () => queryClient.invalidateQueries({ queryKey: basketQueryKey })

    const requireAuth = () => {
        if (getAccessToken()) return true
        router.push('/login')
        return false
    }

    const add = useMutation({
        mutationFn: (productId: number) => {
            if (!requireAuth()) return Promise.reject(new Error('AUTH_REQUIRED'))
            return basketService.add(productId)
        },
        onMutate: (productId: number) => {
            const basket = queryClient.getQueryData<Basket>(basketQueryKey)
            const alreadyInBasket = basket?.items.some((item) => item.product.id === productId) ?? false
            return { alreadyInBasket }
        },
        onSuccess: (_data, _productId, context) => {
            invalidate()
            toast.success(context?.alreadyInBasket ? 'Məhsulun sayı artırıldı' : 'Məhsul səbətə əlavə edildi')
        },
    })
    // remove, removeAll, clear — EYNİ ŞƏKİLDƏ, requireAuth() + invalidate() + öz toast mesajı

    return { add, remove, removeAll, clear }
}
```
Sətir-sətir izah:
- `queryKey = ['basket']` — TanStack Query-nin bu datanı CACHE-də TANIDIĞI "açar". Eyni `queryKey`-i işlədən İKİ ayrı komponent (məs. `Header` və `BasketSidebarPanel`) EYNİ cache girişini paylaşır — biri yeniləyəndə O BİRİ də AVTOMATİK yenilənir.
- `enabled: !!getAccessToken()` — anonim ziyarətçidə sorğu heç GETMİR (401 almağa çalışmır). `!!` — dəyəri ZORLA `boolean`-a çevirir (`string | null` → `true`/`false`).
- `requireAuth()` — BÜTÜN mutasiyaların BAŞINDA ÇAĞIRILAN ORTAQ QAPI: token yoxdursa `/login`-ə YÖNLƏNDİR, `false` QAYTAR (mutasiya `AUTH_REQUIRED` xətası İLƏ REJECT olunur — beləliklə TanStack Query BUNU "uğursuz mutasiya" kimi QEYDƏ ALIR, AMMA HEÇ BİR generic error toast GÖSTƏRİLMİR, çünki artıq YÖNLƏNDİRMƏ baş verib).
- `onMutate` — mutasiya BAŞLAMAZDAN ƏVVƏL işə düşür, `add.mutate()` ÇAĞIRILAN ANDA CARİ cache-i YOXLAYIR (`alreadyInBasket`) — bu, "optimistic" DEYİL (data DƏYİŞDİRİLMİR, sadəcə OXUNUR), sadəcə `onSuccess`-ə "bu MƏHSUL ARTIQ SƏBƏTDƏ İDİMİ" məlumatını ÖTÜRMƏK üçün.
- `onSuccess(_data, _productId, context)` — `context` = `onMutate`-in QAYTARDIĞI OBYEKT. Bununla "əlavə edildi" ("yeni MƏHSUL") vs "sayı ARTIRILDI" (ARTIQ SƏBƏTDƏ olan MƏHSULUN MİQDARI) MESAJLARI FƏRQLƏNDİRİLİR.
- `invalidate()` — TanStack Query-yə "bu QUERY-nin datası ARTIQ KÖHNƏLİB, YENİDƏN ÇƏK" DEYİR. Sonrakı `useBasket()` ÇAĞIRIŞI (istənilən komponentdə) AVTOMATİK YENİ datanı ALACAQ.

### `useFavorites.ts`

```ts
export const favoritesQueryKey = ['favorites']

export function useFavorites() {
    return useQuery({
        queryKey: favoritesQueryKey,
        queryFn: () => productService.favorites().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useToggleFavorite() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (productId: number) => {
            if (!getAccessToken()) {
                router.push('/login')
                return Promise.reject(new Error('AUTH_REQUIRED'))
            }
            return productService.toggleFavorite(productId)
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: favoritesQueryKey })
            const wasAdded = res.message.toLowerCase().includes('added')
            toast.success(wasAdded ? 'Seçilmişlərə əlavə edildi' : 'Seçilmişlərdən silindi')
        },
    })
}
```
`res.message.toLowerCase().includes('added')` — backend-in QAYTARDIĞI TƏSVİRİ MESAJIN (`message` sahəsi) İÇİNDƏ "added" SÖZÜNÜN OLUB-OLMADIĞINA BAXARAQ, HANSI HƏRƏKƏTİN BAŞ VERDİYİNİ ANLAYIR — bu, backend "toggle" endpoint-inin `data`-sının `null` OLDUĞU (bax `product.service.ts`) üçün YEGANƏ SİQNALDIR.

### `useOrders.ts`

```ts
export const ordersQueryKey = ['orders']

export function useOrders() {
    return useQuery({
        queryKey: ordersQueryKey,
        queryFn: () => orderService.list().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useOrder(orderId: number) {
    return useQuery({
        queryKey: [...ordersQueryKey, orderId],
        queryFn: () => orderService.getById(orderId),   // .then((res) => res.data) YOX — XAM qayıdır!
        enabled: !!getAccessToken() && !!orderId,
    })
}
```
`queryKey: [...ordersQueryKey, orderId]` — `['orders', 5]` kimi bir MASSIV YARADIR. Bu, `['orders']` (siyahı) İLƏ `['orders', 5]` (TƏK sifariş) İKİSİNİN AYRI-AYRI CACHE GİRİŞLƏRİ olmasını TƏMİN EDİR. `useOrder`-in `queryFn`-i `.then((res) => res.data)` İŞLƏTMİR — çünki `orderService.getById` ARTIQ XAM `Order` QAYTARIR (bax Hissə 11).

### `useProfile.ts` (`useUpdateProfile`) — auth guard-lı mutasiya nümunəsi

```ts
export const profileQueryKey = ['profile']

export function useProfile() {
    return useQuery({
        queryKey: profileQueryKey,
        queryFn: () => profileService.get().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useUpdateProfile() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) => {
            if (!getAccessToken()) {
                router.push('/login')
                return Promise.reject(new Error('AUTH_REQUIRED'))
            }
            return profileService.update(payload).then((res) => res.data)
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData(profileQueryKey, data)
            toast.success('img_url' in variables ? 'Profil şəkli yeniləndi' : 'Məlumatlarınız yeniləndi')
        },
        onError: (error, variables) => {
            if (error.message === 'AUTH_REQUIRED') return
            toast.error('img_url' in variables ? 'Şəkil yüklənmədi, yenidən cəhd edin' : 'Məlumatlar yenilənmədi, yenidən cəhd edin')
        },
    })
}
```
`queryClient.setQueryData(profileQueryKey, data)` — `invalidateQueries` (YENİDƏN ÇƏK) DEYİL, BİRBAŞA CACHE-Ə YAZ. Fərq: `PUT /profile`-in ÖZ CAVABI ARTIQ YENİLƏNMİŞ `User` OBYEKTİNİ QAYTARIR — YENİDƏN AYRI BİR `GET /profile` ÇAĞIRMAĞA EHTİYAC YOXDUR, CAVABI BİRBAŞA CACHE-Ə YAZMAQ BİR ŞƏBƏKƏ SORĞUSU QƏNAƏT EDİR. `'img_url' in variables` — hansı SAHƏLƏRİN GÖNDƏRİLDİYİNƏ BAXARAQ (avatar YÜKLƏMƏSİ VS FORM SUBMİT-İ), FƏRQLİ TOAST MESAJI SEÇİLİR.

### `useProducts.ts` — `useProducts` VƏ `useProduct` (SSR körpüsü)

```ts
export const productsQueryKey = ['products']

export function useProducts(enabled = true) {
    return useQuery({
        queryKey: productsQueryKey,
        queryFn: () => productService.list().then((res) => res.data),
        enabled: enabled && !!getAccessToken(),
    })
}

export function useProduct(productId: number, initialProduct?: Product | null) {
    return useQuery({
        queryKey: [...productsQueryKey, productId],
        queryFn: () => productService.getById(productId).then((res) => res.data),
        initialData: initialProduct ?? undefined,
        enabled: !!getAccessToken(),
    })
}
```
`useProducts(enabled = true)` — İKİNCİ, ADDİTİV bir `enabled` PARAMETRİ ƏLAVƏ EDİR (defolt tokendə YOXLAMANIN ÜSTÜNƏ). `SearchBar.tsx` bunu `useProducts(isSearchOpen)` kimi ÇAĞIRIR — YƏNİ AXTARIŞ QUTUSU AÇILMAYINCA, BÜTÜN MƏHSUL KATALOQU HEÇ ÇƏKİLMİR (performans OPTİMİZASİYASI — HƏR `Header` MOUNT-UNDA/ROUTE DƏYİŞİKLİYİNDƏ TƏSADÜFƏN TAM KATALOQ ÇƏKİLMƏSİN DEYƏ).

`useProduct(id, initialProduct)` — `initialData` OPSİYASI, SERVER-DƏ ARTIQ ÇƏKİLMİŞ DATANI (bax Hissə 10) BAŞLANĞIC DƏYƏR kimi CACHE-Ə "TOXUMLAYIR" — beləliklə HEÇ BİR YÜKLƏNMƏ GÖSTƏRİCİSİ (spinner) OLMUR, VƏ QLOBAL `staleTime: 30_000` (Hissə 7) SAYƏSİNDƏ TƏKRAR CLIENT SORĞUSU DA GETMİR (ilk 30 SANİYƏ ƏRZİNDƏ).

### Render zamanı state tənzimləmək (useEffect ƏVƏZİNƏ)

```tsx
// AccountPage/index.tsx-dən
if (profile && profile.img_url !== lastSyncedImgUrl) {
  setLastSyncedImgUrl(profile.img_url)
  setAvatarPreview(profile.img_url)
}
```
```tsx
// SearchBar.tsx-dən — EYNİ PATTERN
if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setQuery('')
    setIsSearchOpen(false)
}
```
Bu, funksiyanın GÖVDƏSİNDƏ (useEffect DAXİLİNDƏ YOX) yazılıb — React bunu RƏSMİ olaraq dəstəkləyir, çünki commit-dən ƏVVƏL YENİDƏN RENDER EDİR (yəni sonsuz dövr YARANMIR — React bu pattern-i XÜSUSİ TANIYIR). Layihənin ESLint qaydası (`react-hooks/set-state-in-effect`) sırf "prop-dan/query nəticəsindən state-i sinxronlaşdırmaq" üçün `useEffect` işlətməyi BLOKLAYIR — bu, onun RƏSMİ ƏVƏZEDİCİSİDİR. **Diqqət:** BU PATTERN sırf "X dəyişəndə Y-i SIFIRLA/SİNXRONLAŞDIR" ÜÇÜNDÜR — ÜMUMİ "yan təsir" (DOM-a birbaşa toxunmaq, timer QURMAQ, subscription AÇMAQ) HƏLƏ DƏ `useEffect` TƏLƏB EDİR.

### `useHasMounted()` — hidration təhlükəsizliyi (ən vacib hook)

```ts
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])
  return hasMounted
}
```
İSTİFADƏ NÜMUNƏSİ (`CategoryProductCard`-dan):
```tsx
const hasMounted = useHasMounted()
const { data: basket } = useBasket()
const { data: favorites } = useFavorites()

const quantity = hasMounted ? (basket?.items.find((item) => item.product.id === product.id)?.quantity ?? 0) : 0
const isFavorite = hasMounted
    ? (favorites?.some((favorite) => favorite.id === product.id) ?? product.is_favorite ?? false)
    : false
```
**Niyə lazımdır, ADDIM-ADDIM:**
1. Server HEÇ VAXT ziyarətçinin TOKEN-İNİ BİLMİR (`getAccessToken()` serverdə HƏMİŞƏ `null`, bax Hissə 9) — deməli server HƏMİŞƏ "HEÇ NƏ YOXDUR" (`quantity = 0`, `isFavorite = false`) RENDER EDİR.
2. Client tərəfdə isə, HİDRASİYADAN ƏVVƏL, TanStack Query CACHE-Də ARTIQ DATA OLA BİLƏR (məs. `Header` bir az ƏVVƏL `useBasket()`-i ÇƏKİB, CACHE-Ə YAZIB — İNDİ EYNİ SƏHİFƏDƏ `CategoryProductCard`-IN İLK RENDER-İ BU CACHE-Dən İSTİFADƏ EDƏ BİLƏR).
3. Bu FƏRQ (server: "heç nə yox", client-in İLK render-i: "artıq VAR") React-in "hidration" PROSESİNİ POZUR — React BU FƏRQİ AŞKARLAYANDA, DOM-UN O HİSSƏSİNİ SİLİB YENİDƏN QURUR (hydration MISMATCH), NƏTİCƏ vizual KORRUPSIYA (bir anlıq YANLIŞ görünüş, sonra "sıçrayış").
4. Həll: İLK render-i HƏMİŞƏ server-in "heç nə yoxdur" VƏZİYYƏTİ İLƏ EYNİ ET (`hasMounted === false` → `quantity = 0`), SONRA normal POST-HYDRATION RE-RENDER-DƏ (`useEffect`-in `setHasMounted(true)` ÇAĞIRIŞINDAN SONRA) ƏSL DƏYƏR GÖRÜNSÜN.

Bu hook, SSR'lənə bilən İSTƏNİLƏN səhifədə, ziyarətçinin ÖZ TOKEN-İNƏ ƏSASLANAN İSTƏNİLƏN datanı OXUYAN komponentdə TƏTBİQ OLUNUR: `CategoryProductCard`, `ProductDetailContent`, `BasketSidebarPanel`, `Header`-in `NavLinks`/`AddressBadge`-i.

### `src/shared/utils/` — React-siz köməkçi fayllar (tam kod)

Bu qovluqdakı HƏR FAYL sadə, React-SİZ (heç bir hook, heç bir JSX) funksiyalardır — testı ASAN, İSTƏNİLƏN KOMPONENTDƏN ÇAĞIRILA BİLƏN.

```ts
// pagination.ts — bütün paginasiya edən səhifələrin (ProductsGrid, FavoritesGrid, OrdersPage) ORTAQ məntiqi
export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
}

export function getTotalPages(totalItems: number, pageSize: number): number {
    return Math.max(1, Math.ceil(totalItems / pageSize))
}
```
`paginate` — BACKEND-İN ÖZÜ SƏHİFƏLƏMƏ DƏSTƏKLƏMİR/YA DA layihə ARTIQ TAM SİYAHINI SERVİS HESABI İLƏ ÇƏKDİYİ ÜÇÜN, SƏHİFƏLƏMƏ CLIENT-SIDE (BROWSER-DA, ARTIQ ÇƏKİLMİŞ MASSİV ÜZƏRİNDƏ) EDİLİR — `items.slice(start, start + pageSize)`. `getTotalPages`-DƏ `Math.max(1, ...)` — MƏHSUL/SİFARİŞ SAYI 0 OLANDA BELƏ, ƏN AZI 1 SƏHİFƏ QAYTARIR (MƏNFİ/0 SƏHİFƏ SAYI MƏNASIZDIR).

```ts
// date.ts
export function formatDate(input: string | Date) {
    const date = typeof input === 'string' ? new Date(input) : input
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}.${month}.${date.getFullYear()}`
}

export function formatDateTime(iso: string) {
    const date = new Date(iso)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${formatDate(date)} ${hours}:${minutes}`
}
```
`padStart(2, '0')` — TƏK RƏQƏMLİ GÜN/AY/SAAT/DƏQİQƏNİN ÖNÜNƏ "0" ƏLAVƏ EDİR (`5` → `"05"`) — `05.03.2026` FORMATI ÜÇÜN. `formatDateTime` `formatDate`-İ ÖZÜ ÇAĞIRIR (KODU TƏKRARLAMIR), ÜSTÜNƏ SAAT:DƏQİQƏ ƏLAVƏ EDİR. **Tarixçə:** BU FAYL, ƏVVƏLLƏR İKİ AYRI YERDƏ (`OrdersPage/utils.ts`, `OrderDetailSection/utils.ts`) TƏKRARLANMIŞ EYNİ FUNKSİYALARIN BİRLƏŞDİRİLMƏSİNDƏN YARANIB (LAYİHƏ AUDİTİNİN NƏTİCƏSİ).

```ts
// orderStatus.ts
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'Gözləmədə',
    [OrderStatus.CONFIRMED]: 'Təsdiqləndi',
    [OrderStatus.PREPARING]: 'Hazırlanır',
    [OrderStatus.READY]: 'Hazırdır',
    [OrderStatus.DELIVERED]: 'Tamamlandı',
    [OrderStatus.CANCELLED]: 'Ləğv edildi',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'text-neutral-500',
    [OrderStatus.CONFIRMED]: 'text-blue-600',
    ...
    [OrderStatus.DELIVERED]: 'text-emerald',
    [OrderStatus.CANCELLED]: 'text-red-500',
}
```
`[OrderStatus.PENDING]: '...'` — KVADRAT MÖTƏRİZƏLİ AÇAR SİNTAKSİSİ ("COMPUTED PROPERTY NAME"): `OrderStatus.PENDING`-İN DƏYƏRİNİ (`'pending'` STRING-İ) OBYEKTİN AÇARI KİMİ İŞLƏDİR. `Record<OrderStatus, string>` TİPİ (bax Hissə 3) SAYƏSİNDƏ, ƏGƏR `OrderStatus`-A YENİ BİR ÜZV ƏLAVƏ OLUNSA, AMMA BU İKİ MAP-Ə UYĞUN SƏTİR ƏLAVƏ EDİLMƏSƏ, TypeScript DƏRHAL XƏTA VERƏCƏK — "UNUDULMUŞ STATUS" MÜMKÜN DEYİL. `OrdersTable`, `OrderInfoGrid` HƏR İKİSİ BU İKİ MAP-DƏN İSTİFADƏ EDİR (statusu RƏNGLİ MƏTN KİMİ GÖSTƏRMƏK ÜÇÜN).

### `src/shared/constants/images.ts`

```ts
export const PRODUCT_IMAGE_FALLBACK =
    'https://www.shutterstock.com/image-vector/mystery-contest-cardboard-box-question-260nw-2472419999.jpg'
```
API-dan gələn MƏHSULUN `img_url`-U `null`/BOŞ OLA BİLƏR — HƏR YERDƏ (`CategoryProductCard`, `ProductImage`, `BasketItemRow`, `SearchBar`-IN NƏTİCƏLƏRİ, `OrderItemsList`) BU KONSTANTA `src={product.img_url || PRODUCT_IMAGE_FALLBACK}` ŞƏKLİNDƏ İSTİFADƏ OLUNUR. Bu HOST (`www.shutterstock.com`) `next.config.ts`-in `remotePatterns` SİYAHISINDA DA VAR (bax Hissə 19) — BAXMAYARAQ Kİ, BU KONSTANTANI İŞLƏDƏN HƏR YER ADİ `<img>` İŞLƏDİR (`next/image` YOX) — SİYAHIDA OLMASI SADƏCƏ SƏNƏDLƏŞDİRMƏ/ARDICILLIQ ÜÇÜNDÜR, MƏCBURİ DEYİL.

---

## Hissə 13: Shared komponentlər — tək-tək

`src/shared/components/index.ts` (barrel):
```ts
export * from './Button'
export * from './Loader'
export * from './Pagination'
export * from './ConfirmModal'
export * from './Input'
export * from './HeartToggle'
export * from './BackButton'
export * from './EmptyStateCard'
export * from './CarouselNavButton'
export * from './Category/CategoryCard'
export * from './Category/CategoryProductCard'
export * from './BasketSidebarPanel'
export * from './ProductDetailContent'
```
`layout/` (Header, Footer, SiteChrome, Container) VƏ `auth/` (RequireAuth, RedirectIfAuth) alt-qovluqları BU BARREL-Ə DAXİL DEYİL — onlar ÖZ TAM YOLLARI İLƏ import olunur (`@/shared/components/layout/Header`), çünki ADƏTƏN yalnız BİR-İKİ yerdə (Layout-un ÖZÜNDƏ) lazımdır, hamısını BİR BARREL-Ə YIĞMAĞA EHTİYAC YOXDUR.

### `Button/index.tsx` — bütün xam `<button>`-lərin ƏVƏZİ

```tsx
const VARIANT_CLASSES = {
    primary: 'rounded-[8px] bg-mint text-white transition-colors hover:bg-mint-dark',
    dark: 'rounded-[8px] bg-foreground text-white transition-colors hover:bg-foreground-dark',
    secondary: 'rounded-[8px] bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200',
    danger: 'rounded-[8px] bg-danger text-white transition-colors hover:bg-danger-dark',
    ghost: '',
    link: 'text-mint transition-colors hover:text-mint-dark',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
    const base = 'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
    return <button className={`${base} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />
}
```
**Diqqətli dizayn qərarı:** `rounded-[8px]` VƏ `transition-colors` HƏR VARİANTIN öz sinif sətrinin İÇİNDƏDİR, ÜMUMİ `base` sinifdə YOX — çünki layihədə `tailwind-merge`/`clsx`/`cva` YOXDUR, sadə STRING BİRLƏŞDİRMƏSİ (template literal) işlədilir, VƏ Tailwind-də SONRAKI sinif ƏVVƏLKİNİ HƏMİŞƏ "üstələmir" (bu, PLAIN CSS-in ÖZ SIRALAMA qaydalarına TABEDİR — HANSI qaydanın "QALİB GƏLƏCƏYİ" CSS FAYLINDA HANSININ SONRA YAZILDIĞINDAN ASILIDIR, JSX-də HANSI SIRAYLA YAZILDIĞINDAN DEYİL). Əgər `rounded-[8px]` `base`-də olsaydı, bir çağıran `className="rounded-full"` ÖTÜRƏNDƏ HANSI QAZANACAĞI QEYRİ-MÜƏYYƏN olardı (Tailwind-in generasiya etdiyi CSS faylında `.rounded-\[8px\]` VƏ `.rounded-full`-DAN HANSININ ƏVVƏL GƏLDİYİNDƏN ASILI). Hər VARIANT ÖZ radius/transition-UNU DAŞIYANDA, KONFLİKT EHTİMALI YOX olur — `ghost`/`link` variant-larının (KARUSEL OXLARI KİMİ ÖZ `rounded-full`-U OLAN yerlərdə istifadə olunan) HEÇ NƏ İLƏ "VURUŞMASI" MÜMKÜN DEYİL, çünki onların `VARIANT_CLASSES`-i `rounded-[8px]` HEÇ YAZMIR.

`{...props}` — QALAN BÜTÜN HTML `<button>` ATRİBUTLARINI (`type`, `onClick`, `disabled`, `aria-label` və s.) OLDUĞU KİMİ ÖTÜRÜR — `ButtonProps`, `React.ComponentPropsWithRef<'button'>`-DAN GENİŞLƏNDİRİLİB (bu, `<button>`-in "TƏBİİ" HƏR PROP-UNU AVTOMATİK "MİRAS ALIR", HƏR BİRİNİ ƏL İLƏ YENİDƏN YAZMAĞA EHTİYAC YOXDUR).

### `ConfirmModal/index.tsx`

```tsx
export function ConfirmModal({ open, title, description, confirmLabel = 'Bəli, sil', cancelLabel = 'İmtina', onConfirm, onCancel }: ConfirmModalProps) {
    if (!open) return null

    return (
        <div
            onClick={(e) => { e.stopPropagation(); onCancel() }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg">
                <p className="text-lg font-semibold text-neutral-900">{title}</p>
                {description && <p className="mt-2 text-sm text-neutral-500">{description}</p>}
                <div className="mt-6 flex items-center gap-3">
                    <Button variant="secondary" onClick={onCancel} className="flex-1 py-2.5 text-sm font-semibold">{cancelLabel}</Button>
                    <Button onClick={onConfirm} className="flex-1 py-2.5 text-sm font-semibold">{confirmLabel}</Button>
                </div>
            </div>
        </div>
    )
}
```
`if (!open) return null` — BU KOMPONENT HƏMİŞƏ RENDER-DƏ QALIR (VALİDEYN heç vaxt `{confirmOpen && <ConfirmModal ... />}` YAZMIR — ƏVƏZİNƏ HƏMİŞƏ `<ConfirmModal open={confirmOpen} ... />` YAZILIR), sadəcə `open=false` OLANDA HEÇ NƏ RENDER ETMİR. **`e.stopPropagation()` İKİ AYRI YERDƏ:**
1. Backdrop-un (ARXA fon) `onClick`-i — kart üstünə YERLƏŞDİRİLƏNDƏ (`CategoryProductCard`-IN ÜSTÜNDƏ MODAL AÇILIRSA), MODAL BAĞLANANDA klik ARTIQ "kartı aç" KİMİ DƏ İŞLƏNMƏSİN deyə.
2. Modal QUTUSUNUN (ağ kart) ÖZÜNÜN `onClick`-i — İÇİNDƏKİ DÜYMƏLƏRƏ KLİK, BACKDROP-UN "bağla" MƏNTİQİNİ İŞƏ SALMASIN deyə (əks halda MODAL DAXİLİNDƏ HƏR HANSI klik, BACKDROP-A "BUBBLE UP" EDİB, YANLIŞLIQLA MODALI BAĞLAYARDI).

### `HeartToggle/index.tsx` — iki görünüş, tək komponent

```tsx
export function HeartToggle({ isFavorite, onToggle, variant }: HeartToggleProps) {
    const label = isFavorite ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'

    if (variant === 'card') {
        return (
            <Button variant="ghost" onClick={onToggle} aria-label={label}
                className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-[8px] backdrop-blur-sm transition-all duration-200 ease-out hover:scale-110 active:scale-90 ${
                    isFavorite ? 'bg-danger/15 shadow-[0_2px_10px_rgba(244,166,166,0.45)]' : 'bg-white/70 shadow-sm hover:bg-white/90'
                }`}>
                <Heart size={17} className={isFavorite ? 'scale-110 fill-danger text-danger' : 'text-neutral-400'} />
            </Button>
        )
    }

    return (
        <Button variant="ghost" onClick={onToggle} aria-label={label} className="transition-transform duration-200 hover:scale-110 active:scale-90">
            <Heart size={24} className={isFavorite ? 'fill-danger text-danger' : 'text-neutral-700'} />
        </Button>
    )
}
```
`variant="card"` — kartın SAĞ ÜST KÜNCÜNDƏ, ARXA-PLANLI (BLUR) dairə DÜYMƏ. `variant="header"` (defolt QOL) — MƏHSUL DETAL SƏHİFƏSİNİN ÜST HİSSƏSİNDƏ, ARXA-PLANSIZ, BÖYÜK ÜRƏK İKONU. **Tarixçə:** BU İKİ GÖRÜNÜŞ ƏVVƏLLƏR İKİ AYRI KOMPONENT İDİ (`FavoriteButton` KART ÜÇÜN, DETAL SƏHİFƏSİNDƏ AYRI, TƏKRARLANMIŞ BİR KOD PARÇASI) — AUDİT ZAMANI AŞKARLANIB, İSTİFADƏÇİNİN TƏSDİQİ İLƏ BU TƏK KOMPONENTƏ BİRLƏŞDİRİLİB.

### `BackButton/index.tsx`

```tsx
export function BackButton({ onClick }: BackButtonProps) {
    return (
        <Button variant="ghost" onClick={onClick}
            className="group flex w-fit flex-shrink-0 items-center gap-1.5 rounded-[8px] border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-mint hover:bg-emerald-pale hover:text-emerald hover:shadow-md">
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
            geri qayıt
        </Button>
    )
}
```
`group` VƏ `group-hover:` — Tailwind-in "VALİDEYN hover OLANDA UŞAQ elementə TƏSİR ET" ÜSULU: `<Button>`-a `group` sinifi qoyulur, İÇİNDƏKİ `<ArrowLeft>`-in sinifi isə `group-hover:-translate-x-1` — YƏNİ `Button`-UN ÖZÜ hover OLUNANDA (SIÇAN ÜSTÜNDƏ OLANDA), OXUN ÖZÜ SOLA SÜRÜŞÜR (İKONUN ÖZÜNÜ AYRICA HOVER ETMƏYƏ EHTİYAC YOXDUR). BackButton, `Button`-U BİRBAŞA İŞLƏTMƏK ƏVƏZİNƏ NİYƏ AYRI KOMPONENTDİR: geri QAYIT DÜYMƏSİNİN ÖZÜNƏMƏXSUS (İKON+MƏTN+XÜSUSİ HOVER ANİMASİYASI) BİR PATTERN-İ VAR, BU, 4 FƏRQLİ SƏHİFƏDƏ (`ProductDetailContent`, `OrderDetailSection` VƏ S.) EYNİ ŞƏKİLDƏ TƏKRARLANIR — TƏKRARLANMIŞ BÜTÜN JSX-İ BİR YERƏ YIĞMAQ üçün `Button`-UN ÜZƏRİNDƏ NAZİK BİR "WRAPPER".

### `CarouselNavButton/index.tsx`

```tsx
export function CarouselNavButton({ direction, onClick }: CarouselNavButtonProps) {
    const isLeft = direction === 'left'
    return (
        <Button variant="ghost" aria-label={isLeft ? 'Evvelki' : 'Novbeti'} onClick={onClick}
            className={`absolute z-20 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-700 shadow ring-1 ring-neutral-200 hover:bg-neutral-50 ${
                isLeft ? 'left-0 -translate-x-[18px]' : 'right-0 translate-x-[18px]'
            }`}>
            {isLeft ? <ChevronLeft className="h-7 w-7" /> : <ChevronRight className="h-7 w-7" />}
        </Button>
    )
}
```
`-translate-x-[18px]` / `translate-x-[18px]` — DÜYMƏNİN ÖZ QUTUSUNU KARUSEL SƏRHƏDİNDƏN 18PX BAYIRA İTƏLƏYİR (İSTİFADƏÇİ İKİ DƏFƏ "3px DAHA" DEYƏ XAHİŞ EDİB, 12px-DƏN 18px-Ə GƏLİB ÇIXIB). Bu, `rounded-full` (DAİRƏ) VARİANT-IN İKİ İSTİSNASINDAN BİRİDİR (bax Hissə 18) — LANDING SƏHİFƏSİNİN KARUSEL OXLARI QƏSDƏN DAİRƏVİDİR, `rounded-[8px]`-Ə "DÜZƏLDİLMƏMƏLİDİR".

### `EmptyStateCard/index.tsx`

```tsx
export function EmptyStateCard({ height, title, subtitle }: EmptyStateCardProps) {
    return (
        <div style={{ height }} className="flex flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-neutral-900">{title}</p>
            <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        </div>
    )
}
```
Sadə, 3-PARAMETRLİ "boş vəziyyət" kartı — `ProductsGrid` (məhsul YOXDUR) VƏ `FavoritesPage`-in (SEÇİLMİŞLƏR BOŞDUR) ÖZ AYRI-AYRI İNLİN "boş vəziyyət" `<div>`-LƏRİNİN ƏVƏZİNƏ ÇIXARILIB.

### `Input/index.tsx`

```tsx
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className = '', ...props }, ref) {
    return (
        <input ref={ref}
            className={`h-[50px] rounded-[10px] border border-neutral-100 bg-neutral-50 px-4 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-mint focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            {...props}
        />
    )
})
```
`forwardRef` — REACT-IN BİR MEXANİZMİ: ADİ BİR KOMPONENT `ref` PROP-UNU AVTOMATİK QƏBUL EDİB DAXİLİ DOM ELEMENTİNƏ "ÖTÜRMÜR" (`ref`, BAŞQA PROP-LARDAN FƏRQLİ, XÜSUSİ REZERV OLUNMUŞ BİR ADdır). `react-hook-form`-un `register('fieldName')` FUNKSİYASI QAYTARDIĞI OBYEKTDƏ BİR `ref` DAXİLDİR (formanın ÖZÜNÜN DAXİLİ DOM ELEMENTİNƏ BİRBAŞA ÇATMASI ÜÇÜN) — `Input`-UN `forwardRef` OLMASI, `{...form.register('password')}` KİMİ İSTİFADƏLƏRİN İŞLƏMƏSİ ÜÇÜN VACİBDİR.

### `Loader/index.tsx`

```tsx
export function Loader() {
  return (
    <div className="flex items-center justify-center gap-2 py-16">
      <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
      <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
      <span className="h-3 w-3 animate-bounce rounded-full bg-primary" />
    </div>
  )
}
```
3 dairə, HƏR BİRİ FƏRQLİ `animation-delay` İLƏ ("bounce" ANİMASİYASININ HANSI ANDA BAŞLADIĞI) — nəticə "DALĞA" EFFEKTİ. `[animation-delay:-0.3s]` — Tailwind-in ARBİTRARY VALUE SİNTAKSİSİ, KVADRAT MÖTƏRİZƏ İÇİNDƏ İSTƏNİLƏN CSS XASSƏSİNİ BİRBAŞA YAZMAĞA İMKAN VERİR.

### `Pagination/index.tsx` — səhifə nömrələri VƏ "..." MƏNTİQİ

```tsx
export function Pagination({ currentPage, totalPages, onPageChange, total, pageSize, className = '' }: PaginationProps) {
    if (totalPages <= 1) return null

    const pageNumbers: (number | '...')[] = []
    for (let page = 1; page <= totalPages; page += 1) {
        if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
            pageNumbers.push(page)
        } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
            pageNumbers.push('...')
        }
    }
    ...
}
```
Bu, "AĞILLI" SƏHİFƏLƏMƏ MƏNTİQİDİR: HƏR SƏHİFƏNİ GÖSTƏRMƏK ƏVƏZİNƏ (100 SƏHİFƏ OLSA, 100 DÜYMƏ ÇOX OLARDI), YALNIZ BUNLARI GÖSTƏRİR: BİRİNCİ SƏHİFƏ, SONUNCU SƏHİFƏ, VƏ CARİ SƏHİFƏNİN ±1 QONŞULUĞU — QALAN YERLƏRDƏ TƏK BİR "..." QOYULUR (ARDI-ARDINA İKİ "..." YARANMASIN DEYƏ, `pageNumbers[pageNumbers.length - 1] !== '...'` YOXLAMASI VAR). `Pagination` bir çox səhifədə (`ProductsGrid`, `FavoritesGrid`, `OrdersPage`) İSTİFADƏ OLUNUR, HƏR BİRİ ÖZ `paginate`/`getTotalPages` (bax Hissə 5-in `pagination.ts`-i) ÇAĞIRIŞI İLƏ.

### `Category/CategoryCard/index.tsx`

```tsx
export function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/categories/${category.id}`} className="flex cursor-pointer flex-col items-center rounded-2xl border border-neutral-100 bg-white px-4 py-6 text-center shadow-sm transition-transform duration-200 hover:z-10 hover:scale-105 hover:shadow-lg">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-neutral-100">
                {category.img_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={category.img_url} alt={category.name} className="h-full w-full object-cover" />
                )}
            </div>
            <p className="mt-3 text-sm font-semibold text-neutral-800">{category.name}</p>
        </Link>
    )
}
```
Adi `<img>` (`next/image` YOX) — çünki `category.img_url` API-DƏN GƏLİR, HOST-U ÖNCƏDƏN BİLİNMİR (`next.config.ts`-in `remotePatterns` SİYAHISINDA OLMAYA BİLƏR). `next/image` SİYAHIDA OLMAYAN BİR HOST-LA İSTİFADƏ OLUNSA, RENDER ZAMANI BÜTÜN ALT-AĞAC XƏTA İLƏ ÇÖKƏR — ADİ `<img>` İSƏ SADƏCƏ ŞƏKLİ GÖSTƏRMİR, SƏHİFƏNİ ÇÖKDÜRMÜR (bax Hissə 19).

### `Category/CategoryProductCard/index.tsx` — ƏSAS MƏHSUL KARTI, tam kod

```tsx
export function CategoryProductCard({ product, onSelect }: CategoryProductCardProps) {
    const router = useRouter()
    const pathname = usePathname()
    const params = useParams<{ id?: string }>()
    const hasMounted = useHasMounted()
    const { data: basket } = useBasket()
    const { add, remove, removeAll } = useBasketMutations()
    const { data: favorites } = useFavorites()
    const toggleFavorite = useToggleFavorite()

    const quantity = hasMounted ? (basket?.items.find((item) => item.product.id === product.id)?.quantity ?? 0) : 0
    const isFavorite = hasMounted
        ? (favorites?.some((favorite) => favorite.id === product.id) ?? product.is_favorite ?? false)
        : false

    const handleOpenDetail = () => {
        if (onSelect) { onSelect(product.id); return }
        const isCategoryDetailPage = pathname.startsWith('/categories/') && !!params.id
        router.push(isCategoryDetailPage ? `/categories/${params.id}/products/${product.id}` : `/products/${product.id}`)
    }
    const handleIncrease = (e: React.MouseEvent) => { e.stopPropagation(); add.mutate(product.id) }
    const handleDecrease = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (quantity > 1) remove.mutate(product.id)
        else removeAll.mutate(product.id)
    }
    const handleToggleFavorite = (e: React.MouseEvent) => { e.stopPropagation(); toggleFavorite.mutate(product.id) }

    return (
        <div onClick={handleOpenDetail} className="relative z-10 mx-auto flex h-[244px] w-full max-w-[220px] !cursor-pointer flex-col items-center rounded-2xl bg-white p-3 text-center shadow-sm transition-transform duration-200 hover:z-20 hover:scale-105 hover:shadow-lg">
            <HeartToggle isFavorite={isFavorite} onToggle={handleToggleFavorite} variant="card" />
            <div className="relative mb-2 flex h-[100px] w-full shrink-0 cursor-pointer items-center justify-center">
                <img src={product.img_url || PRODUCT_IMAGE_FALLBACK} alt={product.title} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex h-[48px] min-h-0 w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                <p className="line-clamp-2 text-base font-bold leading-6 text-neutral-900">{product.title}</p>
            </div>
            <div className="mt-auto flex w-full flex-col items-center pt-2">
                <p className="mb-1 cursor-pointer text-base text-neutral-500">{product.price} AZN</p>
                <QuantityStepper quantity={quantity} type={product.type} onIncrease={handleIncrease} onDecrease={handleDecrease} />
            </div>
        </div>
    )
}
```
Nöqtə-nöqtə:
- **`onSelect` propu — İKİ FƏRQLİ KLİK DAVRANIŞI, EYNİ KOMPONENT.** `onSelect` VERİLİBSƏ (Favorites SƏHİFƏSİNDƏ), klik ROUTE DƏYİŞMİR, callback ÇAĞIRILIR (favorites SƏHİFƏSİ ÖZÜ LOKAL state İLƏ grid-i detala DƏYİŞİR). VERİLMƏYİBSƏ (`/categories/[id]`, `/products`-DA), KLİK ROUTE NAVİQASİYASI EDİR — VƏ HANSI ROUTE-A GEDƏCƏYİNİ `pathname`-Ə BAXARAQ ÖZÜ SEÇİR (`/categories/[id]/products/[id]` VS `/products/[id]`).
- **`e.stopPropagation()` HƏR bir düymədə** — ÜRƏK İKONU YA +/− DÜYMƏLƏRİNƏ KLİK, KART-IN ÖZÜNÜN `onClick`-İNİ (DETAL SƏHİFƏSİNƏ NAVİQASİYA) İŞƏ SALMASIN DEYƏ.
- **Sabit ÖLÇÜLƏR (`h-[244px]`, başlıq `h-[48px]` + `line-clamp-2` + `min-h-0`):** HƏR KART, BAŞLIĞIN UZUNLUĞUNDAN ASILI OLMAYARAQ EYNİ HÜNDÜRLÜKDƏ olsun deyə — CSS Grid-in DEFOLT `align-items: stretch`-i, BU SABİTLƏMƏ OLMASA, HƏR SƏTRİN HÜNDÜRLÜYÜNÜ QONŞU KARTLARIN BAŞLIQ UZUNLUĞUNA GÖRƏ DƏYİŞDİRƏRDİ. `min-h-0` — KLASSİK BİR FLEXBOX "TƏLƏSİDİR": FLEX ELEMENTLƏRİ, DEFOLT OLARAQ, ÖZ MƏZMUNUNUN TƏBİİ HÜNDÜRLÜYÜNDƏN KİÇİK OLA BİLMİR (`min-height: auto` İMPLİSİT DEYƏRİ), BUNSUZ EKSPLİSİT `h-[48px]` HEÇ TƏSİR ETMƏZ.

### `Category/CategoryProductCard/components/QuantityStepper.tsx`

```tsx
export function QuantityStepper({ quantity, type, onIncrease, onDecrease }: QuantityStepperProps) {
    if (quantity === 0) {
        return <Button onClick={onIncrease} className="flex h-8 w-full items-center justify-center px-2 text-sm font-semibold">Səbətə əlavə et</Button>
    }
    return (
        <div className="flex w-full items-center gap-1.5">
            <Button variant="danger" onClick={onDecrease} className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-base font-bold">−</Button>
            <span className="flex h-8 flex-1 items-center justify-center rounded-[8px] bg-mint text-sm font-semibold text-white">{quantity} {type}</span>
            <Button onClick={onIncrease} className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-base font-bold">+</Button>
        </div>
    )
}
```
`quantity === 0` OLANDA sadə DÜYMƏ, DEYİLSƏ `− miqdar tip +` STEPPER-Ə "SVOP" OLUNUR. `{quantity} {type}` — `type` `Product.type` (`ProductMeasure` — "ədəd", "kg" VƏ S.) SAHƏSİDİR, YƏNİ STEPPER "3 ədəd" VƏ YA "0.5 kg" KİMİ GÖSTƏRİR.

### `BasketSidebarPanel/index.tsx` — İKİ ÖLÇÜ REJİMİ

```tsx
export function BasketSidebarPanel({ height, headingOffset = -32, fill = false }: BasketSidebarPanelProps) {
    const hasMounted = useHasMounted()
    const { data: basket } = useBasket()
    const { add, remove, removeAll } = useBasketMutations()
    const [pendingRemove, setPendingRemove] = useState<{ id: number; title: string } | null>(null)

    const isEmpty = !hasMounted || !basket || basket.items.length === 0

    return (
        <div className="relative w-[320px] flex-shrink-0">
            <h2 style={{ top: headingOffset }} className="absolute left-0 text-lg font-semibold text-neutral-900">Səbətim</h2>
            <div style={fill ? undefined : { height }} className={`flex flex-col rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm ${fill ? 'absolute inset-0' : ''}`}>
                {isEmpty ? <EmptyBasketState /> : (
                    <>
                        <div className="scrollbar-hide min-h-0 flex-1 space-y-[10px] overflow-y-auto">
                            {[...basket.items].sort((a, b) => a.id - b.id).map((item) => (
                                <BasketItemRow key={item.id} item={item}
                                    onRemoveClick={() => setPendingRemove({ id: item.product.id, title: item.product.title })}
                                    onIncrease={() => add.mutate(item.product.id)}
                                    onDecrease={() => item.quantity > 1 ? remove.mutate(item.product.id) : removeAll.mutate(item.product.id)}
                                />
                            ))}
                        </div>
                        <BasketSummary total={basket.total} />
                    </>
                )}
            </div>
            <ConfirmModal open={!!pendingRemove} title="Məhsulu səbətdən silmək istəyirsiniz?" description={pendingRemove?.title}
                onConfirm={handleConfirmRemove} onCancel={() => setPendingRemove(null)} />
        </div>
    )
}
```
**İKİ ÖLÇÜ REJİMİ:**
- `fill=true` (`CategoryDetailLayout`-DA) — İÇ `<div>` `absolute inset-0` OLUR, YƏNİ ÖZ İÇİNDƏ HEÇ BİR ÖLÇÜ QƏRARI VERMİR, VALİDEYNİN (CSS-STRETCH edilmiş wrapper, bax Hissə 16) ÖLÇÜSÜNƏ TAM UYĞUNLAŞIR.
- `fill=false` (defolt, `height` PROP-U İLƏ, `ProductsGrid`/`FavoritesPage`-DƏ) — REAL PİKSEL HÜNDÜRLÜK VERİLİR (`style={{ height }}`), ÇÜNKİ BU SƏHİFƏLƏRDƏ VALİDEYN CSS-STRETCH EDİLMİŞ BİR FLEX SƏTİR DEYİL.

**BU İKİSİ QARIŞDIRILMIR** — `fill` VƏ `height` ALTERNATİV REJİMLƏRDİR, KOMPOZİSİYA OLUNMUR.

`[...basket.items].sort((a, b) => a.id - b.id)` — `basket.items`-in ÖZÜNÜ (MUTASİYA ETMƏDƏN) YENİ BİR MASSİVƏ KOPYALAYIR (`[...]` SPREAD), SONRA `id`-YƏ GÖRƏ SIRALAYIR — BU, MƏHSUL ƏLAVƏ/ÇIXARILDIQCA SİYAHIDAKI SƏTRLƏRİN "TƏSADÜFİ" YERDƏYİŞMƏSİNİN QARŞISINI ALIR (BACKEND-İN ÖZÜ SİYAHINI HƏR SORĞUDA FƏRQLİ SIRADA QAYTARA BİLƏR).

### `BasketSidebarPanel/components/BasketItemRow.tsx`

Hər sətir: sil düyməsi (sağ üst), şəkil, başlıq, `−miqdar+` stepper (mint-pale fonda), qiymət. `Trash2` ikonu, `onRemoveClick`-ə bağlanıb — sadəcə MİQDARI 1-Ə ENDİRMİR, HƏMİŞƏ `ConfirmModal` AÇIR (bax `BasketSidebarPanel`-DƏKİ `pendingRemove` state-i) — Fərqli olaraq, `CategoryProductCard`-IN ÖZ STEPPER-İ 0-A ENƏNDƏ HEÇ BİR TƏSDİQ İSTƏMİR (bax aşağıda).

### `BasketSidebarPanel/components/BasketSummary.tsx`

```tsx
export function BasketSummary({ total }: BasketSummaryProps) {
    return (
        <div className="mt-3 flex-shrink-0 space-y-2 border-t border-neutral-100 pt-3">
            ...
            <Link href="/checkout" className="mt-1 block w-full cursor-pointer rounded-[8px] bg-foreground py-3 text-center text-base font-semibold text-white transition-colors hover:bg-foreground-dark">
                Sifarişi tamamla
            </Link>
        </div>
    )
}
```
**Tarixi BUG:** BU DÜYMƏ ƏVVƏLLƏR `/basket`-Ə (SƏBƏT SƏHİFƏSİNƏ) LİNK VERİRDİ, `/checkout`-A YOX — İSTİFADƏÇİ BUNU BUG KİMİ BİLDİRİB, DÜZƏLDİLİB. **Yeni bir "sifarişi TAMAMLA" DÜYMƏSİ ƏLAVƏ EDƏNDƏ, HƏMİŞƏ `/checkout`-A YÖNLƏNDİRDİYİNİ YOXLAYIN**, `/basket`-Ə YOX.

### `BasketSidebarPanel/components/EmptyBasketState.tsx`

```tsx
import basketEmpty from '@/assets/images/basket-empty.svg'

export function EmptyBasketState() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
            <img src={basketEmpty.src} alt="" className="h-[300px] w-auto" />
            <p className="mt-5 text-xl font-bold text-emerald">Səbətiniz boşdur</p>
            <p className="mt-2 text-sm text-neutral-500">Sifariş vermək üçün səbətinizə məhsul əlavə edin</p>
        </div>
    )
}
```
`basket-empty.svg` — layihədə əl İLƏ ÇƏKİLMİŞ SVG-LƏRİN LUCİDE-REACT-Ə KEÇİRİLMƏSİ AUDİTİNDƏ QƏSDƏN SAXLANILAN İKİ İSTİSNADAN BİRİDİR (O BİRİSİ `auth-illustration.webp`) — çünki BU, KONKRET BİR "SƏBƏT+BOŞLUQ" TƏSVİRİDİR, GENERİK BİR İKON İLƏ ƏVƏZ OLUNA BİLMƏZ.

### `ProductDetailContent/index.tsx` — 3 route-un ORTAQ komponenti, tam kod

```tsx
export function ProductDetailContent({ productId, initialProduct = null, height, className = '', onBack }: ProductDetailContentProps) {
    const router = useRouter()
    const hasMounted = useHasMounted()
    const { data: product, isLoading: loading } = useProduct(productId, initialProduct)
    const { data: basket } = useBasket()
    const { add, removeAll } = useBasketMutations()
    const { data: favorites } = useFavorites()
    const toggleFavorite = useToggleFavorite()
    const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false)

    useEffect(() => {
        if (product) document.title = `${product.title} | TIK TAK`
    }, [product])

    if (loading) return <div style={{ height }} className={...}><Loader /></div>
    if (!product) return <div style={{ height }} className={...}><p>Mehsul tapilmadi.</p></div>

    const quantity = hasMounted ? (basket?.items.find((item) => item.product.id === product.id)?.quantity ?? 0) : 0
    const isFavorite = hasMounted ? (favorites?.some((f) => f.id === product.id) ?? product.is_favorite ?? false) : false

    const handleAddToBasket = () => {
        if (quantity > 0) { toast.info('Bu məhsul artıq səbətdədir'); return }
        add.mutate(product.id)
    }

    return (
        <div style={{ height }} className={`flex flex-col rounded-2xl bg-white shadow-sm ${className}`}>
            <ProductHeader isFavorite={isFavorite} onBack={onBack ?? (() => router.back())} onToggleFavorite={() => toggleFavorite.mutate(product.id)} />
            <div className="mt-8 flex flex-1 items-center">
                <div className="flex w-full flex-col gap-10 md:flex-row md:items-center">
                    <ProductImage imgUrl={product.img_url} title={product.title} />
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-neutral-900">{product.title}</h1>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">{product.description}</p>
                        <p className="mt-4 text-2xl font-bold text-neutral-900">{product.price} AZN</p>
                        <AddToBasketControl quantity={quantity} onAdd={handleAddToBasket} onRemove={() => setConfirmRemoveOpen(true)} />
                    </div>
                </div>
            </div>
            <ConfirmModal open={confirmRemoveOpen} title="Məhsulu səbətdən silmək istəyirsiniz?" description={product.title}
                onConfirm={handleConfirmRemove} onCancel={() => setConfirmRemoveOpen(false)} />
        </div>
    )
}
```
Nöqtə-nöqtə:
- **`useProduct(productId, initialProduct)`** — bax Hissə 12. `initialProduct` VERİLİBSƏ (SSR-DƏN, İKİ ROUTE-DA), HEÇ BİR YÜKLƏNMƏ VƏZİYYƏTİ OLMUR. VERİLMƏYİBSƏ (`/favorites/[id]`-DƏ), NORMAL CLIENT-SIDE FETCH BAŞ VERİR.
- **`document.title` SİNXRONİZASİYASI** — `generateMetadata` (SERVER-DƏ, YALNIZ `/products/[id]` VƏ `/categories/[id]/products/[id]`-DƏ MÖVCUDDUR) BURADA İŞLƏMİR, ÇÜNKİ `ProductDetailContent` BİR CLIENT COMPONENT-DİR VƏ `/favorites/[id]`-DƏ HEÇ BİR SERVER-SIDE `generateMetadata` YOXDUR — buna görə TAB BAŞLIĞI (BROWSER TITLE) ÜÇÜN BEST-EFFORT BİR `useEffect` İŞLƏDİLİR.
- **`height`/`className` PROP-LARI** — HƏR 3 ÇAĞIRAN ÖZ ÖLÇÜSÜNÜ/ÇƏRÇİVƏSİNİ VERİR: `ProductDetailPage` (`/products/[id]`) HEÇ `height` VERMİR (TƏBİİ HÜNDÜRLÜK), `CategoryProductDetailSection` (`/categories/[id]/products/[id]`) `height="100%"` VERİR (CSS-STRETCH EDİLMİŞ WRAPPER-İ DOLDURUR), `FavoritesPage` HESABLANMIŞ BİR PİKSEL DƏYƏRİ VERİR.
- **`onBack` PROP-U** — VERİLMƏSƏ, DEFOLT `() => router.back()` (BRAUZER TARİXÇƏSİNDƏ GERİ). `FavoritesPage` isə ÖZ `onBack`-İNİ VERİR (`() => router.push('/favorites?page=' + currentPage)`) — ÇÜNKİ ORDA "GERİ" ƏSLİNDƏ BİR ROUTE DƏYİŞİKLİYİ DEYİL, LOKAL STATE-İN GRİDƏ QAYITMASIDIR (bax Hissə 16).

### `ProductDetailContent/components/ProductHeader.tsx`

```tsx
import { BackButton } from '../../BackButton'
import { HeartToggle } from '../../HeartToggle'

export function ProductHeader({ isFavorite, onBack, onToggleFavorite }: ProductHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <BackButton onClick={onBack} />
            <HeartToggle isFavorite={isFavorite} onToggle={onToggleFavorite} variant="header" />
        </div>
    )
}
```
İmportlar `'../../BackButton'` VƏ `'../../HeartToggle'` — BARREL-DƏN (`@/shared/components`) YOX, ÇÜNKİ BU FAYL ÖZÜ (`ProductDetailContent` VASİTƏSİLƏ) O BARREL-İN TRANSİTİV BİR HİSSƏSİDİR (bax Hissə 5-in DAİRƏVİ İMPORT İZAHI). **Real bir SƏHV-DÜZƏLTMƏ HEKAYƏSİ:** BU FAYL BİR DƏFƏ SƏHVƏN BARREL İMPORT-A DƏYİŞDİRİLİB (GÜYA "ARDICILLIQ" ÜÇÜN), TSC XƏTA VERMƏDİYİ HALDA DAİRƏVİ İMPORT RİSKİ YARADIĞI ÜÇÜN GERİ QAYTARILIB.

### `ProductDetailContent/components/ProductImage.tsx`, `AddToBasketControl.tsx`

Sadə, TƏK-VƏZİFƏLİ TƏQDİMAT KOMPONENTLƏRİ — `ProductImage` FALLBACK ŞƏKLİ (`PRODUCT_IMAGE_FALLBACK`) İDARƏ EDİR, `AddToBasketControl` `quantity > 0`-A GÖRƏ "Səbətə əlavə et" DÜYMƏSİ İLƏ "✓ Səbətdədir" + QIRMIZI ZİBİL DÜYMƏSİ ARASINDA SVOP OLUR.

---

## Hissə 14: `RequireAuth`, `RedirectIfAuth` VƏ digər hook-lar

### `src/shared/components/auth/RequireAuth/index.tsx` — tam kod, sətir-sətir

```tsx
export function RequireAuth({ children }: RequireAuthProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    useIsomorphicLayoutEffect(() => {
        if (!getAccessToken()) router.replace('/login')
    }, [router])

    useAuthSync(() => {
        if (!getAccessToken()) router.replace('/login')
    })

    useEffect(() => {
        if (getAccessToken()) setChecked(true)
    }, [])

    if (!checked) return <Loader />

    return <>{children}</>
}
```
**ÜÇ AYRI EFFEKT, ÜÇ AYRI VƏZİFƏ:**
1. `useIsomorphicLayoutEffect` — SİNXRON, BOYAMADAN ƏVVƏL: TOKEN YOXDURSA, DƏRHAL `/login`-Ə YÖNLƏNDİR. BU EFFEKT HEÇ VAXT `children`-İ GÖSTƏRMİR — YALNIZ NAVİQASİYA EDİR. Sinxron OLDUĞU üçün, İCAZƏSİZ BİR ZİYARƏTÇİ QORUNAN MƏZMUNUN BİR ANLIQ DA OLSA "YANIB-SÖNMƏSİNİ" GÖRMÜR.
2. `useAuthSync` — BAŞQA BİR BROWSER TAB-INDA ÇIXIŞ EDİLƏRSƏ (bax Hissə 12/Hissə 13-ün `useAuthSync`-i), BU TAB DA DƏRHAL YÖNLƏNDİRİLİR — ƏKS HALDA KÖHNƏLMİŞ TOKEN İLƏ QORUNAN MƏZMUNU GÖSTƏRMƏYƏ DAVAM EDƏRDİ.
3. ADİ (POST-PAINT) `useEffect` — TOKEN VARSA, `checked = true` QOYUR, `children` GÖRÜNÜR. BU, BİRİNCİ EFFEKTDƏN AYRI SAXLANILIB ki, GERÇƏKDƏN LOGIN OLMUŞ BİR ZİYARƏTÇİ, BÜTÜN ALT-AĞACIN SİNXRON RENDER OLUNMASINI GÖZLƏMƏDƏN, DƏRHAL `<Loader />` GÖRSÜN, SONRA MƏZMUN "POP" EDİB GİRSİN (DAHA SÜRƏTLİ HİSS OLUNAN TƏCRÜBƏ).

**Bu iki effekt BİRLƏŞDİRİLMİR** — BİRLƏŞDİRİLSƏ, YÖNLƏNDİRMƏ-QAÇIRMA (FLASH-AVOIDANCE) FAYDASI QALAR, AMMA LOGİN OLMUŞ ADİ HAL ÜÇÜN "SÜRƏTLİ HİSS" İTƏR (BROWSER, MƏZMUN GÖRÜNMƏZDƏN ƏVVƏL, BÜTÜN QORUNAN ALT-AĞACIN SİNXRON RENDER OLUNMASINI GÖZLƏYƏRDİ).

### `RedirectIfAuth/index.tsx` — EKSAKT ƏKSİ

```tsx
export function RedirectIfAuth({ children }: RedirectIfAuthProps) {
    ...
    useIsomorphicLayoutEffect(() => {
        if (getAccessToken()) router.replace('/')
    }, [router])

    useAuthSync(() => {
        if (getAccessToken()) router.replace('/')
    })

    useEffect(() => {
        if (!getAccessToken()) setChecked(true)
    }, [])

    if (!checked) return null   // Loader YOX, sadəcə HEÇ NƏ (login FORMU BİR ANLIQ GÖRÜNMƏSİN)
    return <>{children}</>
}
```
`/login` VƏ `/register`-i BU KOMPONENT SARIYIR — ARTIQ LOGIN OLMUŞ ZİYARƏTÇİNİ ANA SƏHİFƏYƏ YÖNLƏNDİRİR. `RequireAuth`-DAN FƏRQLİ OLARAQ, `checked=false` ANINDA `<Loader />` YOX, `null` QAYTARIR — ÇÜNKİ BU HAL ADƏTƏN ÇOX QISADIR (LOGIN FORMU ZATƏN "BOŞ" BİR SƏHİFƏDİR).

### `useIsomorphicLayoutEffect.ts`

```ts
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
```
`useLayoutEffect` YALNIZ BRAUZERDƏ MÖVCUDDUR — SERVERDƏ ÇAĞIRILSA XƏBƏRDARLIQ VERİR ("useLayoutEffect does nothing on the server"). BU BİR-SƏTİRLİK HƏLL, BRAUZERDƏ `useLayoutEffect`-İ (BOYAMADAN ƏVVƏL SİNXRON İŞLƏYİR), SERVERDƏ İSƏ `useEffect`-Ə "DÜŞÜR".

### `useAuthSync.ts`

```ts
export function useAuthSync(onChange: () => void = () => {}) {
    const queryClient = useQueryClient()
    useEffect(() => {
        function handleStorage(e: StorageEvent) {
            if (e.key !== ACCESS_TOKEN_KEY) return
            queryClient.clear()
            onChange()
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [queryClient, onChange])
}
```
`storage` HADİSƏSİ — BRAUZERİN ÖZ, YERLİ BİR ÖZƏLLİYİDİR: YALNIZ **BAŞQA** TAB-LARDA `localStorage` DƏYİŞƏNDƏ İŞƏ DÜŞÜR (HEÇ VAXT DƏYİŞİKLİYİ EDƏN TAB-IN ÖZÜNDƏ) — BU, MƏHZ "BAŞQA BİR TAB-DA LOGIN/LOGOUT OLDU" HALINI AŞKARLAMAQ ÜÇÜN LAZIM OLAN ŞEYDİR. `queryClient.clear()` QEYD-ŞƏRTSİZ ÇAĞIRILIR (PROFİL/SƏBƏT/SEVİMLİLƏR HƏR HALDA KÖHNƏLİB — YA YENİ İSTİFADƏÇİ, YA HEÇ BİRİ), SONRA `onChange` CALLBACK-İ ÇAĞIRAN TƏRƏFƏ "BU ROUTE YÖNLƏNDİRMƏYƏ EHTİYAC VARMI" QƏRARINI VERİR.

### `useCardCarousel.ts`

```ts
export function useCardCarousel(itemCount: number) {
    const trackRef = useRef<HTMLDivElement>(null)
    const [canPrev, setCanPrev] = useState(false)
    const [canNext, setCanNext] = useState(false)

    const updateEdges = () => {
        const el = trackRef.current
        if (!el) return
        setCanPrev(el.scrollLeft > 4)
        setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    }

    useEffect(() => { updateEdges() }, [itemCount])

    const scrollByCard = (direction: 1 | -1) => {
        const el = trackRef.current
        const card = el?.firstElementChild as HTMLElement | null
        if (!el || !card) return
        const gap = parseFloat(getComputedStyle(el).columnGap || '0')
        el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' })
    }

    return { trackRef, canPrev, canNext, onScroll: updateEdges, prev: () => scrollByCard(-1), next: () => scrollByCard(1) }
}
```
Landing SƏHİFƏSİNDƏKİ HƏR İKİ KARUSELİN (`BannerCarousel`, `SpecialOffers`) DİNAMİKASINI İDARƏ EDİR. `scrollByCard` — KARUSELİ TAM BİR KART GENİŞLİYİ QƏDƏR SÜRÜŞDÜRÜR (`card.offsetWidth + gap`) — RAST-GƏLƏ BİR PİKSEL MİQDARI DEYİL, BİRİNCİ KARTIN ÖZ HƏQİQİ ÖLÇÜSÜNÜ OXUYUR (`getComputedStyle`), BELƏLİKLƏ RESPONSİVE EKRANLARDA (KART ENİ DƏYİŞƏNDƏ) DÜZGÜN İŞLƏYİR. `4px` MARJ (`> 4`, `- 4`) — SUB-PİKSEL YUVARLAQLAŞDIRMA XƏTALARINDAN (BROWSER-IN SCROLL POZİSİYASINI HESABLAMASINDA) QAYNAQLANAN SAXTA "HƏLƏ DAHA SÜRÜŞDÜRMƏK OLAR" GÖSTƏRİCİLƏRİNİN QARŞISINI ALIR.

---

## Hissə 15: Layout

### `SiteChrome/index.tsx` — Header/Footer-i route-a görə göstərmək

```tsx
'use client'

const NO_CHROME_ROUTES = ['/login', '/register']

export function SiteChrome({ children }: SiteChromeProps) {
    const pathname = usePathname()
    const hideChrome = NO_CHROME_ROUTES.includes(pathname)
    const isLanding = pathname === '/'
    const showFooter = isLanding

    if (hideChrome) {
        return <main className="flex-1">{children}</main>
    }

    return (
        <>
            <Header />
            <main className={`flex-1 ${isLanding ? 'bg-white' : 'bg-neutral-50'}`}>{children}</main>
            {showFooter && <Footer />}
        </>
    )
}
```
Üç QAYDA, KODUN ÖZÜNDƏN OXUNUR:
1. `/login` VƏ `/register` — HEÇ BİR CHROME (Header/Footer) YOXDUR.
2. Footer YALNIZ `/` (LANDING)-DƏ GÖRÜNÜR.
3. `<main>`-in FONU: LANDING-DƏ `bg-white`, QALAN HƏR ROUTE-DA `bg-neutral-50` (BU, BÜTÜN SAYT ÜÇÜN QƏSDƏN BELƏDİR, TƏKCƏ KATEQORİYA SƏHİFƏLƏRİ ÜÇÜN DEYİL).

`SiteChrome` ÖZÜ `'use client'`-DİR (`usePathname()` İŞLƏTDİYİ ÜÇÜN) — AMMA BU, `RootLayout`-UN ÖZÜNÜN SERVER COMPONENT OLMASINA MANE OLMUR (Server Component-lər Client Component-ləri "children" KİMİ İÇİNƏ ALA BİLƏR).

### `Header/index.tsx`

```tsx
export function Header() {
    const pathname = usePathname()
    const isLanding = pathname === '/'

    return (
        <header className="sticky top-0 z-50 bg-white">
            <Container className="pt-[30px] pb-[30px]">
                <div className="flex h-10 items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center text-[40px] font-extrabold leading-none tracking-[0.03em] text-neutral-900">TIK TAK</Link>
                        <AddressBadge />
                    </div>
                    <SearchBar />
                    <NavLinks />
                </div>
            </Container>
            {!isLanding && <div className="h-3 w-full border-t border-neutral-100 bg-neutral-50" />}
        </header>
    )
}
```
`sticky top-0 z-50` — Header EKRANI SÜRÜŞDÜRƏNDƏ ÜST HİSSƏDƏ "YAPIŞIB QALIR". Üst SƏTRİN ƏTRAFINDAKI `h-10` WRAPPER-İ (AYRICA `Container`-in ÖZ PADDING-İNDƏN) — ÇÜNKİ SABİT HÜNDÜRLÜK İLƏ PADDING-İ EYNİ ELEMENTDƏ BİRLƏŞDİRMƏK `box-sizing: border-box` İLƏ "VURUŞUR". BU WRAPPER LOGONUN HƏR ROUTE-DA EYNİ PİKSEL Y-MÖVQEYİNDƏ QALMASI ÜÇÜNDÜR — OLMASA, ÜNVAN BLOKU (İKON+İKİ MƏTN SƏTRİ, ~46PX) LOGO-DAN (~40PX) HÜNDÜRDÜR VƏ `items-center` LOGONU BİR NEÇƏ PİKSEL AŞAĞI İTƏLƏYİR, YALNIZ LANDING-DƏN BAŞQA SƏHİFƏLƏRDƏ (LANDING-DƏ ÜNVAN BLOKU YOXDUR, BAX AŞAĞI). SON SƏTİRDƏKİ `!isLanding && <div className="h-3 ...">` — LANDING-DƏN BAŞQA HƏR ROUTE-DA HEADER-İN ALTINDA NAZİK BİR AYIRICI ZOLAQ.

### `Header/components/AddressBadge.tsx`

```tsx
export function AddressBadge() {
    const pathname = usePathname()
    const hasMounted = useHasMounted()
    const { data: profile } = useProfile()

    if (pathname === '/') return null

    return (
        <div className="flex items-center gap-[8px] rounded-[8px] border border-neutral-100 bg-neutral-50 px-3 py-1.5">
            <MapPin className="h-8 w-8 flex-shrink-0" strokeWidth={1.6} />
            <div className="flex flex-col justify-center gap-[2px]">
                <span className="text-[12px] font-medium leading-none text-neutral-400">Ünvan</span>
                <span className="text-[14px] leading-none text-neutral-500">{(hasMounted && profile?.address) || 'Ünvanınızı seçin'}</span>
            </div>
        </div>
    )
}
```
`pathname === '/'` OLANDA `null` QAYTARIR — LANDING SƏHİFƏSİNDƏ ÜNVAN BLOKU GÖSTƏRİLMİR (SADƏCƏ LOGO+NAV). `hasMounted && profile?.address` — Hissə 12-nin İZAH ETDİYİ HİDRASİYA MÜHAFİZƏSİNİN BAŞQA BİR NÜMUNƏSİ. Çünki `useProfile()` HƏM DƏ SAYTIN İSTƏNİLƏN YERİNDƏ (SSR'LƏNƏ BİLƏN, ANONİM ZİYARƏTÇİ ÜÇÜN DƏ AÇILA BİLƏN ROUTE-LARDA) MOUNT OLUR, EYNİ RİSK VAR.

### `Header/components/SearchBar.tsx`

```tsx
export function SearchBar() {
    const pathname = usePathname()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [prevPathname, setPrevPathname] = useState(pathname)
    const searchRef = useRef<HTMLDivElement>(null)

    const { data: products } = useProducts(isSearchOpen)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) setIsSearchOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (pathname !== prevPathname) {
        setPrevPathname(pathname)
        setQuery('')
        setIsSearchOpen(false)
    }

    if (pathname === '/') return null

    const trimmedQuery = query.trim().toLowerCase()
    const searchResults = trimmedQuery
        ? (products ?? []).filter((product) => product.title.toLowerCase().includes(trimmedQuery))
        : []
    ...
}
```
Nöqtə-nöqtə:
- `useProducts(isSearchOpen)` — bax Hissə 12: AXTARIŞ QUTUSU AÇILMAYINCA (`isSearchOpen === false`), TAM MƏHSUL KATALOQU HEÇ ÇƏKİLMİR (PERFORMANS: HƏR ROUTE DƏYİŞİKLİYİNDƏ `Header` YENİDƏN MOUNT OLDUĞU ÜÇÜN, BUNSUZ HƏR NAVİQASİYADA TAM KATALOQ ÇƏKİLMƏYƏ ÇALIŞARDI).
- **"Route dəyişəndə query-i sıfırla" — render-zamanı state tənzimləmə (bax Hissə 12):** `Header` HƏR ROUTE-DA EYNİ QALIR (persistent), ONA GÖRƏ ÖZ LOKAL `query` STATE-İ AVTOMATİK SIFIRLANMIR — `if (pathname !== prevPathname)` BLOKU BUNU RENDER ZAMANI EDİR, `useEffect` YOX (ESLint QAYDASINI POZMAMAQ ÜÇÜN).
- `pathname === '/'` OLANDA `null` — Header, LANDING SƏHİFƏSİNDƏ SADƏCƏ LOGO+NAV, AXTARIŞ QUTUSU OLMADAN GÖRÜNÜR.
- AXTARIŞ YALNIZ `title`-A GÖRƏ FİLTRLƏYİR, TƏSVİRƏ (`description`) GÖRƏ YOX — QƏSDƏN DAR TUTULUB.

### `Header/components/NavLinks.tsx`

Bax Hissə 9 (LOGOUT AXINI) VƏ bu SESSİYADA "Hesabım" İKONUNUN/MƏTNİNİN SON DƏYİŞİKLİKLƏRİ (`User` İKONU DİGƏR NAV İKONLARI İLƏ EYNİ ÖLÇÜYƏ GƏTİRİLDİ, LOGIN OLUNUBSA "Hesabım" ƏVƏZİNƏ `profile.full_name` GÖSTƏRİLİR):

```tsx
<Link href="/account" className={...}>
    {hasMounted && profile?.img_url ? (
        <img src={profile.img_url} alt="" className="h-[30px] w-[30px] rounded-full object-cover" />
    ) : (
        <User className="h-[17px] w-[17px]" />
    )}
    {hasMounted && profile ? profile.full_name : 'Hesabım'}
</Link>
```
"Çıxış" DÜYMƏSİ YALNIZ `hasMounted && profile` OLANDA GÖRÜNÜR (bax Hissə 9) — SSR-lənən ANONİM RENDER-DƏ ƏSLA GÖRÜNMÜR.

### `Footer/index.tsx`, `Footer/constants.ts`

```tsx
export function Footer() {
    return (
        <footer className="bg-white">
            <Container className="py-12 pb-[58px]">
                <p className="text-2xl font-extrabold tracking-tight text-neutral-900">TIK TAK</p>
                <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {columns.map((column) => <FooterColumn key={column.title} column={column} />)}
                    <NewsletterForm />
                </div>
                <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Azerbaijan Supermarket. Bütün hüquqlar qorunur</p>
                    ...
                    <SocialLinks />
                </div>
            </Container>
        </footer>
    )
}
```
```ts
// constants.ts
export const columns: FooterColumn[] = [
    { title: 'Şirkət', links: [{ label: 'Xüsusi təkliflər', href: '/' }, { label: 'Haqqımızda', href: '/' }, ...] },
    { title: 'Digər', links: [...] },
    { title: 'Hüquq', links: [...] },
]
```
**BÜTÜN ALT-LİNKLƏR (12 DƏNƏ) HAZIRDA `/`-Ə İŞARƏ EDİR** — BU, QƏSDƏN, PLACEHOLDER OLARAQ SAXLANILIB. Layihə AUDİTİNDƏ BU AÇIQ QALDIRILIB, İSTİFADƏÇİ "TOXUNMA" DEYİB (REAL ALT-SƏHİFƏLƏR HƏLƏ YOXDUR) — **YENİ FUNKSİONALLIQ ƏLAVƏ EDƏNDƏ BU LİNKLƏRİ "DÜZƏLTMƏ" CƏHDİ ETMƏYİN**, İSTİFADƏÇİDƏN AYRI TƏSDİQ TƏLƏB EDİR.

`SocialLinks.tsx` — `react-icons/fa6` (Facebook, Instagram, YouTube, LinkedIn, Telegram, TikTok, WhatsApp) İKONLARI, HAMISI `#`-Ə (PLACEHOLDER) BAĞLI.

`Footer/components/FooterColumn.tsx` — `columns` MASSİVİNDƏKİ BİR ELEMENTİ (BAŞLIQ + LİNKLƏR SİYAHISI) RENDER EDƏN TƏK-VƏZİFƏLİ, TƏKRAR İSTİFADƏ OLUNAN KOMPONENT (`Footer.tsx`-in ÖZÜNDƏ `columns.map(...)` İLƏ 3 DƏFƏ ÇAĞIRILIR — bax yuxarı).

`Footer/components/NewsletterForm.tsx` — Footer-in GRİD-İNDƏ, DİGƏR 3 SÜTUNUN YANINDA 4-CÜ "SÜTUN" KİMİ GÖRÜNƏN E-POÇT ABUNƏ FORMASI — HEÇ BİR BACKEND ENDPOINT-İNƏ BAĞLI DEYİL (SADƏCƏ VİZUAL, `<form>`-UN ÖZÜ `onSubmit`-DƏ HEÇ BİR SORĞU GÖNDƏRMİR) — `columns` KİMİ, BU DA PLACEHOLDER-DİR.

### `Container/index.tsx`

```tsx
export function Container({ children, className = '' }: ContainerProps) {
    return <div className={`mx-[60px] ${className}`}>{children}</div>
}
```
Layihə-boyu TƏKRARLANAN BİR HORIZONTAL MARJ (`mx-[60px]`) — HƏR SƏHİFƏNİN MƏZMUNU EKRANIN SOL/SAĞ KƏNARINDAN 60PX ARALI OLSUN DEYƏ. `max-width` MƏHDUDLAŞDIRMASI YOXDUR (ADİ "CONTAINER" KOMPONENTLƏRİNDƏN FƏRQLİ OLARAQ) — BU LAYİHƏDƏ MƏZMUN GENİŞ EKRANLARDA TAM GENİŞLİYİ (60PX MARJDAN SONRA) DOLDURUR.

---

## Hissə 16: Səhifələr (`src/views/`)

**Qeyd:** `src/views/index.ts` barrel-i BÜTÜN AŞAĞIDAKI KOMPONENTLƏRİ export edir. Bir domendə TƏK bir SƏHİFƏ VARSA (Home, Basket, Checkout, Profile, FavoritesPage), ƏLAVƏ ALT-QOVLUQ YOXDUR — domen qovluğunun ÖZÜ birbaşa `index.tsx`+`components/` DAŞIYIR (bax Hissə 5).

### Home: `/`

```
src/views/Home/
  index.tsx                  → async Server Component, campaignService.list() birbaşa await edir
  components/
    BannerCarousel.tsx        → əsas kampaniya banner-i (üst, böyük) — mount olanda TƏSADÜFİ sıraya qarışdırılır
    SpecialOffers.tsx         → "Xüsusi təkliflər" bölməsi (button-suz PromoBanner-lər) — mount olanda 4 TƏSADÜFİ kampaniya seçilir
    PromoBanner.tsx           → HƏR İKİ karuseldə İSTİFADƏ OLUNAN tək banner kartı
    StatCard.tsx, StatsSection.tsx → "Bizim göstəricilər" (HARDCODE data, bax Hissə 11-in stats.service.ts izahı)
```

```tsx
export async function HomePage() {
  const campaigns: Campaign[] = await campaignService.list().then((res) => res.data).catch(() => [])
  return (
    <Container className="space-y-14 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BannerCarousel campaigns={campaigns} />
      <SpecialOffers campaigns={campaigns} />
      <StatsSection />
    </Container>
  )
}
```
**YEGANƏ SƏHİFƏ ki, `async function` Server Component-dir VƏ `campaignService.list()`-i BİRBAŞA `await` edir** (`useEffect` YOX, `serviceGet` DA YOX) — çünki `/campaigns` YEGANƏ HƏQİQƏTƏN AÇIQ endpoint-dir (bax Hissə 11). `<script type="application/ld+json">` — STRUKTURLAŞDIRILMIŞ DATA (Organization + WebSite schema), AXTARIŞ MOTORLARININ SAYTI DAHA YAXŞI ANLAMASI ÜÇÜN (bax Hissə 17). `BannerCarousel`/`SpecialOffers` EYNİ TAM `campaigns` MASSİVİNİ ALIR (ARTIQ Home-un ÖZÜ `.slice(0, 4)` ETMİR) — hər komponent ÖZÜ, ÖZ TƏRƏFİNDƏ qarışdırır/seçir (bax aşağı).

#### Kampaniyaların TƏSADÜFİ sırada göstərilməsi (`shuffle`)

Əvvəllər `SpecialOffers` HƏMİŞƏ eyni ilk 4 kampaniyanı, EYNİ sırada göstərirdi (`campaigns.slice(0, 4)`, Home-un özündə). İndi HƏM `BannerCarousel`, HƏM DƏ `SpecialOffers` səhifə hər açılanda (hər `mount`-da) fərqli, qarışdırılmış sırada gəlir:

```ts
// src/shared/utils/shuffle.ts
export function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
```
Bu, klassik **Fisher–Yates** qarışdırma alqoritmidir — massivi SONDAN BAŞLAYARAQ gəzir, hər addımda cari elementi TƏSADÜFİ seçilmiş, hələ "qarışdırılmamış" bir elementlə DƏYİŞDİRİR (`[a, b] = [b, a]` — array destructuring ilə İKİ dəyişənin dəyərini VASİTƏÇİSİZ dəyişmək). Nəticə: HƏR SIRALAMA eyni ehtimalla çıxır, `.sort(() => Math.random() - 0.5)` kimi "sadə" AMMA STATİSTİK CƏHƏTDƏN QƏRƏZLİ üsullardan fərqli olaraq.

`SpecialOffers.tsx`-də istifadəsi:
```tsx
const DISPLAY_COUNT = 4

export function SpecialOffers({ campaigns, perPage = 2 }: CampaignCarouselProps) {
    const [displayed, setDisplayed] = useState<Campaign[]>(() => campaigns.slice(0, DISPLAY_COUNT))

    useEffect(() => {
        setDisplayed(shuffle(campaigns).slice(0, DISPLAY_COUNT))
    }, [campaigns])
    // ...
    {displayed.map((campaign) => ( ... ))}
}
```
`BannerCarousel.tsx`-də (bütün kampaniyalar göstərilir, sadəcə SIRASI qarışdırılır — say məhdudlaşdırılmır):
```tsx
export function BannerCarousel({ campaigns, perPage = 2 }: CampaignCarouselProps) {
    const [displayed, setDisplayed] = useState<Campaign[]>(campaigns)

    useEffect(() => {
        setDisplayed(shuffle(campaigns))
    }, [campaigns])
    // ...
    {displayed.map((campaign, index) => ( ... ))}
}
```
**Niyə birbaşa render zamanı yox, `useEffect` içində qarışdırılır?** Bu SƏHİFƏ SSR olunur (`revalidate = 300`, bax Hissə 4/8) — server, HTML-i hazırlayanda `Math.random()` çağırsaydı, server-in ÇIXARDIĞI sıra ilə brauzerin İLK render-i (hydration) FƏRQLİ olardı → React-in "hydration mismatch" xətası (bax Hissə 12/14-də `useHasMounted` izahındakı EYNİ problem). Ona görə: **ilkin `useState`** serverlə EYNİ, dəyişməz sıranı saxlayır (`SpecialOffers`-də ilk 4, `BannerCarousel`-də olduğu kimi) — bu, server-in göndərdiyi HTML-lə HƏRFİ EYNİDİR. Yalnız komponent brauzerdə mount OLDUQDAN SONRA (`useEffect`, boş asılılıq YOX, `[campaigns]` asılılığı ilə — kampaniyalar dəyişsə YENİDƏN qarışdırılsın deyə) qarışdırma İCRA OLUNUR VƏ YENİ render TƏTİQ EDİLİR. Nəticə: istifadəçi ÜÇÜN demək olar ANINDA (bir "beat" sonra) təsadüfi sıra görünür, AMMA heç bir hydration xətası/console xəbərdarlığı YARANMIR.

`shuffle` funksiyası `src/shared/utils/shuffle.ts`-də YAZILIB (React-siz, plain helper — Hissə 5-in "utils" qaydasına uyğun) ki, HƏR İKİ komponent EYNİ kodu TƏKRARLAMASIN.

### Auth: `/login`, `/register`

```
src/views/Auth/
  AuthPage/
    index.tsx        → bölünmüş ekran (sol YAŞIL illüstrasiya, sağ FORMA), tab STATE-i
    constants.ts      → zod SXEMLƏRİ (loginSchema, registerSchema), TƏKRARLANAN CSS SİNİF STRİNQLƏRİ
    utils.ts          → digitsFromPhoneValue, formatPhoneValue (TELEFON FORMATLAMA)
    components/
      LoginForm.tsx, RegisterForm.tsx
      PhoneField.tsx         → generic `<T extends FieldValues>` — HƏM login, HƏM register formunda İŞLƏDİLİR
      PasswordVisibilityToggle.tsx, PasswordVisibilityIcon.tsx
  LoginPage/index.tsx    → <AuthPage initialTab="login" />
  RegisterPage/index.tsx → <AuthPage initialTab="register" />
```

`AuthPage/index.tsx` — SOL PANEL:
```tsx
<div className="relative hidden w-1/2 flex-shrink-0 overflow-hidden rounded-tr-[8px] rounded-br-[8px] bg-fern text-white md:block">
    <p className="absolute z-10" style={{ width: '400px', top: '30px', left: '40px', fontSize: '80px', ... }}>TIK TAK</p>
    <div className="absolute top-6 right-0 bottom-6 left-0">
        <Image src="/images/auth-illustration.webp" alt="" fill priority sizes="50vw" className="object-cover object-left" />
    </div>
</div>
```
**BU SESSİYADA DƏQİQLƏŞDİRİLƏN DETALLAR:**
- `<Image fill className="object-cover object-left">` — ŞƏKİL, KONTEYNERDƏN (YAŞIL PANEL) DAHA GENİŞ NİSBƏTDƏ OLDUĞU ÜÇÜN, `object-cover` ONU HÜNDÜRLÜYƏ GÖRƏ ÖLÇÜLƏNDİRİB YAN TƏRƏFLƏRDƏN KƏSİR. `object-left` (DEFOLT MƏRKƏZ ƏVƏZİNƏ) KƏSMƏNİ SOL KƏNARDAN BAŞLAYIR — ÇÜNKİ MƏRKƏZ-KƏSMƏ İKİ ÇİYƏLƏYİ (VİZUAL "SUBYEKTİ") BƏRABƏR KƏSİRDİ, SOL-BİASLI KƏSMƏ İSƏ ONLARI TAM SAXLAYIR.
- Sağ tərəf KƏNAR BOŞLUĞU (`top-6 right-0 bottom-6 left-0` — YALNIZ ÜST/ALT 24PX, SOL/SAĞ 0PX) — ŞƏKLİN ÖZÜNÜ BİR AZ KİÇİLTMƏK ÜÇÜN AYRICA BİR "WRAPPER" `<div>`-Ə YERLƏŞDİRİLİB (`fill` PROP-U İLƏ Image-in ÖZÜNƏ birbaşa `style` VASİTƏSİLƏ İNSET VERMƏK, BU LAYİHƏNİN Next.js VERSİYASINDA REAL BİR RUNTIME XƏTASINA (ERROR BOUNDARY-Yə DÜŞMƏYƏ) SƏBƏB OLUR — DÜZGÜN ÜSUL, AYRI BİR `position:absolute` WRAPPER `<div>` YARADIB `fill`-İ O WRAPPER-Ə TƏTBİQ ETMƏKDİR).
- Yaşıl PANELİN ÖZÜNÜN SAĞ KÜNCLƏRİ `rounded-tr-[8px] rounded-br-[8px]` — YALNIZ SAĞ TƏRƏF (SOL KÜNCLƏR EKRAN KƏNARINDA OLDUĞU ÜÇÜN GÖRÜNMÜR, DƏYİRMİLƏŞDİRMƏYƏ EHTİYAC YOXDUR).

### Category: `/categories`, `/categories/[id]`, `/categories/[id]/products/[productId]`

Bax Hissə 8 ("Persistent Layout" NÜMUNƏSİ, TAM KODLA).

```
src/views/Category/
  CategoriesPage/index.tsx               → /categories-in ÖZÜ (Server Component)
  CategoryDetailLayout/index.tsx          → persistent shell (sidebar + basket panel)
  CategoryProductsSection/index.tsx       → grid, /categories/[id]-nin page.tsx-i üçün
  CategoryProductDetailSection/index.tsx  → /categories/[id]/products/[productId] üçün
```

`CategoriesPage/index.tsx`:
```tsx
export async function CategoriesPage() {
    const categories: Category[] = await serviceGet<ApiResponse<Category[]>>('/categories').then((res) => res.data).catch(() => [])
    return (
        <Container className="py-6">
            <h1 className="sr-only">Kateqoriyalar</h1>
            <div className="flex items-start gap-4">
                <div className="relative hidden h-[485px] w-[280px] flex-shrink-0 rounded-2xl bg-fern sm:block">
                    <Image src={categoryBanner} alt="" priority className="absolute top-0 left-1/2 z-50 h-[300px] w-auto max-w-none -translate-x-[38%]" />
                    ...
                </div>
                <div className="grid flex-1 grid-cols-2 content-start gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
                </div>
            </div>
        </Container>
    )
}
```
`<h1 className="sr-only">` — VİZUAL OLARAQ GİZLİ, AMMA EKRAN OXUYUCULARI (accessibility) VƏ AXTARIŞ BOTLARI ÜÇÜN SƏHİFƏNİN ƏSAS BAŞLIĞINI TƏMİN EDİR (SƏHİFƏNİN ÖZÜNDƏ VİZUAL "Kateqoriyalar" YAZISI YOXDUR, YALNIZ KART GRİD-İ). `categoryBanner` STATİK ŞƏKİL (`tiktak-login.webp`, HƏMİN LOGIN SƏHİFƏSİNDƏKİ EYNİ ŞƏKİL) — `next/image`-Ə OBYEKTİN ÖZÜ (`.src` YOX) VERİLİR, BU İKİ STATİK BANNER (BURADA VƏ `CategoryDetailLayout`-DA) ÜÇÜN QƏSDƏN EDİLƏN BİR İSTİSNADIR (bax Hissə 5).

`CategoryDetailLayout/index.tsx` — HÜNDÜRLÜK UYĞUNLAŞDIRMASININ PURE-CSS HƏLLİ:
```tsx
<div className="flex items-stretch gap-4">
    <div className="relative w-[280px] flex-shrink-0">...</div>   {/* SİDEBAR — YEGANƏ REAL MƏZMUN HÜNDÜRLÜYÜ */}
    <div className="relative flex-1">
        <div className="absolute inset-0">{children}</div>          {/* GRİD — ÖZ HÜNDÜRLÜYÜNÜ VERMİR */}
    </div>
    <BasketSidebarPanel fill />                                     {/* BASKET — ÖZ HÜNDÜRLÜYÜNÜ VERMİR */}
</div>
```
`items-stretch` (DEFOLT) — HƏR ÜÇ SÜTUNU EYNİ HÜNDÜRLÜYƏ "DARTIR". SİDEBAR — YEGANƏ SÜTUNDUR Kİ, İÇİNDƏKİ MƏZMUN NORMAL AXINDA (in-flow) YERLƏŞİB, ONA GÖRƏ ÖZ TƏBİİ HÜNDÜRLÜYÜNÜ VERİR. ORTA SÜTUN (grid) VƏ `BasketSidebarPanel` İSƏ `relative` WRAPPER-DİR, İÇİNDƏKİ HƏQİQİ MƏZMUN `absolute inset-0`-DIR — DEMƏLİ ÖZLƏRİ HEÇ BİR HÜNDÜRLÜYƏ TÖHVƏ VERMİR, SADƏCƏ SİDEBAR-IN TƏBİİ HÜNDÜRLÜYÜNƏ "DARTILIRLAR". **Bu, ƏVVƏLKİ BİR `ResizeObserver`/`requestAnimationFrame` ƏSASLI JS HƏLLİNİ (`useCategorySidebarHeight` — İNDİ SİLİNİB) ƏVƏZ EDİB** — O HƏLL SSR'LƏNMİŞ "SOYUQ" YÜKLƏMƏLƏRDƏ GÖRÜNƏN BİR "SIÇRAYIŞ" (JS HİDRASİYASI HƏLƏ ÇATMADIĞI ÜÇÜN PANEL BİR ANLIQ ÖZ TƏBİİ ÖLÇÜSÜNDƏ GÖRÜNÜB SONRA "DÜZ ÖLÇÜYƏ SIÇRAYIRDI") YARADIRDI. **Pure CSS HİDRASİYA VAXTINDAN HEÇ ASILI DEYİL, BUNU YENİDƏN GƏTİRMƏYİN.**

### Product: `/products`, `/products/[id]`

```
src/views/Product/
  ProductsPage/index.tsx    → Server Component, serviceGet-lə tam kataloqu çəkir
  ProductsGrid/index.tsx    → Client, paginasiya (5×2=10), BasketSidebarPanel (height rejimi)
  ProductDetailPage/index.tsx → /products/[id], ProductDetailContent-i sarır
```

`ProductsGrid/index.tsx`-in PAGİNASİYA HESABLAMASI:
```tsx
const COLUMNS = 5
const VISIBLE_ROWS = 2
const PAGE_SIZE = COLUMNS * VISIBLE_ROWS   // 10
const BASKET_PANEL_HEIGHT = 594
const VIEWPORT_RESERVED = 180
const clampToViewport = (px: number) => `min(${px}px, calc(100vh - ${VIEWPORT_RESERVED}px))`
```
`clampToViewport` — CSS-in `min()` FUNKSİYASINI İŞLƏDİR: PANEL HÜNDÜRLÜYÜ HƏMİŞƏ `594px`-Dİr, AMMA KİÇİK VİEWPORT-LARDA (QISA EKRANLAR) `100vh - 180px`-DƏN BÖYÜK OLMASIN DEYƏ MƏHDUDLAŞDIRILIR — BU, JS OLMADAN, SADƏCƏ CSS İLƏ EDİLƏN RESPONSİV BİR MƏHDUDİYYƏTDİR. **Bu SƏHİFƏNİN Uİ-Sİ Categories/Favorites-in VİZUAL DİLİNƏ UYĞUNLAŞDIRILIB** — köhnə `ProductCard.tsx` (PLACEHOLDER-ŞƏKİLLİ) SİLİNİB, `CategoryProductCard` BÜTÜN GRİD-LƏRDƏ (KATEQORİYA/SEVİMLİ/MƏHSUL) ORTAQ İŞLƏDİLİR.

**Qeyd:** `/products` SƏHİFƏSİNƏ HEÇ BİR UI GİRİŞ NÖQTƏSİ (NAV LİNK, LANDING CTA) YOXDUR — YALNIZ BİRBAŞA URL İLƏ ÇATILA BİLƏR. `/categories` LANDING SƏHİFƏSİNİN PROMO BANNERLƏRİNDƏN LİNK ALIR. **Bu, AÇIQ QALDIRILIB (İSTİFADƏÇİ SƏHİFƏNİ ƏVVƏLCƏ YENİDƏN DİZAYN ETMƏYİ SEÇİB, NAV LİNK-İ SONRAYA SAXLAYIB) — SORUŞMADAN NAV LİNK ƏLAVƏ ETMƏYİN.**

### Basket: `/basket`

```
src/views/Basket/
  index.tsx                → BasketPage komponenti, İKİ SÜTUN (siyahı + total kartı)
  components/
    BasketPageItemRow.tsx   → HƏR SƏTİR (BasketSidebarPanel-in BasketItemRow-undan FƏRQLİ — DAHA GENİŞ MAKET)
    BasketTotalCard.tsx     → sağ sütunda, "Sifarişi tamamla" → /checkout
```
`BasketSidebarPanel/BasketItemRow.tsx` (kompakt sidebar üçün) VƏ BU FAYL (`BasketPageItemRow.tsx`, tam SƏHİFƏ üçün) OXŞAR AMMA AYRI KOMPONENTLƏRDİR — çünki MAKETLƏRİ FƏRQLİDİR (SIDEBAR-DA KİÇİK KART, TAM SƏHİFƏDƏ GENİŞ SƏTİR), BİRLƏŞDİRMƏK ARTIQ ŞƏRTLİ MƏNTİQ (`compact` KİMİ BİR PROP) TƏLƏB EDƏRDİ — BU LAYİHƏDƏ BU İKİ KOMPONENT AYRI SAXLANILIB.

### Checkout: `/checkout` — AYRI DOMEN, Basket-in ALT-HİSSƏSİ DEYİL

```
src/views/Checkout/
  index.tsx           → CheckoutPage komponenti
  constants.ts         → CONFIRM_SECONDS (təsdiq modalının geri-sayımı), PAYMENT_METHOD_LABELS
  components/
    OrderDetailsCard.tsx     → ad/ünvan/telefon (READONLY, profildən) + qeyd + ödəniş metodu + "Sifarişi tamamla"
    OrderSummaryCard.tsx     → sağ sütun, səbətin XÜLASƏSİ (miqdar × başlıq, YEKUN)
    PaymentMethodOption.tsx  → tək bir ödəniş SEÇİMİ (NAĞD/KART)
    ConfirmOrderModal.tsx    → geri-sayımlı təsdiq MODALI (CONFIRM_SECONDS bitəndə AVTO-BAĞLANIR)
    OrderSuccessModal.tsx    → uğur EKRANI
```
**Bu domen Basket-dən AYRIDIR** — Checkout, səbətin sadəcə "GÖRÜNÜŞÜ" DEYİL, ÖZ AXINI (ÜNVAN+ÖDƏNİŞ+TƏSDİQ+UĞUR) OLAN AYRI BİR MƏRHƏLƏDİR, ONA GÖRƏ ÖZ DOMEN QOVLUĞUNU ALIR.

`index.tsx`-in ƏSAS MƏNTİQİ:
```tsx
const [modalStep, setModalStep] = useState<'idle' | 'confirming' | 'success'>('idle')

const handleOpenConfirm = () => {
    if (!profile?.address) { setError('Sifariş vermək üçün ünvanınızı əlavə edin'); return }
    setError(null)
    setModalStep('confirming')
}

const handleConfirmOrder = () => {
    if (!profile?.address) return
    setSubmitting(true)
    orderService.checkout({ paymentMethod, note: note || undefined, address: profile.address, phone: profile.phone })
        .then(() => {
            queryClient.invalidateQueries({ queryKey: basketQueryKey })
            queryClient.invalidateQueries({ queryKey: ordersQueryKey })
            setModalStep('success')
            setTimeout(() => router.push('/account/orders'), 2000)
        })
        .catch(() => { setModalStep('idle'); setError('Sifariş tamamlanmadı, yenidən cəhd edin') })
        .finally(() => setSubmitting(false))
}
```
`modalStep`-in ÜÇ VƏZİYYƏTİ — SADƏ BİR `boolean`-DAN ÇOX DAHA AYDINDIR ("MODAL AÇIQDIRMI" SUALI KİFAYƏT ETMİR, ÇÜNKİ İKİ FƏRQLİ MODAL VAR, VƏ BİRİ O BİRİNİ ƏVƏZ EDİR, EYNİ ANDA GÖRÜNMÜR). SİFARİŞ UĞURLA GEDƏNDƏ, HƏM `basket` (İNDİ BOŞDUR), HƏM `orders` (YENİ SİFARİŞ ƏLAVƏ OLUNUB) CACHE-Ləri `invalidate` EDİLİR — SONRA 2 SANİYƏLİK BİR GECİKMƏDƏN (İSTİFADƏÇİ UĞUR EKRANINI GÖRSÜN DEYƏ) `/account/orders`-A YÖNLƏNDİRİLİR. `ResizeObserver` — `detailsCardRef`-in HÜNDÜRLÜYÜNÜ İZLƏYİR, SAĞ SÜTUNDAKI `OrderSummaryCard`-A EYNİ HÜNDÜRLÜYÜ VERMƏK ÜÇÜN (BU, `CategoryDetailLayout`-UN PURE-CSS HƏLLİNDƏN FƏRQLİ OLARAQ, HƏLƏ DƏ JS-ÖLÇMƏ İŞLƏDİR — ÇÜNKİ Checkout SƏHİFƏSİ SSR'LƏNMİR, YALNIZ AUTH-QORUNAN CLIENT SƏHİFƏDİR, HİDRASİYA-VAXTLAMA RİSKİ YOXDUR).

### Account: `/account`, `/account/orders`, `/account/orders/:id`

```
src/views/Account/
  AccountLayout/
    index.tsx                  → sidebar + card çərçivəsi ("Hesabım" başlığı BURADA)
    components/AccountSidebarNav.tsx
    constants.ts                → NAV_ITEMS ([{href, label, icon}, ...])
  AccountPage/
    index.tsx                   → forma (Adınız/Telefon/Email/Ünvan + şifrə + avatar)
    constants.ts                 → updateSchema (zod)
    components/AvatarUploader.tsx, PersonalInfoFields.tsx, PasswordFields.tsx
```
`AccountLayout/components/AccountSidebarNav.tsx` — AKTİV-VƏZİYYƏT UYĞUNLAŞDIRMASI ASİMMETRİKDİR:
```tsx
const isActive = href === '/account' ? pathname === '/account' : pathname.startsWith(href)
```
`/account` DƏQİQ UYĞUNLUQ TƏLƏB EDİR (ƏKS HALDA `/account/orders`-DA DA "İŞIQLANARDI"), AMMA `/account/orders` `startsWith` İSTİFADƏ EDİR (ki, `/account/orders/:id` DETAL SƏHİFƏSİNDƏ DƏ AKTİV QALSIN). **Header-in "Hesabım" NAV LİNK-İ DƏ EYNİ ASİMMETRİK PATTERN-İ İŞLƏDİR** (`pathname.startsWith('/account')`).

`AccountPage/index.tsx`-in AVATAR YÜKLƏMƏ AXINI (real bir BUG-DAN sonra DÜZƏLDİLİB):
```tsx
const handleAvatarSelect = async (file: File) => {
    const objectUrl = URL.createObjectURL(file)
    setAvatarPreview(objectUrl)   // ANİ, LOKAL ÖNİZLƏMƏ (server cavabını GÖZLƏMİR)
    setUploadingAvatar(true)

    let uploadedUrl: string
    try {
        uploadedUrl = (await uploadService.upload(file)).data.url
    } catch {
        toast.error('Şəkil yüklənmədi, yenidən cəhd edin')
        setAvatarPreview(profile?.img_url ?? null)
        setUploadingAvatar(false)
        return
    }

    try {
        await updateProfile.mutateAsync({
            img_url: uploadedUrl,
            full_name: profile?.full_name,     // MÜTLƏQ YENİDƏN GÖNDƏRİLMƏLİDİR!
            address: profile?.address ?? undefined,  // MÜTLƏQ YENİDƏN GÖNDƏRİLMƏLİDİR!
        })
    } catch {
        setAvatarPreview(profile?.img_url ?? null)
    } finally {
        setUploadingAvatar(false)
    }
}
```
**BU, LAYİHƏDƏ BİR DƏFƏ HƏQİQƏTƏN "İSIRAN" BİR BUG İDİ:** `PUT /profile` HƏQİQİ BİR PUT-DUR — SADƏCƏ `{ img_url }` GÖNDƏRSƏNİZ, `full_name`/`address` KİMİ DİGƏR SAHƏLƏR BOŞ/İTİRİLMİŞ QALIR (backend BUNLARI PARTIAL PATCH KİMİ DAVRANMIR). Ona görə AVATAR YÜKLƏMƏSİ, `img_url`-Ə ƏLAVƏ OLARAQ, CARİ `full_name`/`address`-İ DƏ HƏR DƏFƏ YENİDƏN GÖNDƏRİR. **`profileService.update()`-Ə PARTIAL PAYLOAD GÖNDƏRMƏYİN.**

FORMANIN YÜKLƏNMƏSİ, `useProfile()` NƏTİCƏSİ GƏLƏNDƏ, RENDER-ZAMANI STATE TƏNZİMLƏMƏSİ İLƏ SİNXRONLAŞIR (bax Hissə 12):
```tsx
if (profile && profile.img_url !== lastSyncedImgUrl) {
    setLastSyncedImgUrl(profile.img_url)
    setAvatarPreview(profile.img_url)
}
```

### Orders: `/account/orders`, `/account/orders/:id`

```
src/views/Orders/
  OrdersPage/
    index.tsx            → cədvəl + pagination (PAGE_SIZE=7)
    constants.ts           → PAGE_SIZE
    components/OrdersTable.tsx
  OrderDetailSection/
    index.tsx             → tək sifarişin detalı
    constants.ts            → PAYMENT_METHOD_LABELS
    components/OrderInfoGrid.tsx, OrderItemsList.tsx
```
`OrdersTable.tsx` — ADİ HTML `<table>` (HEÇ BİR KİTABXANA YOX, bax Hissə 19-un "hansı paketdən gəlir" SUALININ CAVABI: HEÇ BİRİNDƏN, ƏL İLƏ YAZILIB). Sütunlar: `orderNumber`, `formatDate(createdAt)`, `address`, `items.reduce(sum, quantity)`, `total`/`deliveryFee`, `ORDER_STATUS_LABELS[status]` (RƏNGLİ), "detallar" LİNKİ.

`OrderDetailSection/index.tsx`:
```tsx
export function OrderDetailSection({ orderId }: OrderDetailSectionProps) {
    const { data: order, isLoading } = useOrder(orderId)

    useEffect(() => {
        if (order) document.title = `Sifariş #${order.orderNumber} | TIK TAK`
    }, [order])

    ...
    return (
        <div className="flex max-h-[calc(100vh-260px)] flex-col">
            <BackButton onClick={() => router.push('/account/orders')} />
            <OrderInfoGrid order={order} />
            <OrderItemsList items={order.items} total={order.total} />
        </div>
    )
}
```
`max-h-[calc(100vh-260px)]` — BÜTÜN KART VİEWPORT-A GÖRƏ MƏHDUDLAŞDIRILIB, YALNIZ İÇİNDƏKİ MƏHSUL SİYAHISI (`OrderItemsList`-in ÖZ `overflow-y-auto`-U) SCROLL EDİR — BELƏLİKLƏ SƏHİFƏNİN ÖZÜ HEÇ VAXT SƏHİFƏ-SƏVİYYƏLİ SCROLL-A KEÇMİR.

### Favorites: `/favorites`, `/favorites/:id`

```
src/views/FavoritesPage/
  index.tsx        → EYNİ komponent /favorites VƏ /favorites/[id] ÜÇÜN
  constants.ts       → PAGE_SIZE, PANEL_HEIGHT, BASKET_PANEL_HEIGHT
  utils.ts           → clampToViewport
  components/FavoritesGrid.tsx
```

```tsx
export function FavoritesPage() {
    const params = useParams<{ id?: string }>()
    const searchParams = useSearchParams()
    const selectedProductId = params.id ? Number(params.id) : null
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)
    ...
    return (
        <Container>
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    {selectedProductId ? (
                        <ProductDetailContent productId={selectedProductId} onBack={() => router.push(`/favorites?page=${currentPage}`)} ... />
                    ) : !favorites || favorites.length === 0 ? (
                        <EmptyStateCard ... />
                    ) : (
                        <FavoritesGrid products={pagedFavorites} onSelect={(id) => router.push(`/favorites/${id}?page=${currentPage}`)} ... />
                    )}
                </div>
                <BasketSidebarPanel height={...} />
            </div>
        </Container>
    )
}
```
**Klik naviqasiya ETMİR (BAŞQA SƏHİFƏLƏRDƏN FƏRQLİ OLARAQ)** — `CategoryProductCard`-IN `onSelect` PROP-U İŞLƏDİLİR, GRID İNLİN `ProductDetailContent`-LƏ ƏVƏZLƏNİR, BASKET PANELİ SAĞDA UNMOUNT OLMUR (bax Hissə 8-in "Persistent" FƏLSƏFƏSİNİN AYNI, AMMA LOCAL-STATE VERSİYASI). `?page=` URL-DƏ SAXLANILIR (`router.push('/favorites/${id}?page=${currentPage}')`) MƏHZ ONUN ÜÇÜN Kİ, DETAL-A KEÇİB GERİ QAYIDANDA HANSI SƏHİFƏDƏ OLDUĞUNUZ İTMƏSİN. **`src/app/favorites/[id]/page.tsx` HƏM DƏ EYNİ `FavoritesPage`-İ RENDER EDİR** — komponent ÖZÜ `useParams().id` VƏ `useSearchParams().get('page')`-İ OXUYUR, PROP KİMİ ALMIR.

### Köhnə `/profile`

```
src/views/Profile/index.tsx   → köhnə, useState+useEffect pattern-i (bax Hissə 8-in son qeydi)
```

---

## Hissə 17: SEO

### `src/shared/utils/seo.ts`

```ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiktak.az'
export const SITE_NAME = 'TIK TAK'

export function buildMetadata({ title, description, path, robots }: BuildMetadataOptions): Metadata {
    return {
        title,
        description,
        alternates: { canonical: path },
        robots: robots ?? { index: false, follow: false },
        openGraph: { title, description, url: path, siteName: SITE_NAME },
        twitter: { title, description },
    }
}
```
`buildMetadata` — HƏR `page.tsx`-in `metadata`/`generateMetadata`-SININ KEÇMƏLİ OLDUĞU MƏRKƏZİ FUNKSİYA (BƏSİT OBYEKT LİTERALI YOX). Nə EDİR:
- `alternates.canonical` — AXTARIŞ MOTORLARINA "BU SƏHİFƏNİN ƏSAS URL-İ BUDUR" DEYİR (DUBLIKAT MƏZMUN QARIŞIQLIĞININ QARŞISINI ALIR).
- `openGraph`/`twitter`-Ə title/description-U AVTOMATİK KÖÇÜRÜR — Next.js BUNU AVTOMATİK ETMİR, HƏR SƏHİFƏ ÖZ `openGraph.title`-INI AYRICA YAZMALI OLARDI, BU FUNKSİYA HƏMİN TƏKRARI ARADAN QALDIRIR.
- `robots`-un DEFOLTU `{ index: false, follow: false }`-DUR — **HƏR SƏHİFƏ İNDEKSLƏNMƏYƏ QƏSDƏN "OPT-IN" ETMƏLİDİR, ƏKSİNƏ YOX.** YALNIZ `/` (`src/app/page.tsx`) `robots: { index: true, follow: true }` ÖTÜRÜR.

### `src/app/robots.ts`

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/categories", "/products", "/favorites", "/basket", "/checkout", "/account"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```
Bu, `next.config.ts`-dən DEYİL, BİR "FILE CONVENTION"DIR (bax Hissə 4) — Next.js `robots.ts`-i AVTOMATİK TANIYIR VƏ `/robots.txt`-Ə ÇEVİRİR. `disallow` SİYAHISI — botlara "bu YOLLARI CRAWL ETMƏ" DEYİR (AUTH-QORUNAN/ANONİM-ÜÇÜN-MƏNASIZ ROUTE-LAR — DİQQƏT: `/categories`, `/products` DA BURADADIR, ÇÜNKİ SERVICE-ACCOUNT SSR OLSA BELƏ, ONLARIN MƏZMUNU HƏR ZİYARƏTÇİ ÜÇÜN EYNİDİR VƏ SEO-CA "UNİKAL DƏYƏR" DAŞIMIR, bax `buildMetadata`-nın DEFOLT NOINDEX-İ).

### `src/app/sitemap.ts`

```ts
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: BUILD_TIME, changeFrequency: "daily", priority: 1 }];
}
```
`BUILD_TIME` — MODUL YÜKLƏNƏNDƏ (SERVER PROSESİ BAŞLAYANDA) BİR DƏFƏ HESABLANIR, `new Date()` HƏR SORĞUDA YOX — BELƏLİKLƏ SITEMAP HƏR CRAWL-DA "İNDİCƏ DƏYİŞDİ" KİMİ YALAN DEMİR. Sitemap QƏSDƏN YALNIZ `/`-İ SADALAYIR — QALAN HƏR ŞEY YA AUTH-QORUNAN, YA DA (`/categories`/`/products` KİMİ) HƏR ZİYARƏTÇİ ÜÇÜN EYNİ MƏZMUNLU OLDUĞU ÜÇÜN NOINDEX-DİR.

### `src/app/opengraph-image.tsx`, `twitter-image.tsx`, `icon.tsx`, `apple-icon.tsx`

```tsx
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#114F2E" }}>
        <div style={{ display: "flex", fontSize: 140, fontWeight: 800, color: "#ffffff" }}>TIK TAK</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 36, color: "#92D871" }}>Onlayn Supermarket</div>
      </div>
    ),
    { ...size },
  );
}
```
`next/og`-un `ImageResponse`-i — JSX-i SORĞU ANINDA (request-time) BİR ŞƏKİL FAYLINA ("render" EDİR) ÇEVİRƏN XÜSUSİ BİR API (STATİK BİR PNG FAYLI YÜKLƏMİR — ONU DİNAMİK "ÇƏKİR"). Brend YAŞILI (`#114F2E`) FON, SİSTEM SANS-SERİF FONT (XARİCİ FONT SORĞUSU YOXDUR — sürətli, ETİBARLI). Bu FAYLLAR YAZILIB, ÇÜNKİ LAYİHƏDƏ HEÇ BİR LOGO/BREND ŞƏKLİ ASSET-İ YOXDUR.

### `HomePage` — YEGANƏ GENUİN SSR'LƏNMİŞ SƏHİFƏ

`/` (`HomePage`) BÜTÜN LAYİHƏDƏ SEO MƏQSƏDİLƏ HƏQİQƏTƏN SSR'LƏNMİŞ YEGANƏ SƏHİFƏDİR — `async function` Server Component-dir, `campaignService.list()`-i BİRBAŞA `await` EDİR (bax Hissə 16).

### Auth-qorunan detal SƏHİFƏLƏRİNİN "BEST-EFFORT" BAŞLIQLARI

`ProductDetailContent.tsx`, `OrderDetailSection.tsx` KİMİ ŞƏXSİ ROUTE-LAR ÜÇÜN HƏQİQİ SERVER-RENDERED `<title>` (`generateMetadata`) ALINMIR (EYNİ `localStorage`-ONLY-AUTH PROBLEMİ) — ONA GÖRƏ `document.title`-İ CLIENT-SIDE, BİR `useEffect`-DƏ, DATA YÜKLƏNƏNDƏ SİNXRONLAŞDIRIRLAR (bax Hissə 13/16). **BU, QƏSDƏN BİR "BEST-EFFORT" ÜSULDUR** (BROWSER TAB BAŞLIĞI ÜÇÜN), `generateMetadata`-NIN "SINDIĞININ" ƏLAMƏTİ DEYİL.

---

## Hissə 18: Stil

Tailwind CSS 4 — CSS faylı yazmaq əvəzinə, birbaşa JSX-də `className` sinifləri. `globals.css`-in başında `@import "tailwindcss";` — TAILWIND-İN ÖZÜNÜN GİRİŞ NÖQTƏSİ (Tailwind 4-ün YENİ CSS-FIRST konfiqurasiya ÜSULU, ƏVVƏLKİ `tailwind.config.js` FAYLI ARTIQ TƏLƏB OLUNMUR).

### Dizayn token-ləri

```css
:root {
  --primary: #114F2E;
  --primary-dark: #0d3c23;
  --mint: #92D871;
  --mint-dark: #7CB760;
  --mint-pale: #C0E8AD;
  --emerald: #0A955E;
  --emerald-dark: #087a4b;
  --emerald-pale: #EFF9EA;
  --danger: #F4A6A6;
  --danger-dark: #EF8A8A;
  --fern: #76CB4F;
  --lime: #78BC1E;
  --teal: #007057;
  --badge: #F5C518;
  ...
}

@theme inline {
  --color-primary: var(--primary);
  --color-mint: var(--mint);
  ...
  --font-sans: var(--font-roboto);
}
```
`:root` bloku — ADİ CSS DƏYİŞƏNLƏRİ (CUSTOM PROPERTIES), `@theme inline` bloku isə TAILWIND-Ə "BU DƏYİŞƏNLƏRDƏN `bg-primary`, `text-mint` KİMİ UTİLİTY SİNİFLƏR YARAT" DEYİR. BU İKİ-QATLI SİSTEM SAYƏSİNDƏ, HEX KODUNU BİR YERDƏ (`:root`) DƏYİŞMƏK, BÜTÜN SAYT BOYU `bg-primary` İŞLƏDƏN HƏR YERİ AVTOMATİK YENİLƏYİR.

**Brend rəngi `--primary: #114F2E` (yaşıl)** — `text-primary`/`bg-primary`/`border-primary` KİMİ İŞLƏDİLİR, HEX KODU BAŞQA YERDƏ BİRBAŞA YAZILMIR. **İSTİSNA:** BƏZİ KATEQORİYA-SƏHİFƏ ELEMENTLƏRİ (`#92D871` = `--mint`, `#0A955E` = `--emerald`, `#76CB4F` = `--fern`) `--primary`-YƏ VİZUAL OXŞAR, AMMA AYRI TOKEN-LƏRDİR — MÖVCUD AUTH/BANNER RƏNGLƏRİNƏ UYĞUNLAŞDIRILIB, `--primary`-YƏ "DÜZƏLDİLMƏSİNƏ" EHTİYAC YOXDUR (BUNLAR AYRI, QƏSDƏN SEÇİLMİŞ TOKEN-LƏRDİR).

### Scrollbar-ın gizlədilməsi

```css
html, body { scrollbar-width: none; -ms-overflow-style: none; overflow-anchor: none; }
html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }

.scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
```
Scrollbar HƏR YERDƏ VİZUAL OLARAQ GİZLİDİR (`display: none` — FİZİKİ SCROLL FUNKSİYASI QALIR, SADƏCƏ GÖRÜNMÜR), BU QƏSDƏNDİR — DİZAYN QƏRARI, BUG DEYİL. `.scrollbar-hide` SİNİFİ — EYNİ EFFEKTİ, AYRI-AYRI (SƏHİFƏNİN ÖZÜ DEYİL) DAXİLİ SCROLL KONTEYNERLƏRİNDƏ (BASKET SİYAHISI, SİFARİŞ MƏHSUL SİYAHISI) TƏTBİQ ETMƏK ÜÇÜN.

### Global button/link kursoru

```css
button, a, [role="button"], input[type="submit"], input[type="button"] { cursor: pointer; }
```
BÜTÜN KLİKLƏNƏ BİLƏN ELEMENTLƏR ÜÇÜN QLOBAL `cursor: pointer` — HƏR YERDƏ `className="cursor-pointer"` YAZMAĞA EHTİYAC OLMASIN DEYƏ (bəzi komponentlərdə YENƏ DƏ AÇIQ YAZILIB, TƏKRARÇILIQ DEYİL, SADƏCƏ AYRI XÜSUSİ HALLARDA VİZUAL AYDINLIQ ÜÇÜN).

### Düymə künc radiusu qaydası

**Demək olar bütün interaktiv düymələr `rounded-[8px]`** (ürək, +/− stepper, forma göndər düymələri VƏ S.) — BUNUN İKİ İSTİSNASI VAR:
1. **Karusel prev/next ox düymələri** (`CarouselNavButton`, LANDING SƏHİFƏSİNDƏ) — QƏSDƏN `rounded-full` (DAİRƏ), ƏVVƏLKİ LAYİHƏ-BOYU BİR `rounded-[8px]` KEÇİDİNDƏN GERİ QAYTARILIB — **"DÜZƏLTMƏYİN".**
2. Sırf DEKORATİV DAİRƏLƏR (AVATARLAR, LOADER NÖQTƏLƏRİ, SAY NİŞANLARI, RADIO-SEÇİM İNDİKATORLARI) VƏ KART KONTEYNERLƏRİ (`rounded-2xl`).

YENİ BİR DÜYMƏ ƏLAVƏ EDƏNDƏ, DEFOLT OLARAQ `rounded-[8px]` SEÇİN, YALNIQ BU İKİ İSTİSNA XARİC.

### Fontlar

`Roboto` (SAYT-BOYU DEFOLT, `--font-roboto` → `--font-sans`) **MÜTLƏQ** `subsets: ["latin", "latin-ext"]` İLƏ YÜKLƏNMƏLİDİR, YALNIZ `["latin"]` YOX — AZƏRBAYCAN HƏRFLƏRİ (ə, ş, ç, ğ, ö, ü) `latin-ext`-DƏ YAŞAYIR VƏ SƏSSİZCƏ FƏRQLİ BİR SİSTEM FONTUNA "FALLBACK" EDİR. `Poppins` (`--font-poppins`) YALNIZ YAŞIL PROMO BANNERLƏRİN İÇİNDƏKİ DİSPLAY MƏTNİ ÜÇÜN İŞLƏDİLİR (INLINE `style={{ fontFamily: 'var(--font-poppins)' }}` İLƏ) — ORİJİNAL DİZAYN MAKETLƏRİNDƏKİ (LİSENZİYASIZ, YÜKLƏNƏ BİLMƏYƏN) "Codec Pro" FONTUNUN ƏVƏZİNƏ SEÇİLİB.

---

## Hissə 19: Alətlər (Tooling)

### `next.config.ts`

```ts
const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(import.meta.dirname) },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "uploads.sarkhanrahimli.dev" },
      { protocol: "https", hostname: "www.tiktak.az" },
      { protocol: "https", hostname: "www.shutterstock.com" },
    ],
  },
};
```
`images.remotePatterns` — `next/image`-in YÜKLƏYƏ BİLƏCƏYİ HAZIRDA İCAZƏLİ HOST-LAR. SİYAHIDA OLMAYAN BİR HOST `next/image` İLƏ İSTİFADƏ OLUNSA, BÜTÜN HƏMİN ALT-AĞAC RENDER ZAMANI XƏTA İLƏ ÇÖKƏR. Buna görə API-DƏN GƏLƏN, HOST-U ÖNCƏDƏN BİLİNMƏYƏN ŞƏKİLLƏR (`CategoryCard`, `CategoryProductCard`, `ProductImage`, BASKET SƏTİRLƏRİ) QƏSDƏN ADİ `<img>` İŞLƏDİR, `next/image` YOX — SİYAHIDA OLMAYAN BİR HOST SADƏCƏ ŞƏKLİ GÖSTƏRMİR, SƏHİFƏNİ ÇÖKDÜRMÜR. `www.shutterstock.com` — `PRODUCT_IMAGE_FALLBACK` KONSTANTININ (Hissə 5) HOST-UDUR, DOKUMENTASİYA ÜÇÜN BURADA (`<img>` İSTİFADƏ ETSƏ DƏ), İSTƏNİLƏN HAL ÜÇÜN SAXLANILIB.

`turbopack.root` — Turbopack-a PROJEKTİN KÖK QOVLUĞUNU AÇIQ GÖSTƏRİR (Node.js-in `import.meta.dirname`-İ İLƏ HESABLANIR) — BƏZİ MONOREPO/QEYRI-STANDART QOVLUQ STRUKTURLARINDA TURBOPACK-IN "YANLIŞ" KÖK TAPMASININ QARŞISINI ALIR.

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "jsx": "react-jsx",
    "paths": { "@/*": ["./src/*"] }
  }
}
```
`strict: true` — TypeScript-in ƏN SƏRT TİP-YOXLAMA REJİMİ (BÜTÜN "strict" ALT-BAYRAQLARI AKTİVDİR: `strictNullChecks`, `noImplicitAny` VƏ S.). `paths: { "@/*": ["./src/*"] }` — Hissə 2-nin İZAH ETDİYİ `@/` QISAYOLUNUN, MƏHZ BU FAYLDA TƏYİN OLUNDUĞU YERDİR.

### `package.json` skriptləri

```json
"scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "analyze": "next experimental-analyze"
}
```
`dev` — Turbopack İLƏ (bax Hissə 1). `analyze` — `next experimental-analyze`, BUNDLE ÖLÇÜSÜNÜ TƏHLİL EDƏN NATİV BİR ALƏT. **Tarixçə:** ƏVVƏLCƏ `@next/bundle-analyzer` PAKETİ SINANIB, AMMA "Next Bundle Analyzer is not compatible with Turbopack builds" XƏTASI VERİB (BU PAKET WEBPACK-A XASDIR) — TAM GERİ ÇEVRİLİB (`npm uninstall`), YERİNƏ TURBOPACK-UYĞUN NATİV ALƏT İŞLƏDİLİB.

### Vacib DEPENDENCY-lər (`package.json`)

```json
"dependencies": {
    "next": "16.2.10",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "@tanstack/react-query": "^5.101.4",
    "axios": "^1.18.1",
    "react-hook-form": "^7.84.0",
    "zod": "^4.4.3",
    "@hookform/resolvers": "^5.7.1",
    "lucide-react": "^1.30.0",
    "react-icons": "^5.7.0",
    "sonner": "^2.0.8",
    "server-only": "^0.0.1"
}
```
`next: "16.2.10"` — BU BÖYÜK VERSİYA NÖMRƏSİ (16), "BU, SİZİN BİLDİYİNİZ Next.js DEYİL" XƏBƏRDARLIĞININ (`AGENTS.md`) NİYƏ CİDDİ QƏBUL EDİLMƏLİ OLDUĞUNU GÖSTƏRİR — `params: Promise<...>`, `unstable_retry` KİMİ DƏYİŞİKLİKLƏR MƏHZ BU VERSİYADAN GƏLİR. Yeni bir Next.js API-si İŞLƏTMƏZDƏN ƏVVƏL, `node_modules/next/dist/docs/`-Ə BAXIN (bax `AGENTS.md`-nin BAŞLIĞI).

### ESLint

`react-hooks/set-state-in-effect` QAYDASI AKTİVDİR (bax Hissə 12). **ÜÇ FAYL DAİMİ, QƏSDƏN BU QAYDANI POZUR:**
- `RequireAuth.tsx`, `RedirectIfAuth.tsx` — "MOUNT OLDUQ, TOKEN VAR/YOX" YOXLAMASI ÜÇÜN PLAIN `useEffect`.
- `useHasMounted.ts` — `setHasMounted(true)` MOUNT-DA.

Bunların HEÇ BİRİNDƏ RENDER-ZAMANI TƏNZİMLƏMƏ ALTERNATİVİ MÖVCUD DEYİL — HAMISI "MOUNT OLDUĞUMUZU/ TƏSDİQLƏNDİYİMİZİ AŞKARLAMAQ" ÜÇÜN STANDART REACT İDİOMUDUR, REACT-DƏ HEÇ BİR "RENDER-ZAMANI" EKVİVALENTİ YOXDUR. **Təmiz bir `eslint .` İCRASI DƏQİQ BU 3 XƏTANI GÖSTƏRMƏLİDİR, ARTIQ YOX — bunları "DÜZƏLTMƏYƏ" VAXT SƏRF ETMƏYİN.**

---

## Hissə 20: Lüğət

| Termin | Mənası |
|---|---|
| **SSR** | Server-Side Rendering — HTML-in brauzerdə YOX, serverdə hazırlanması |
| **ISR** | Incremental Static Regeneration — render olunmuş səhifənin müəyyən müddət cache-lənməsi (`revalidate`) |
| **Server Component** | Yalnız serverdə işə düşən, brauzerə JS-i göndərilməyən komponent (defolt) |
| **Client Component** | `'use client'` ilə işarələnmiş, brauzerdə DƏ işə düşən (interaktiv) komponent |
| **Hydration** | Server-in göndərdiyi statik HTML-i, client-in React-i ilə "canlandırmaq" (event listener-lər bağlamaq) prosesi |
| **Hydration mismatch** | Server-in render etdiyi HTML ilə client-in ilk render-inin FƏRQLİ olması — React DOM-un o hissəsini atıb yenidən qurur |
| **Query key** | TanStack Query-nin bir data parçasını cache-də tanıdığı unikal "açar" massivi |
| **Mutation** | TanStack Query-də data DƏYİŞDİRƏN (POST/PUT/DELETE) sorğu (fetch YOX) |
| **Invalidate** | TanStack Query-yə "bu query-nin datası köhnəlib, yenidən çək" demək |
| **Barrel (fayl)** | Bir qovluqdakı hər şeyi YENİDƏN export edən `index.ts` — tək bir import nöqtəsi yaradır |
| **Interceptor** | Axios-da HƏR sorğu/cavabdan ƏVVƏL/SONRA avtomatik işə düşən funksiya (token əlavə etmək, 401-i tutmaq) |
| **Race condition** | İki eyni-zamanlı əməliyyatın nəticəsinin sıralamadan asılı, gözlənilməz olması (`refreshPromise` bunun qarşısını alır) |
| **Optimistic UI** | Server cavabını GÖZLƏMƏDƏN, UI-ı DƏRHAL "uğurlu" kimi yeniləmək |
| **Persistent layout** | Naviqasiya zamanı DOM-u YENİDƏN QURULMAYAN, `layout.tsx`-də yaşayan ortaq şablon |
| **Servis hesabı** | Bu layihəyə xas termin — bax Hissə 10, `serviceAccount.ts` |
| **Cache() dedup** | React-in `cache()` funksiyası ilə eyni request daxilində eyni çağırışın bir dəfə icra olunması |
| **File convention** | Next.js-in xüsusi tanıdığı fayl adları (`page.tsx`, `robots.ts`, `icon.tsx` və s.) |
| **Containing block** | CSS-də, `position: absolute` bir elementin `top`/`left` və s. dəyərlərinin nisbətən hesablandığı ən yaxın "positioned" əcdad |
