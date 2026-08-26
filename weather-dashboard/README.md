# Weather Dashboard

This is a minimal, standalone weather dashboard that uses the Open‑Meteo public APIs (no API key required).

Features:
- Search by city name (uses Open‑Meteo geocoding)
- Shows current weather (temperature, wind, condition)
- 7-day forecast with min/max temperatures and simple icons
- Mobile-first, zero-dependencies (plain HTML/CSS/JS)

How to run
1. Clone the repo or download the `weather-dashboard` folder.
2. Open `weather-dashboard/index.html` in your browser. (For CORS-free local testing you can also serve the folder with a simple static server, e.g. `npx http-server` or `python -m http.server`).

Notes
- Uses Open‑Meteo: https://open-meteo.com/
- No API key, and the APIs used are free to call for small projects.
- This is intended as a lightweight demo. If you want a React + Vite integration (component + hooks) I can add that into the `src/` scaffold instead.

