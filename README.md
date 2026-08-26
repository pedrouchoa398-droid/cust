# CUST - Project scaffold

This branch contains the Phase 1 scaffold: React + TypeScript + Tailwind + Dexie + basic PWA support.

How to run

1. Install dependencies: npm install
2. Run dev server: npm run dev
3. Open http://localhost:5173

Test on mobile
- Use using your phone on the same network and open the dev server IP:5173, or run a production build and serve the dist folder via a static server and use the device.

What was included
- App shell, bottom navigation
- Dashboard with basic summary
- Financeiro module: Accounts CRUD (persisted in IndexedDB via Dexie)
- Compras module placeholder
- Service worker skeleton and manifest for basic offline caching

Next steps
- Expand modules, add forms, filters, flow of cash and simulations

