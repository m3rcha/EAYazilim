# Active Context

## Current Work Focus
- Building the POS Dashboard API (`pos-api/`) for `restoran.eayazilim.tr` — a Node.js serverless backend on Vercel that provides restaurant-specific analytics (daily/monthly revenue, average ticket size, recent transactions).
- The API uses Supabase (service_role key) as its data layer with `businesses` and `transactions` tables.

## Recent Changes
- Updated contact and address info to '+90 541 554 75 47' and 'Manisa/Şehzadeler'.
- Created and linked legal pages (`kullanim-kosullari.html`, `gizlilik-politikasi.html`, `iade-politikasi.html`, `kvkk-aydinlatma-metni.html`).
- Set up and styled the landing page using Tailwind CSS v4.
- Integrated `form-handler.js` to securely send contact forms directly to Supabase.
- Built a React (Vite) Admin Panel with Vanilla CSS, Auth protection, forced password resets, and RBAC admin management.
- Debugged Supabase RLS loop issue and login routing loop.
- Added `vercel.json` to the `admin-panel` for SPA routing support.
- Discussed Git architecture strategies (Submodules vs Subtree) for extracting `admin-panel` into a separate repository.
- Successfully deployed `admin-panel` to Vercel.
- Resolved and deployed Supabase Edge Function (`create-admin`) to fix admin creation functionality in production.
- Updated "Neden EA Yazılım?" section with focus on offline operation, modern UI, performance, and support.
- Transformed "Sektörel Çözümler" into "Verimlilik Odaklı Dijital Dönüşüm" focusing on cost management, speed, and reporting.
- Switched pricing model from one-time fees to annual rates + VAT, with improved layout.
- Added annual/monthly pricing toggle with pill-style UI and micro-animations.
- Updated FAQ section with 4 new professional Q&As and smooth accordion animations.
- Created POS Dashboard API (`pos-api/`) as Vercel Serverless Functions with `POST /api/transaction` (with duplicate detection) and `GET /api/dashboard-stats/[businessId]` endpoints.
- Extended Supabase schema with `businesses` and `transactions` tables (Phase 4).

## Next Steps
- Deploy `pos-api/` to Vercel and configure environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).
- Run the Phase 4 SQL schema in Supabase SQL Editor to create `businesses` and `transactions` tables.
- Seed a test business and verify API endpoints with `curl`.
- Build the frontend dashboard for `restoran.eayazilim.tr`.
- Verify domain connection (`admin.eayazilim.tr`) to Vercel.

## Active Decisions and Considerations
- Using a static HTML approach for the main marketing site for optimal performance.
- The Admin Panel uses a purely static React build communicating directly with Supabase via client-side requests.
- Sensitive user creation logic in the Admin Panel is offloaded to a Supabase Edge Function to avoid exposing the `service_role` key.
