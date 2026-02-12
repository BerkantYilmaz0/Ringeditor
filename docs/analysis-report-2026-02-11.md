# Ring Planner Analiz Raporu (2026-02-11)

## Kapsam
- Backend guvenlik ve route erisimi
- SQL guvenligi ve riskli sorgu paternleri
- TypeScript tarafinda `any` envanteri
- Kod tekrar ve yorum kalitesi

---

## 1) Backend Guvenlik ve Route Erisimi

### Kritik Bulgular
- Auth middleware routing'den once calisiyor; route bulunamadigi icin auth kontrolu atlanabiliyor.
  - Kaynak: [ring-backend/public/index.php](../ring-backend/public/index.php#L46-L77), [ring-backend/src/Application/Middleware/SessionMiddleware.php](../ring-backend/src/Application/Middleware/SessionMiddleware.php#L45-L51)
- CORS tum origin'leri kabul ediyor ve `Access-Control-Allow-Credentials: true` ile birlikte calisiyor. Bu, baska domainlerden cookie ile istek atilmasina yol acabilir. Ayrica CORS ayarlari middleware ve ResponseEmitter'da tekrarli.
  - Kaynak: [ring-backend/app/middleware.php](../ring-backend/app/middleware.php#L17-L34), [ring-backend/src/Application/ResponseEmitter/ResponseEmitter.php](../ring-backend/src/Application/ResponseEmitter/ResponseEmitter.php#L17-L28)
- Session cookie `secure` false; production'da env tabanli true olmali.
  - Kaynak: [ring-backend/src/Application/Middleware/SessionMiddleware.php](../ring-backend/src/Application/Middleware/SessionMiddleware.php#L25-L32)
- Login akisi plaintext sifre kontrolu yapiyor (hash yok).
  - Kaynak: [ring-backend/src/Application/Actions/Auth/LoginAction.php](../ring-backend/src/Application/Actions/Auth/LoginAction.php#L39-L49)
- `session_regenerate_id(true)` yok (session fixation riski).
  - Kaynak: [ring-backend/src/Application/Actions/Auth/LoginAction.php](../ring-backend/src/Application/Actions/Auth/LoginAction.php#L55-L61)
- Public whitelist'te `/device`, `/` ve `/docs` var; "login olmadan asla erisim yok" hedefiyle celisiyor olabilir.
  - Kaynak: [ring-backend/src/Application/Middleware/SessionMiddleware.php](../ring-backend/src/Application/Middleware/SessionMiddleware.php#L55-L66), [ring-backend/app/routes.php](../ring-backend/app/routes.php#L66-L121)

---

## 2) SQL Guvenligi ve Riskli Paternler

### Dogrudan SQL Injection Bulunmadi
Sorgularin buyuk kismi prepared statement ile ve sabit SQL ile ilerliyor.

### Riskli Noktalar
- N+1 sorgu paterni: route sayisi arttikca her route icin ek sorgu atiliyor.
  - Kaynak: [ring-backend/src/Application/Actions/Routes/ListRoutesAction.php](../ring-backend/src/Application/Actions/Routes/ListRoutesAction.php)
- Buyuk `stops` payload'lari ile tek istekte cok sayida INSERT (payload/rate limit yoksa DB yuku artisina yol acar).
  - Kaynak: [ring-backend/src/Application/Actions/Routes/CreateRouteAction.php](../ring-backend/src/Application/Actions/Routes/CreateRouteAction.php), [ring-backend/src/Application/Actions/Routes/UpdateRouteAction.php](../ring-backend/src/Application/Actions/Routes/UpdateRouteAction.php)
- Bulk conflict sorgusunda dinamik OR listesi cok buyuk olursa DB'yi zorlar.
  - Kaynak: [ring-backend/src/Application/Repositories/JobsRepository.php](../ring-backend/src/Application/Repositories/JobsRepository.php)

---

## 3) TypeScript `any` Envanteri

### Kritik / Sik Kullanilan
- GeoJSON ve harita event tipleri `any`.
  - [package/src/components/map/MapLibreBoard.tsx](../package/src/components/map/MapLibreBoard.tsx#L1-L180)
  - [package/src/types/index.ts](../package/src/types/index.ts#L1-L18)
  - [package/src/lib/routingService.ts](../package/src/lib/routingService.ts#L1-L33)
- Route/Stop editorlarinda `any` kullanimi.
  - [package/src/app/(DashboardLayout)/Routes/page.tsx](../package/src/app/(DashboardLayout)/Routes/page.tsx#L1-L210)
  - [package/src/app/(DashboardLayout)/Routes/components/RouteEditor.tsx](../package/src/app/(DashboardLayout)/Routes/components/RouteEditor.tsx#L1-L170)
  - [package/src/app/(DashboardLayout)/stops/page.tsx](../package/src/app/(DashboardLayout)/stops/page.tsx#L1-L140)

### Orta Seviye
- FullCalendar event arg tipleri ve API response parsingleri `any`.
  - [package/src/app/(DashboardLayout)/Plans/page.tsx](../package/src/app/(DashboardLayout)/Plans/page.tsx#L1-L120)
- Indeksli tipler `any`.
  - [package/src/lib/calendarGrouping.ts](../package/src/lib/calendarGrouping.ts#L12-L22)
- Harita draw stil tanimlari `any[]`.
  - [package/src/lib/mapDrawStyles.ts](../package/src/lib/mapDrawStyles.ts#L1-L8)

### Dusuk Oncelik
- UI bilesenlerinde `any`.
  - [package/src/app/(DashboardLayout)/layout/sidebar/SidebarItems.tsx](../package/src/app/(DashboardLayout)/layout/sidebar/SidebarItems.tsx#L1-L60)
  - [package/src/app/(DashboardLayout)/components/shared/DashboardCard.tsx](../package/src/app/(DashboardLayout)/components/shared/DashboardCard.tsx#L1-L18)
  - [package/src/app/authentication/auth/AuthLogin.tsx](../package/src/app/authentication/auth/AuthLogin.tsx#L1-L76)
  - [package/src/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField.tsx](../package/src/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField.tsx#L1-L14)
  - [package/src/app/(DashboardLayout)/layout/sidebar/Sidebar.tsx](../package/src/app/(DashboardLayout)/layout/sidebar/Sidebar.tsx#L1-L24)
  - [package/src/app/(DashboardLayout)/components/dashboard/SalesOverview.tsx](../package/src/app/(DashboardLayout)/components/dashboard/SalesOverview.tsx#L1-L70)
  - [package/src/app/(DashboardLayout)/components/dashboard/MonthlyEarnings.tsx](../package/src/app/(DashboardLayout)/components/dashboard/MonthlyEarnings.tsx#L1-L60)
  - [package/src/app/(DashboardLayout)/components/dashboard/YearlyBreakup.tsx](../package/src/app/(DashboardLayout)/components/dashboard/YearlyBreakup.tsx#L1-L70)

---

## 4) Yorum ve Kod Tekrari

### Gereksiz / Guncelligi Belirsiz Yorumlar
- Harita draw bolumunde tekrarli ve uzun yorumlar.
  - [package/src/components/map/MapLibreBoard.tsx](../package/src/components/map/MapLibreBoard.tsx#L13-L120)
- Stop silme aksiyonunda uzun aciklamalar kodu tekrar ediyor.
  - [ring-backend/src/Application/Actions/Stops/DeleteStopAction.php](../ring-backend/src/Application/Actions/Stops/DeleteStopAction.php#L19-L34)
- Template soft delete icinde belirsiz notlar var; TODO formatina alinmali ya da kaldirilmali.
  - [ring-backend/src/Application/Actions/Templates/DeleteTemplateAction.php](../ring-backend/src/Application/Actions/Templates/DeleteTemplateAction.php#L19-L36)
- Kullanici repository icinde "compatibility" notlari daha net/oz yazilmali.
  - [ring-backend/src/Infrastructure/Persistence/User/DatabaseUserRepository.php](../ring-backend/src/Infrastructure/Persistence/User/DatabaseUserRepository.php#L19-L36)

### Ingilizce Yorumlar
- Map draw yorumlari ve hata notlari Ingilizce.
  - [package/src/components/map/MapLibreBoard.tsx](../package/src/components/map/MapLibreBoard.tsx#L13-L120)
- Stop silme aksiyonunda Ingilizce mesaj/yorumlar.
  - [ring-backend/src/Application/Actions/Stops/DeleteStopAction.php](../ring-backend/src/Application/Actions/Stops/DeleteStopAction.php#L19-L40)
- TODO notu Ingilizce.
  - [package/src/app/(DashboardLayout)/Map/page.tsx](../package/src/app/(DashboardLayout)/Map/page.tsx#L14-L22)

### Kod Tekrari
- `initialDrawData` kontrolu ic ice tekrar ediyor.
  - [package/src/components/map/MapLibreBoard.tsx](../package/src/components/map/MapLibreBoard.tsx#L52-L105)
- Route Create/Update stop ekleme bloklari neredeyse ayni.
  - [ring-backend/src/Application/Actions/Routes/CreateRouteAction.php](../ring-backend/src/Application/Actions/Routes/CreateRouteAction.php)
  - [ring-backend/src/Application/Actions/Routes/UpdateRouteAction.php](../ring-backend/src/Application/Actions/Routes/UpdateRouteAction.php)

---

## Onerilen Sonraki Adimlar
1) Auth middleware sirasi ve CORS politikasi duzeltilmeli.
2) Login sifre kontrolu hash ve session_regenerate_id ile guclendirilmeli.
3) GeoJSON ve Map event tipleri icin ortak tipler tanimlanmali.
4) Yorumlar Turkceye cekilip gereksizler temizlenmeli.
5) Route stop ekleme kodu ortak metoda alinmali.
