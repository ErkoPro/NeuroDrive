# NeuroDrive

AI-powered driver safety mobile application — investor-ready MVP built with Expo, React Native, and TypeScript.

## Overview

NeuroDrive combines three components into a unified safety ecosystem:

- **Smart Wheel (Pulse on Wheel)** — heart rate via steering wheel sensors
- **Smart Watch** — HRV, stress, fatigue, and activity metrics
- **Mobile App** — real-time analysis, alerts, and AI recommendations

## Features

| Screen | Description |
|--------|-------------|
| **Главная** | Safety Score, live metrics, device status, AI Coach |
| **Поездка** | Start/stop trip, live dashboard, AI risk alerts |
| **Аналитика** | Daily/weekly/monthly scores, animated trend charts |
| **История** | Trip cards with detailed AI reports |
| **Профиль** | User info, emergency contact, device ecosystem |

## Demo Mode

Full demo mode with **no hardware required**. All sensor data is simulated in real time — ideal for hackathons, investor demos, and research presentations.

## Tech Stack

- **React Native** + **Expo SDK 56**
- **TypeScript** with production folder structure
- **React Navigation** (bottom tabs + stack)
- **React Native Reanimated** — score ring, alerts, screen transitions
- **React Native Gifted Charts** — animated area/line charts
- **Mock Data Service** — centralized simulated data layer

## Project Structure

```
src/
├── components/
│   ├── animations/     # FadeInView, PulseView, ScalePressable
│   ├── charts/         # TrendChart (gifted-charts)
│   └── ...             # GlassCard, SafetyScoreRing, AlertBanner
├── context/            # Global app state
├── hooks/              # useNeuroDrive
├── navigation/         # Tab + stack navigators
├── screens/            # All app screens
├── services/           # mockDataService
├── simulation/         # AI risk detection engine
├── theme/              # Colors, score logic
└── types/              # TypeScript interfaces
```

## Deploy to Vercel

The app exports as a static SPA to `dist/` (with `index.html` + bundled JS).

**Vercel settings** (auto-detected from `vercel.json`):
- Build: `npm run build` (alias: `vercel-build`)
- Output: `dist`
- Uses `@vercel/static-build` so Vercel serves HTML, not raw source files

1. Push to GitHub
2. Import in [Vercel](https://vercel.com) — no extra config needed
3. Redeploy after push

```bash
npm i -g vercel && vercel
```

**Note:** Do not set `"output": "static"` in Expo web config — that requires Expo Router. This app uses React Navigation and exports correctly as a client-side SPA.

## Local development

```bash
npm install
npm start          # web preview
npm run dev        # Expo dev server (mobile + web)
```


## Language

Entire UI is in **Russian (Русский)**.

## Design

Dark mode · Glassmorphism · Blue/cyan accents · Green/yellow/red safety indicators
