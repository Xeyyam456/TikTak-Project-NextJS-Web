# TIK TAK — Paket İstifadəsi

Bu sənəd `package.json`-dakı **hər bir paketi** tək-tək izah edir: paket nədir, layihədə **konkret olaraq hansı fayl/komponent/table/UI-da** işlədilir, və **niyə məhz bu paket seçilib** (alternativlərinə qarşı). Kod nümunələri `KOD-IZAHI.md`-dəki İLƏ EYNİ üslubda — sətirlər ARDICIL, İZAHLI.

Versiyalar `package.json`-dan (bu sənəd yazılan an üçün dəqiq):

```json
"dependencies": {
  "@hookform/resolvers": "^5.7.1",
  "@tanstack/react-query": "^5.101.4",
  "axios": "^1.18.1",
  "lucide-react": "^1.30.0",
  "next": "16.2.10",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "react-hook-form": "^7.84.0",
  "react-icons": "^5.7.0",
  "server-only": "^0.0.1",
  "sonner": "^2.0.8",
  "zod": "^4.4.3"
},
"devDependencies": {
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.2.10",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

---

## 1. `next` (16.2.10) — FRAMEWORK-ün ÖZÜ

**NƏDİR:** React ƏSASLI FULL-STACK web framework — routing, server-side rendering, image/font optimizasiyası, metadata API-si HAMISI DAXİLİNDƏ.

**NİYƏ:** Layihə "TİK TAK" bir E-TİCARƏT saytıdır — SEO ÜÇÜN server-render OLUNMUŞ HTML VACİBDİR (bax aşağı), amma EYNİ ZAMANDA basket/favorites KİMİ İNTERAKTİV, client-side state İDARƏ OLUNAN HİSSƏLƏR DƏ LAZIMDIR. Next.js-in App Router-i (Server + Client Component QARIŞIĞI) BU İKİ TƏLƏBATI EYNİ KODBAZADA HƏLL EDİR — AYRI bir backend (Express/Nest) VƏ AYRI bir SPA (Vite/CRA) YAZMAQ ƏVƏZİNƏ.

**HARADA VƏ NİYƏ konkret istifadə olunur:**
- **App Router (`src/app/`)** — HƏR `page.tsx` YALNIZ ROUTING + metadata, BİZNES MƏNTİQİ `src/views`-dədir (bax `AGENTS.md`-in "Folder layout" bölməsi). Bu, Next.js-in ÖZÜNÜN KONVENSİYASI DEYİL — LAYİHƏNİN ÖZ QAYDASIDIR, Next-in "faylın adı = route" MEXANİZMİNİN ÜSTÜNƏ QURULUB.
- **Server Components + ISR (`revalidate = 300`)** — `CategoriesPage`, `ProductsPage`, `src/app/categories/layout.tsx`, `src/app/categories/[id]/page.tsx`, hər iki product-detail `page.tsx` — bunlar `async function` KOMPONENTLƏRDİR, birbaşa `await serviceGet(...)` EDİRLƏR, `useEffect`/`useState` OLMADAN. Bu, Next-in Server Component xüsusiyyəti OLMASAYDI, HAMISI client-side `useEffect`+`fetch` OLARDI — İLK RENDER-DƏ BOŞ SƏHİFƏ + LOADING SPINNER GÖRÜNƏRDİ, GOOGLE BOT İSƏ HEÇ NƏ GÖRMƏZDİ (bax "SSR & the service account", `AGENTS.md`).
- **`next/image`** — HƏR YERDƏ ŞƏKİL OPTİMİZASİYASI ÜÇÜN (avtomatik `srcset`, lazy-loading, format çevrilməsi) — AMMA `CategoryCard`/`CategoryProductCard` KİMİ API-DƏN GƏLƏN ŞƏKİLLƏR ÜÇÜN QƏSDƏN ADİ `<img>` İŞLƏDİLİR (bax "Backend / API", `AGENTS.md`) — SƏBƏB: `next/image` YALNIZ `next.config.ts`-də SİYAHIYA ALINMIŞ HOST-LARDAN ŞƏKİL QƏBUL EDİR, API-dən GƏLƏN HOST ISƏ ÖNCƏDƏN BİLİNMİR.
- **`generateMetadata`/`Metadata` API** — `buildMetadata()` (`src/shared/utils/seo.ts`) BUNUN ÜSTÜNDƏ QURULUB, HƏR `page.tsx`-in `<title>`/`<meta description>`/OpenGraph/canonical-ı BURADAN GƏLİR.
- **`next/og`-un `ImageResponse`-i** — `src/app/opengraph-image.tsx`/`twitter-image.tsx`, REQUEST VAXTI dinamik OG-şəkil YARADIR (bax "SEO", `AGENTS.md`).
- **Route Handler konvensiyası** — `src/app/llms.txt/route.ts` (folder adı HƏRFİ OLARAQ `llms.txt`).
- **`robots.ts`/`sitemap.ts`** — `MetadataRoute.Robots`/`MetadataRoute.Sitemap` TİPLƏRİ İLƏ, Next-in FAYL-ƏSASLI SEO KONVENSİYASI.
- **Turbopack (`next dev --turbopack`)** — DEV SERVER-in ÖZÜ, adi Webpack-dən DAHA SÜRƏTLİ compile EDİR — layihədə HƏR MARŞRUT DEMƏK OLAR Kİ SERVER-RENDER OLUNDUĞU (service-account round-trip-ləri) ÜÇÜN BU FƏRQ HİSS OLUNUR (bax "Dev tooling", `AGENTS.md`).

**"NextJS-in KLASSİK versiyası DEYİL" xəbərdarlığı:** `AGENTS.md`-in ÖZÜNDƏ VAR — `priority` prop-u `<Image>`-DƏ DEPRECATED OLUB (`loading="eager"` + `fetchPriority="high"` İLƏ ƏVƏZ OLUNUB), `images.qualities` massivinə HƏR YENİ `quality` DƏYƏRİ ƏLAVƏ EDİLMƏLİDİR — YOXSA SƏSSİZCƏ YAXIN DƏYƏRƏ "SNAP" OLUR.

---

## 2. `react` / `react-dom` (19.2.4) — UI KİTABXANASI

**NƏDİR:** `react` — komponent/state/hook MODELİ; `react-dom` — bu modeli BRAUZER DOM-una RENDER EDƏN "adapter". `react-dom` layihə kodunda HEÇ BİR YERDƏ BİRBAŞA IMPORT OLUNMUR (`grep`-lə YOXLANIB) — Next.js ÖZÜ, DAXİLDƏ, onu ÇAĞIRIR; `package.json`-da PEER-DEPENDENCY KİMİ SADƏCƏ VERSİYA UYĞUNLUĞU ÜÇÜN SAXLANILIR.

**NİYƏ (məhz React 19):** `serviceAccount/index.ts`-in `serviceGet` funksiyası React 19-un `cache()` FUNKSİYASI İLƏ SARILIB:
```ts
export const serviceGet = cache(async function serviceGet<T>(path: string): Promise<T> { ... })
```
`cache()` EYNİ REQUEST DAXİLİNDƏ (məs. `generateMetadata` VƏ SƏHİFƏNİN ÖZÜ EYNİ `productId`-ni İSTƏYƏNDƏ) EYNİ ARQUMENTLƏRLƏ ÇAĞIRIŞLARI DEDUPE EDİR — YƏNİ BACKEND-Ə 2 DƏFƏ YOX, 1 DƏFƏ SORĞU GEDİR. Bu, React 18-DƏ MÖVCUD OLMAYAN bir API-DIR.

**NİYƏ ÜMUMİYYƏTLƏ React:** Next.js-in ƏSASINDA React DAYANIR — bu SEÇİM AYRI EDİLMİR, Next SEÇİLƏNDƏ AVTOMATİK GƏLİR. Komponent + hook MODELİ (`useState`, `useEffect`, `useRef`, `useMemo`) LAYİHƏNİN HƏR YERİNDƏ — cədvəllərdə (`OrdersTable`), formlarda, kartlarda İŞLƏDİLİR.

---

## 3. `axios` (^1.18.1) — HTTP KLİENT

**NƏDİR:** Promise-əsaslı HTTP sorğu kitabxanası (fetch-in ALTERNATİVİ).

**NİYƏ fetch YOX, axios:** İKİ SƏBƏB:
1. **Interceptor-lar** — `src/services/httpClient/index.ts`-də `axiosInstance.interceptors.request.use(...)` (HƏR sorğuya AVTOMATİK `Authorization: Bearer <token>` ƏLAVƏ EDİR) VƏ `axiosInstance.interceptors.response.use(...)` (401 ALINANDA AVTOMATİK token REFRESH + orijinal sorğunu TƏKRARLAMA — bax `KOD-IZAHI.md` Hissə 9). `fetch`-lə BU EYNİ ŞEYİ ETMƏK ÜÇÜN HƏR SORĞU ÇAĞIRIŞINI ƏL İLƏ SARMAQ LAZIM GƏLƏRDİ — axios BUNU BİR DƏFƏLİK MƏRKƏZLƏŞDİRİR.
2. **Avtomatik JSON parse VƏ xəta THROW ETMƏ** — `fetch` HTTP 404/500-də BELƏ REJECT ETMİR (`res.ok`-u ƏL İLƏ YOXLAMAQ LAZIMDIR), axios İSƏ 2xx-dən KƏNAR STATUS-LARDA ÖZÜ `catch`-ə DÜŞÜR — `httpClient.ts`-in interceptor-undakı `error.response?.status === 401` MƏNTİQİ BUNUN ÜSTÜNDƏ QURULUB.

**HARADA — İKİ AYRI, BİLƏRƏKDƏN AYRILMIŞ instance:**
- `src/services/httpClient/index.ts` — `axios.create({...})` İLƏ QURULMUŞ, İNTERCEPTOR-LU instance. **Bütün `src/services/*.service.ts` fayllarının (`product.service.ts`, `order.service.ts`, `basket.service.ts` VƏ s.) İSTİFADƏ ETDİYİ, ZİYARƏTÇİNİN ÖZ TOKENİ İLƏ İŞLƏYƏN client-dir.** Yalnız brauzerdə (localStorage/sessionStorage OXUYUR).
- `src/services/serviceAccount/index.ts` — `axios.create` YOX, XAM (`raw`) `axios.get`/`axios.post` BİRBAŞA ÇAĞIRILIR, HEÇ BİR interceptor YOXDUR. **SƏBƏB:** BU, SERVER-ONLY bir modul (`import 'server-only'`) — INTERCEPTOR-un `localStorage` OXUYAN MƏNTİQİ SERVER-DƏ İŞLƏMƏZ, ONA GÖRƏ TAMAMİLƏ AYRI, SADƏ BİR AXIOS İSTİFADƏSİ SEÇİLİB (öz token-i manual idarə edir, bax `KOD-IZAHI.md`).

Bu İKİ instance-ın QARIŞDIRILMAMASI QƏSDƏNDİR — biri "ziyarətçinin şəxsi datası", digəri "hər kəs üçün eyni olan kataloq datası" ÜÇÜNDÜR (bax `AGENTS.md`-in "SSR & the service account" bölməsi).

---

## 4. `@tanstack/react-query` (^5.101.4) — SERVER STATE (DATA FETCHING) MENECERİ

**NƏDİR:** Backend-dən gələn datanın CACHE-LƏNMƏSİ, YENİLƏNMƏSİ, LOADING/ERROR STATE-lərinin İDARƏ OLUNMASI ÜÇÜN kitabxana — `useState`+`useEffect`+`fetch`-in ƏL İLƏ YAZILAN VERSİYASININ ƏVƏZİNƏ.

**NİYƏ:** Sadə `useEffect`+`fetch` İLƏ YAZILSAYDI, HƏR KOMPONENT ÖZ CACHE-İNİ SAXLAYARDI — MƏS. `Header`-in "Səbətim" SAYI İLƏ `BasketSidebarPanel`-in ÖZÜ AYRI-AYRI SORĞU GÖNDƏRƏRDİ, VƏ BİRİ YENİLƏNƏNDƏ DİGƏRİ AVTOMATİK YENİLƏNMƏZDİ. `@tanstack/react-query`-nin `queryKey`-ə ƏSASLANAN PAYLAŞILAN CACHE-i BUNU HƏLL EDİR: BİR `useBasketMutations().add()` ÇAĞIRILANDA `queryClient.invalidateQueries({ queryKey: basketQueryKey })` HƏR YERDƏ (Header, BasketSidebarPanel, BasketPage) EYNİ ANDA YENİ DATanı GÖSTƏRİR — ƏLAVƏ "PROP DRILLING" VƏ YA GLOBAL STATE (Redux) LAZIM OLMADAN.

**HARADA — HƏR DATA DOMENİ ÜÇÜN AYRI HOOK (`src/shared/hooks/`):**
- `useBasket.ts` → `useBasket()` (`GET /basket`) + `useBasketMutations()` (`add`/`remove`/`removeAll`/`clear`) — `BasketSidebarPanel`, `Header`, `CategoryProductCard`, `ProductDetailContent`, `BasketPage` BURADAN OXUYUR.
- `useFavorites.ts` → `useFavorites()` + `useToggleFavorite()` — `FavoritesPage`, `CategoryProductCard`-ın ürək İKONU.
- `useProfile.ts` → `useProfile()` + `useUpdateProfile()` — `Header`-in ÜNVAN/AVATAR BLOKU, `AccountPage`-in FORMU.
- `useOrders.ts` → `useOrders()` (`OrdersTable`-in ÖZÜNÜN DATA MƏNBƏYİ, `/account/orders`) + `useOrder(id)` (`OrderDetailSection`, `/account/orders/:id`).
- `useProducts.ts` → Header-in AXTARIŞ dropdown-u (`useProducts()` NƏTİCƏLƏRİNİ `title`-a GÖRƏ CLIENT-SIDE filtr EDİR).
- **`QueryProvider.tsx`** (`src/shared/components/providers/`) — `QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } })` İLƏ `QueryClientProvider`-i root layout-a QOŞUR. `staleTime: 30_000` (30 SANİYƏ) SEÇİLİB, ÇÜNKİ MUTASİYALAR ARTIQ TƏSİR ETDİKLƏRİ QUERY-LƏRİ ÖZLƏRİ INVALIDATE EDİR — 0ms staleTime SADƏCƏ HƏR REMOUNT/PƏNCƏRƏ-FOKUS-DA LAZIMSIZ REFETCH DEMƏKDİR.
- **`useAuthSync.ts`** — `useQueryClient()` İLƏ `queryClient.clear()` ÇAĞIRIR: BAŞQA bir BRAUZER TAB-ında LOGIN/LOGOUT OLANDA (`storage` EVENT-i İLƏ AŞKARLANIR) BU TAB-DAKI KÖHNƏ CACHE-İ (profile/basket/favorites) SİLİR.

**NİYƏ MƏHZ BU İKİ PATTERN QARIŞIQDIR (`AGENTS.md`-in "Data fetching & mutations" bölməsi):** kataloq datası (kateqoriyalar/məhsullar) `@tanstack/react-query`-DƏN KEÇMİR — O, SERVER Component-də BİR DƏFƏLİK `serviceGet` İLƏ ÇƏKİLİR VƏ PROP KİMİ ÖTÜRÜLÜR, ÇÜNKİ O DATA "ZİYARƏTÇİYƏ XAS" DEYİL, hər kəs üçün EYNİDİR — CACHE-Ə EHTİYAC YOXDUR, ISR (`revalidate=300`) BUNU ARTIQ EDİR.

---

## 5. `react-hook-form` (^7.84.0) + `@hookform/resolvers` (^5.7.1) + `zod` (^4.4.3) — FORM ÜÇLÜYÜ

Bu ÜÇ PAKET BİRGƏ İŞLƏYİR, ONA GÖRƏ BİRLİKDƏ İZAH OLUNUR:

- **`zod`** — TypeScript-ə İNTEQRASİYA OLUNMUŞ SXEM VALİDASİYA kitabxanası (`z.object({...})` İLƏ QAYDALAR YAZILIR, `z.infer<>` İLƏ TYPE ÇIXARILA BİLƏR).
- **`react-hook-form`** — FORM STATE-İ (dəyərlər, TOXUNULUB-TOXUNULMAYIB, XƏTALAR) `useState`-in ƏVƏZİNƏ İDARƏ EDƏN kitabxana — HƏR KEYSTROKE-DA BÜTÜN FORMU YENİDƏN RENDER ETMİR (uncontrolled input-lara ƏSASLANIR), BÖYÜK FORMLARDA PERFORMANS ÜSTÜNLÜYÜ VERİR.
- **`@hookform/resolvers`** — BU İKİSİNİ BİR-BİRİNƏ BAĞLAYAN "KÖRPÜ": `zodResolver(schema)` zod SXEMİNİ react-hook-form-un ANLADIĞI VALIDATOR FORMATINA ÇEVİRİR.

**NİYƏ BU ÜÇLÜK (ADİ `useState` + ƏL İLƏ `if` YOXLAMALARI ƏVƏZİNƏ):** TƏKRARLANAN VALİDASİYA MƏNTİQİNİ (telefon formatı, şifrə uzunluğu, "şifrələr uyğundurmu") BİR YERDƏ (`schema`), DEKLARATİV ŞƏKİLDƏ YAZMAĞA İMKAN VERİR — VƏ EYNİ SXEM TYPE-SAFE ŞƏKİLDƏ (`z.infer`) FORM DƏYƏRLƏRİNİN TYPE-INI DA TƏYİN EDİR (BİR YERDƏ YAZ, İKİ YERDƏ İSTİFADƏ ET).

**HARADA — SXEMLƏR (`constants/index.ts` fayllarında, `AGENTS.md`-in "yalnız `src/types`-də TYPE" QAYDASINDAN İSTİSNA, ÇÜNKİ BUNLAR RUNTIME VALIDATOR-DUR, SADƏCƏ TYPE DEYİL):**
- **`src/views/Auth/AuthPage/constants/index.ts`**:
  - `loginSchema` → `LoginForm.tsx` (`phone`: `/^\+994\d{9}$/` REGEX İLƏ, `password`: minimum 1 simvol — YALNIZ "boş DEYİL" YOXLANILIR, UZUNLUQ BACKEND-Ə BURAXILIR).
  - `registerSchema` → `RegisterForm.tsx` (`full_name` min 2 simvol, `phone` EYNİ REGEX, `password` min 4 simvol).
- **`src/views/Account/AccountPage/constants/index.ts`**:
  - `updateSchema` → `AccountPage/index.tsx`-in profil FORMU. `.refine(...)` İLƏ İKİ ƏLAVƏ QAYDA: (1) `password` DOLUDURSA MİN 4 SİMVOL, (2) `password` İLƏ `password_repeat` UYĞUN GƏLMƏLİDİR — BU CÜR "BİR SAHƏ DİGƏRİNDƏN ASILIDIR" QAYDALARI `zod`-un `.refine()`-i OLMADAN react-hook-form-un ÖZÜNDƏ YAZMAQ XEYLİ DAHA ÇOX KOD TƏLƏB EDƏRDİ.

**NİYƏ HƏR FORM BUNU İŞLƏTMİR:** `Checkout` (`useCheckoutSubmit.ts`) SADƏ `useState`-LƏRLƏ (`note`, `paymentMethod`) YAZILIB — react-hook-form/zod YOXDUR. SƏBƏB: Checkout FORMU VALİDASİYA TƏLƏB EDƏN SƏRBƏST MƏTN SAHƏLƏRİ DEYİL (adres artıq PROFİLDƏN GƏLİR, ödəniş üsulu isə BİR ENUM SEÇİMİDİR) — VALİDASİYA KİTABXANASI BURADA ARTIQ MƏSULİYYƏT OLARDI. **Qayda: sərbəst mətn INPUT-LARI + XƏTA MESAJLARI olan HƏR FORM üçün bu üçlük, sadə SEÇİM/DÜYMƏ ƏSASLI axınlar üçün isə plain `useState` işlədilsin.**

---

## 6. `lucide-react` (^1.30.0) — ƏSAS İKON DƏSTİ

**NƏDİR:** SVG-ƏSASLI, HƏR İKONU AYRI React komponenti KİMİ EXPORT EDƏN icon kitabxanası (`import { Heart } from 'lucide-react'`).

**NİYƏ:** TREE-SHAKEABLE (YALNIZ İSTİFADƏ OLUNAN İKONLAR BUNDLE-A DÜŞÜR), ÜMUMİ, MARKA-NEYTRAL VİZUAL STİL — LAYİHƏNİN HƏR YERİNDƏ EYNİ "XƏTT QALINLIĞI"NDA İKONLAR GÖRÜNMƏSİ ÜÇÜN.

**HARADA (22 fayl, ƏN GENİŞ İSTİFADƏ OLUNAN İKON PAKETİ) — SEÇİLMİŞ NÜMUNƏLƏR:**
- **`OrdersTable.tsx`** — `ChevronRight` — "detallar" pill-inin OX İŞARƏSİ (bax `KOD-IZAHI.md`-in "Orders" bölməsi, HOVER ANİMASİYASI İLƏ BİRGƏ).
- **`HeartToggle/index.tsx`** — `Heart` — `CategoryProductCard`/`ProductDetailContent`-in FAVORİT İKONU, `scale-110`/`scale-90` İLƏ HOVER/ACTIVE ANİMASİYASI.
- **`BackButton/index.tsx`** — `ArrowLeft` — `ProductDetailContent`-in "geri qayıt" DÜYMƏSİ.
- **`Pagination/index.tsx`** — SƏHİFƏLƏMƏ OX-LARI (bütün cədvəl/grid PAGİNASİYASI: `OrdersTable`, `ProductsGrid`, `FavoritesGrid`, `CategoryProductsSection`).
- **`Header/components/`** (`NavLinks`, `LogoutButton`, `SearchBar`, `AddressBadge`) — NAVİQASİYA VƏ AXTARIŞ İKONLARI.
- **`AuthPage/components/PasswordVisibilityIcon.tsx`** — ŞİFRƏ GÖSTƏR/GİZLƏT İKONU (göz/kəsilmiş göz).
- **`Checkout/components/`** (`OrderSuccessModal`, `ConfirmOrderModal`, `OrderDetailsCard`) — SİFARİŞ AXINININ VİZUAL TƏSDİQ İKONLARI.

---

## 7. `react-icons` (^5.7.0) — YALNIZ BRAND (SOSİAL ŞƏBƏKƏ) İKONLARI ÜÇÜN, İKİNCİ İKON PAKETİ

**NƏDİR:** ONLARLA FƏRQLİ İKON DƏSTİNİ (Font Awesome, Material, Feather VƏ s.) TƏK PAKETDƏ TOPLAYAN kitabxana, `react-icons/fa6` KİMİ ALT-YOLLARLA İMPORT OLUNUR.

**NİYƏ İKİNCİ BİR İKON PAKETİ LAZIM OLUB (`lucide-react` KİFAYƏT ETMƏYİB):** `lucide-react` ÜMUMİ UI İKONLARI (ox, ürək, zibil qutusu VƏ s.) ÜÇÜN ƏLA OLSA DA, MARKALI SOSİAL ŞƏBƏKƏ LOGOLARINI (Facebook-un "f"-i, Instagram-ın kamerası, TikTok-un notası) EYNİ DƏQİQLİKDƏ TƏMİN ETMİR — `react-icons/fa6` (Font Awesome 6) İSƏ BU BRAND-SPESİFİK LOGOLARIN RƏSMİ FORMALARINA DAHA YAXINDIR.

**HARADA — BİR YEGANƏ FAYL, LAYİHƏNİN HƏR YERİNDƏ DEYİL:**
```ts
// src/shared/components/layout/Footer/constants/index.ts
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
```
YALNIZ **`Footer.tsx`**-in sosial media LİNKLƏRİ ÜÇÜN (`FooterSocialLink` TİPİ İLƏ BİRGƏ, `src/types/shared/`). **Qayda: yeni bir sosial/brand LOGOSU LAZIM OLANDA `react-icons`-a MÜRACİƏT ET, ÜMUMİ UI İKONU LAZIM OLANDA `lucide-react`-A — İKİSİNİ QARIŞDIRMA, hər paketin ÖZ DAR MƏSULİYYƏTİ VAR.**

---

## 8. `sonner` (^2.0.8) — TOAST (bildiriş) KİTABXANASI

**NƏDİR:** Ekranın küncündə görünən, avtomatik yoxa çıxan "toast" bildirişləri göstərən YÜNGÜL kitabxana (`toast.success(...)`, `toast.error(...)`).

**NİYƏ:** MİNİMAL API-Sİ (ƏLAVƏ "PROVIDER SETUP" OLMADAN, TƏK `<Toaster />` KOMPONENTİ) VƏ HAZIR `richColors` VARİANTI İLƏ, UĞUR/XƏTA MESAJLARINI STİLLƏŞDİRMƏYƏ VAXT SƏRF ETMƏDƏN BRAND RƏNGLƏRİNƏ (yaşıl/qırmızı) UYĞUN GÖSTƏRİR.

**HARADA — İKİ QAYDA İLƏ (`AGENTS.md`-in "Data fetching & mutations" VƏ "Notifications" bölmələri):**
1. **`<Toaster position="top-right" richColors />` YALNIZ BİR DƏFƏ, root `layout.tsx`-də MOUNT OLUNUB** — İKİNCİ bir `<Toaster>` ƏLAVƏ ETMƏK QADAĞANDIR (İKİLƏNMİŞ bildirişlərə SƏBƏB OLAR).
2. **Toast-lar MUTASİYA HOOK-LARININ ÖZÜNDƏ ÇAĞIRILIR, ÇAĞIRAN KOMPONENTDƏ YOX** — `useBasketMutations`, `useUpdateProfile`, `useToggleFavorite` VƏ s. ÖZ `onSuccess`/`onMutate`-lərində `toast.success(...)` EDİR. **İSTİSNA:** `Header`-in "Çıxış" DÜYMƏSİ VƏ `LoginForm`-un login handler-i — bunlar `useMutation`-A ƏSASLANMADIĞI ÜÇÜN (sadə `async` FUNKSİYADIR) TOAST-I BİRBAŞA ÖZLƏRİNDƏ ÇAĞIRIR, QAYDANIN DAR, İZAH OLUNMUŞ BİR İSTİSNASI KİMİ.

---

## 9. `server-only` (^0.0.1) — BUILD-VAXTI TƏHLÜKƏSİZLİK QORUYUCUSU

**NƏDİR:** RUNTIME-DA HEÇ NƏ ETMƏYƏN, YALNIZ BİR SƏTİRLİK paket — `import 'server-only'` bir faylın BAŞINA YAZILANDA, ƏGƏR O FAYL SƏHVƏN BİR **Client Component**-DƏN IMPORT OLUNARSA, Next.js **BUILD XƏTASI** VERİR.

**NİYƏ:** `src/services/serviceAccount/index.ts` `SERVICE_ACCOUNT_PHONE`/`SERVICE_ACCOUNT_PASSWORD` KİMİ MƏXFİ (server-only) ENV DƏYİŞƏNLƏRİ İŞLƏDİR. Bu fayl SƏHVƏN bir Client Component-ə IMPORT OLUNSAYDI, Next BUNU BROWSER BUNDLE-INA DA QATARDI — VƏ MƏXFİ PAROL BRAUZER-Ə (YƏNİ HƏR ZİYARƏTÇİYƏ) SIZARDI. `server-only` BUNU **KOMPİLYASİYA VAXTI**, PRODUCTION-A ÇATMADAN AŞKARLAYIR — RUNTIME YOXLAMASI (məs. `typeof window === 'undefined'`) BUNU YALNIZ RUNTIME-DA, BƏLKƏ DƏ ARTIQ SIZINTIDAN SONRA AŞKARLAYARDI.

**HARADA:** SADƏCƏ `src/services/serviceAccount/index.ts`-in İLK SƏTRİ — `import 'server-only'`. Layihədə BAŞQA SERVER-ONLY MƏXFİ DATA DAŞIYAN FAYL YOXDUR (`httpClient.ts` ZİYARƏTÇİNİN ÖZ TOKENİDİR, MƏXFİ SİRR DEYİL).

---

## 10. Dev-only paketlər — RUNTIME-DA İŞTİRAK ETMİR, YALNIZ İNKİŞAF PROSESİNDƏ

### 10.1 `typescript` (^5) + `@types/node`, `@types/react`, `@types/react-dom`
**NİYƏ:** LAYİHƏNİN BÜTÜN `interface`/`type` STRUKTURU `src/types`-DƏ (bax `AGENTS.md`) — TYPESCRIPT OLMADAN BU STRUKTUR MƏNASIZ OLARDI. `@types/*` PAKETLƏRİ İSƏ `react`/`node` KİMİ ÖZLƏRİ JS-DƏ YAZILMIŞ PAKETLƏRƏ TİP MƏLUMATI ƏLAVƏ EDİR (BUNLAR OLMADAN `useState`, `process.env` VƏ s. TYPESCRIPT ÜÇÜN "ANY" OLARDI).

### 10.2 `tailwindcss` (^4) + `@tailwindcss/postcss` (^4)
**NƏDİR:** UTILITY-FIRST CSS FREYMVORK (`className="flex items-center gap-4"` KİMİ) — AYRI `.css` FAYLLARI YAZMAQ ƏVƏZİNƏ.
**NİYƏ v4 (v3 YOX):** `@theme inline` KİMİ CSS-FIRST KONFİQURASİYA (`globals.css`-in ÖZÜNDƏ `--color-primary` KİMİ DƏYİŞƏNLƏR TƏYİN OLUNUR, AYRI `tailwind.config.js` YOXDUR) — MARKA RƏNGLƏRİ (`--primary`, `--emerald`, `--mint` VƏ s.) BU ÜSULLA TƏYİN OLUNUB (bax `globals.css`).
**`@tailwindcss/postcss`** — Tailwind-in CSS-i FAKTİKİ OLARAQ EMAL EDƏN PostCSS PLAGİN-İDİR (`postcss.config.mjs`-də TƏK PLAGİN KİMİ QOŞULUB).
**QEYD (bax `KOD-IZAHI.md`-in "Orders" bölməsi):** BƏZİ AXIS-SPESİFİK TRANSFORM UTİLİTY-LƏRİ (`scale-x-0`, `origin-left`) BU LAYİHƏNİN Tailwind v4 QURULUŞUNDA GENERASİYA OLUNMURDU (`OrdersTable`-in HOVER ANİMASİYASINDA AŞKARLANDI) — BELƏ HALLARDA `globals.css`-Ə ƏL İLƏ PLAIN CSS YAZILIR (`.scrollbar-hide`, `.detail-arrow-tail` KİMİ).

### 10.3 `eslint` (^9) + `eslint-config-next` (16.2.10)
**NİYƏ:** `eslint-config-next` Next.js-in ÖZÜNÜN TÖVSİYƏ ETDİYİ QAYDA DƏSTİDİR (`core-web-vitals` + `typescript` VARİANTLARI, `eslint.config.mjs`-də QOŞULUB) — MƏS. `react-hooks/set-state-in-effect` QAYDASI BU DƏSTDƏN GƏLİR VƏ LAYİHƏDƏ 3 "İCAZƏLİ İSTİSNA" YARADIB (bax `AGENTS.md`-in "Dev tooling" bölməsi: `RequireAuth`/`RedirectIfAuth`/`useHasMounted`).

---

## Xülasə cədvəli

| Paket | Kateqoriya | Əsas istifadə yeri (nümunə) | Bir cümləylə "niyə" |
|---|---|---|---|
| `next` | Framework | Bütün `src/app/` | SSR + client interaktivlik EYNİ kodbazada |
| `react` / `react-dom` | UI runtime | Hər yerdə; `cache()` → `serviceAccount` | Next-in TƏMƏLİ; `cache()` sorğu dublikatını KƏSİR |
| `axios` | HTTP klient | `httpClient.ts` (ziyarətçi), `serviceAccount.ts` (server) | Interceptor-larla AVTOMATİK token/refresh idarəsi |
| `@tanstack/react-query` | Server state | `useBasket`, `useOrders`, `useProfile` VƏ s. | Paylaşılan CACHE — bir yerdə dəyişən data HƏR YERDƏ yenilənir |
| `react-hook-form` | Form state | `LoginForm`, `RegisterForm`, `AccountPage` | Performanslı, uncontrolled form idarəsi |
| `@hookform/resolvers` | Körpü | Eyni formlar | `zod` sxemini react-hook-form-a bağlayır |
| `zod` | Validasiya | `loginSchema`, `registerSchema`, `updateSchema` | Deklarativ, type-safe validasiya qaydaları |
| `lucide-react` | İkon (ümumi) | `OrdersTable`, `HeartToggle`, `Pagination` VƏ s. (22 fayl) | Tree-shakeable, neytral UI ikonları |
| `react-icons` | İkon (brand) | `Footer` sosial linklər | Rəsmi sosial-media logoları (`fa6`) |
| `sonner` | Toast | Mutasiya hook-larının `onSuccess`/`onMutate`-i | Minimal setup-lu, brend-rəngli bildirişlər |
| `server-only` | Təhlükəsizlik | `serviceAccount/index.ts` | Məxfi env-in brauzerə sızmasının BUILD-VAXTI qarşısını alır |
| `typescript` + `@types/*` | Dev | Bütün `.ts`/`.tsx` | `src/types`-ə əsaslanan tip strukturu |
| `tailwindcss` + `@tailwindcss/postcss` | Dev (CSS) | Bütün `className`-lar, `globals.css` | Utility-first CSS, CSS-first v4 konfiqurasiyası |
| `eslint` + `eslint-config-next` | Dev (keyfiyyət) | Bütün layihə | Next-in rəsmi qayda dəsti |
