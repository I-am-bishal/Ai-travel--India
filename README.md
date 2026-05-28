<div align="center">

  <img src="assets/logos/travelmantra-logo.png" alt="Indigenix Logo" width="150" style="border-radius: 50%;"/>

  <br/>

  # 🌏 INDIGENIX

  **India's First AI-Powered Geographic Travel Intelligence Engine**

  _Satellite cartography × Generative AI × Immersive 3D — built for the modern explorer._

  <br/>

  [![Tech](https://img.shields.io/badge/Core-Vanilla_JS_%7C_CSS3_%7C_HTML5-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](.)
  [![Three.js](https://img.shields.io/badge/3D-Three.js_WebGL-000?style=for-the-badge&logo=three.js&logoColor=white)](.)
  [![GSAP](https://img.shields.io/badge/Motion-GSAP_3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](.)
  [![Status](https://img.shields.io/badge/Release-v2.0_Beta-blueviolet?style=for-the-badge)](.)

  <br/>

  <a href="https://animated-faloodeh-b30ecb.netlify.app"><img src="https://img.shields.io/badge/▶_LIVE_DEMO-FF4B2B?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo"/></a>
  &nbsp;
  <a href="https://app.netlify.com/sites/animated-faloodeh-b30ecb/deploys"><img src="https://api.netlify.com/api/v1/badges/6bc0a809-8ec7-4912-baf7-17e2b8dad7cc/deploy-status" alt="Netlify Status"/></a>
  &nbsp;
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/your-username/indigenix"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"/></a>

</div>

<br/>

<div align="center">
  <table>
    <tr>
      <td align="center"><b>36+</b><br/><sub>States & UTs</sub></td>
      <td align="center"><b>847+</b><br/><sub>Destinations</sub></td>
      <td align="center"><b>42+</b><br/><sub>UNESCO Sites</sub></td>
      <td align="center"><b>6</b><br/><sub>Languages</sub></td>
      <td align="center"><b>&lt;2s</b><br/><sub>AI Generation</sub></td>
    </tr>
  </table>
</div>

---

## ⚡ What is Indigenix?

> A **zero-framework, high-fidelity geographic engine** that renders the Indian subcontinent through real-time 3D WebGL, generative AI itineraries, and NASA-grade visual telemetry — all running at sub-second load times on pure Vanilla Web.

This isn't a travel website. It's an **exploration interface** — designed to make you *feel* the geography before you book the ticket.

---

## 🛰️ Core Capabilities

<table>
<tr>
<td width="50%">

### 🌐 Real-Time 3D Globe
- **Three.js WebGL** satellite imagery with day/night cycles
- Geostationary orbit simulation at 35,786 km altitude
- Live HUD overlay — coordinates, altitude, targeting reticle
- Dynamic biome environments (Forest / Mountain / Ocean / Desert)

</td>
<td width="50%">

### 🤖 AI Trip Intelligence
- Generate multi-day itineraries across **847+ destinations** in under 2 seconds
- **Musafir AI** — context-aware travel chatbot with localized Indian knowledge
- Voice-enabled search (beta) via browser Speech Recognition
- Budget estimation with real ₹ costs, route optimization, hotel tiers

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Immersive Design System
- Glassmorphic dark-mode UI with translucent blur layers
- **GSAP 3.12** scroll-triggered reveals, count-ups & cinematic modals
- Four dynamic biome themes — leaves, fireflies, rain, sand particles
- High-contrast toggle + full keyboard navigation (A11y)

</td>
<td width="50%">

### 🌍 Multilingual & Accessible
- Full localization: **EN · HI · BN · TA · TE · MR**
- WCAG-aligned color contrast & semantic HTML
- Skip-to-content, ARIA labels, focus-visible states
- Responsive from 320px mobile to 4K ultrawide

</td>
</tr>
</table>

---

## 🏗️ Architecture

> **Philosophy:** Zero-dependency core. No React, no Tailwind, no build step. Just the platform.

| Layer | Stack | Role |
| :--- | :--- | :--- |
| **Rendering** | `Three.js r128` | WebGL globe, orbital mechanics, satellite textures |
| **Animation** | `GSAP 3.12` | Scroll timelines, morphing, count-ups, loaders |
| **Logic** | `Vanilla ES6+` | State management, AI simulation, DOM orchestration |
| **Styling** | `CSS3 Variables` | Design tokens, Grid/Flexbox, filter effects, biomes |
| **PDF** | `html2pdf.js` | Client-side itinerary export |
| **Platform** | `Native APIs` | IntersectionObserver, Fetch, SpeechSynthesis, SpeechRecognition |

---

## 📂 Project Map

```
indigenix/
├── assets/
│   ├── fonts/            ← Playfair Display, DM Sans, Space Mono
│   ├── images/           ← High-res destination photography
│   ├── logos/            ← Indigenix & Musafir AI brand marks
│   └── videos/           ← Cinematic destination clips
│
├── css/
│   ├── base/             ← reset · variables · typography · global
│   ├── layout/           ← navbar · hero · sections · footer · responsive
│   ├── pages/            ← destinations · city-guide · ai-trip-builder · plans · booking
│   └── effects/          ← animations · nature-effects · marquee · loaders · tour-guide
│
├── js/
│   ├── core/             ← Main orchestration & initialization
│   ├── hero/             ← 3D globe engine & HUD controller
│   ├── ai-builder/       ← Trip generation logic & voice search
│   ├── destinations/     ← Filter engine & detail modals
│   ├── city-guide/       ← City cards & category filters
│   ├── plans/            ← Plan tabs & itinerary renderer
│   ├── effects/          ← Biome particles (leaves, rain, sand, fireflies)
│   └── utils/            ← Helpers & constants
│
├── components/           ← Reusable UI partials
├── index.html            ← Single-page application entry
├── main.js               ← Central import & bootstrap
└── netlify.toml          ← Deploy & redirect config
```

---

## 🚀 Quick Start

**Prerequisites:** A modern browser with WebGL support (Chrome / Edge / Firefox).

```bash
# Clone
git clone https://github.com/your-username/indigenix.git
cd indigenix

# Serve (pick one)
python -m http.server 8000        # Python
npx serve .                       # Node
```

Open **`http://localhost:8000`** — or just hit the **[Live Demo →](https://animated-faloodeh-b30ecb.netlify.app)**

---

## 🗺️ Roadmap

| Status | Feature |
| :---: | :--- |
| 🔲 | **PWA / TWA** — Installable mobile app for Android & iOS |
| 🔲 | **AR Wayfinding** — Augmented Reality overlay for monuments |
| 🔲 | **Live Booking** — Real-time hotel & flight API integration |
| 🔲 | **Community Stories** — User-generated travel logs & photo sharing |
| 🔲 | **Offline Mode** — Service Worker caching for no-signal travel |

---

## 🤝 Contributing

```
1. Fork it
2. git checkout -b feature/amazing-thing
3. git commit -m "feat: add amazing thing"
4. git push origin feature/amazing-thing
5. Open a Pull Request
```

All contributions welcome — from bug fixes to new biome effects. ✨

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">
  <br/>
  <img src="assets/logos/musafir-ai-logo.png" alt="Musafir AI" width="40" style="opacity: 0.7;"/>
  <br/><br/>
  <sub>Built with precision and passion for <strong>Incredible India</strong> 🇮🇳</sub>
  <br/><br/>
  <a href="https://animated-faloodeh-b30ecb.netlify.app"><img src="https://img.shields.io/badge/Explore_Indigenix-2ecc71?style=for-the-badge&logoColor=white" alt="Explore"/></a>
</div>
