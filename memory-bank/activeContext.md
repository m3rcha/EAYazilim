# Active Context

## Current Work Focus
- Implementing Tiered Licensing System across Database, API, and Admin Panel.
- Phases 1 (DB schema) and 2 (API middleware) are complete. Phase 3 (Admin UI) is next.
- The dashboard is a client-side static application that consumes the `pos-api` analytics.
- The API uses Supabase (service_role key) as its data layer with `businesses` and `transactions` tables.

## Recent Changes
- **POS API Production Upgrade (completed):**
  - Phase 1: Added Zod input validation to `/api/transaction`
  - Phase 2: Created Winston logger with custom Supabase transport (`system_logs` table)
  - Phase 3: Built Admin Business Management page (`BusinessManagement.jsx`) with secure ID generation
  - Phase 4: Added API Key middleware (`withApiKey`) protecting both endpoints
- **Admin Panel Reporting (completed):**
  - Added `jspdf` and `jspdf-autotable` to `admin-panel` for client-side PDF generation.
  - Implemented `handleDownloadPDF` inside the "Edit Business" modal to export 30-day transaction history.
  - Added "Aylık Ekstre Gönder" button as a placeholder for future email automation.
  - Added RLS policy to `supabase_schema.sql` allowing `authenticated` admins to read `transactions` (fixing "0 rows" issue).
  - Fixed ES Module import pattern for `jspdf-autotable` to resolve `autoTable is not a function`.
- **Tiered Dashboard Implementation (completed):**
  - Updated API to serve tiered analytics entirely in memory, removing `.limit(50)` to serve all monthly transactions for all tiers.
  - Created modular dashboard UI that hides/shows charts, heatmaps, and device performance based on the active tier.
  - Added frontend date/time filtering for transactions table (exclusive to Pro/Enterprise tiers).
- Discussed Git architecture strategies (Submodules vs Subtree) for extracting `admin-panel` into a separate repository.
- Successfully deployed `admin-panel` to Vercel.
- Resolved and deployed Supabase Edge Function (`create-admin`) to fix admin creation functionality in production.
- Updated "Neden EA Yazılım?" section with focus on offline operation, modern UI, performance, and support.
- Transformed "Sektörel Çözümler" into "Verimlilik Odaklı Dijital Dönüşüm" focusing on cost management, speed, and reporting.
- Switched pricing model from one-time fees to annual rates + VAT, with improved layout.
- Added annual/monthly pricing toggle with pill-style UI and micro-animations.
- Updated FAQ section with 4 new professional Q&As and smooth accordion animations.
- Created POS Dashboard API (`pos-api/`) as Vercel Serverless Functions.
- Built the Business Owner Dashboard (`pos-dashboard/`) for `restoran.eayazilim.tr` with dark-mode UI and real-time stats.
- Extended Supabase schema with `businesses` and `transactions` tables (Phase 4).
- Fixed multiple POS API bugs (`dashboard-login.js` import paths, `apiKey.js` syntax errors) that were causing 500 errors disguised as CORS errors.
- Adjusted `pos-api` CORS settings to allow `*` for local `demo-pos.html` testing.

## Next Steps
- **Admin Panel Reporting:** 
  - Add `jspdf` and `jspdf-autotable` to `admin-panel`.
  - Add "Download 30-Day PDF" and "Send Email Statement (Placeholder)" buttons to the BusinessManagement page.
- Deploy updated `pos-api/`, `pos-dashboard/`, and `admin-panel/` to Vercel.
- Implement Supabase JWT/Auth for dashboard endpoints (future security enhancement).

## Active Decisions and Considerations
- Using a static HTML approach for the main marketing site for optimal performance.
- The Admin Panel uses a purely static React build communicating directly with Supabase via client-side requests.
- Sensitive user creation logic in the Admin Panel is offloaded to a Supabase Edge Function to avoid exposing the `service_role` key.
