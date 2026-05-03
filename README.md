<div align="center">
  <img src="assets/logos/travelmantra-logo.png" alt="Indigenix Logo" width="140" style="border-radius: 50%; box-shadow: 0 0 30px rgba(46,204,113,0.4); border: 2.5px solid rgba(46,204,113,0.3);"/>
  <h1>Indigenix</h1>
  <p><strong>India's Premiere AI-Powered Geographic Travel Intelligence Ecosystem.</strong></p>
  <p><em>Where Satellite Cartography Meets Predictive AI to Redefine Exploration.</em></p>

  <div>
    <img src="https://img.shields.io/badge/Tech-Vanilla_Web-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla Web"/>
    <img src="https://img.shields.io/badge/3D_Engine-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js"/>
    <img src="https://img.shields.io/badge/Animations-GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP"/>
    <img src="https://img.shields.io/badge/Status-v2.0_Beta-success?style=for-the-badge" alt="Status"/>
    <a href="https://app.netlify.com/sites/animated-faloodeh-b30ecb/deploys">
      <img src="https://api.netlify.com/api/v1/badges/6bc0a809-8ec7-4912-baf7-17e2b8dad7cc/deploy-status" alt="Netlify Status"/>
    </a>
    <a href="https://animated-faloodeh-b30ecb.netlify.app">
      <img src="https://img.shields.io/badge/Live-Demo-FF4B2B?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo"/>
    </a>
    <a href="https://app.netlify.com/start/deploy?repository=https://github.com/your-username/indigenix">
      <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"/>
    </a>
  </div>
</div>

---

## 🌍 Vision
**Indigenix** is not just a travel website; it is a high-fidelity geographic engine built to showcase the sheer scale and beauty of the Indian subcontinent. By leveraging real-time 3D rendering and generative AI, we bridge the gap between static trip planning and immersive discovery.

Designed for the modern explorer, Indigenix provides a seamless, "NASA-grade" visual experience while remaining blazing fast through a strictly optimized Vanilla Web stack.

---

## 📑 Table of Contents
- [✨ Key Highlights](#-key-highlights)
- [🤖 AI Intelligence](#-ai-intelligence)
- [🎨 Immersive UI/UX](#-immersive-uiux)
- [🛠️ Technical Architecture](#-technical-architecture)
- [🚀 Getting Started](#-getting-started)
- [🗺️ Project Structure](#-project-structure)
- [📈 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Highlights

### 🛰️ NASA-Grade 3D Visualization
*   **Real-time Globe:** Built with **Three.js**, featuring high-resolution satellite imagery, dynamic day/night cycles, and geostationary orbit simulations.
*   **HUD Overlay:** Live coordinate tracking (Latitude/Longitude), altitude readouts, and targeting reticles for a futuristic exploration feel.
*   **Biome Environments:** Sections dynamically shift between Nature, Mountain, Ocean, and Desert themes using specialized CSS and canvas effects.

### 🤖 AI Intelligence
*   **AI Trip Builder:** Generate complex, multi-day itineraries across 847+ destinations in under 2 seconds.
*   **Musafir AI Chatbot:** An intelligent, context-aware travel assistant with localized Indian intelligence and "quick-start" suggestion chips.
*   **Voice-Enabled Search:** Beta integration for hands-free travel queries using browser speech recognition.

### 🎨 Immersive UI/UX
*   **Glassmorphic Design:** A premium dark-mode aesthetic utilizing translucent layers, blurred backgrounds, and high-contrast typography.
*   **Micro-interactions:** Powered by **GSAP**, featuring smooth scroll-reveals, count-up statistics, and cinematic modal transitions.
*   **Multilingual Support:** Fully localized for English, Hindi, Bengali, Tamil, Telugu, and Marathi.
*   **Accessibility First:** High-contrast mode toggle and full keyboard navigation (A11y) support.

---

## 🛠️ Technical Architecture

Indigenix rejects the "framework fatigue" of modern web development. It is built entirely on a **zero-dependency** core (excluding essential 3D/animation libraries) to ensure sub-second load times and maximum browser compatibility.

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Logic** | Vanilla JavaScript (ES6+) | Core state management, AI simulations, and DOM orchestration. |
| **3D Rendering** | Three.js | WebGL-based globe and orbital mechanics. |
| **Animation** | GSAP | High-performance timeline and scroll-triggered animations. |
| **Styling** | Vanilla CSS3 | Modern CSS variables, Grid/Flexbox, and complex filter effects. |
| **Performance** | Native Browser APIs | Leveraging IntersectionObserver, Fetch, and SpeechSynthesis. |

---

## 🚀 Getting Started

### Prerequisites
*   A modern web browser (Chrome, Edge, or Firefox recommended for WebGL support).
*   A local development server (optional but recommended for Three.js assets).

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/indigenix.git
    ```
2.  **Enter the project directory:**
    ```bash
    cd indigenix
    ```

### Running Locally
For the best experience, you can view the live version here: **[Live Demo](https://69f329c3574300c2f8b5f6b6--animated-faloodeh-b30ecb.netlify.app/)**

Alternatively, you can run Indigenix by simply opening `index.html` in your browser. However, for the best experience with textures and modules, use a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node (npx):**
```bash
npx serve .
```

Visit `http://localhost:8000` in your browser.

---

## 🗺️ Project Structure

```text
├── assets/
│   ├── fonts/           # Specialized typography (Playfair, DM Sans)
│   ├── images/          # High-res destination photography
│   ├── logos/           # Brand assets (Indigenix & Musafir AI)
│   └── videos/          # Cinematic destination clips
├── css/
│   ├── base/            # Reset, global variables, and typography
│   ├── layout/          # Navbar, Footer, and Hero structural styles
│   ├── pages/           # Section-specific styles (Destinations, AI Builder)
│   └── effects/         # Nature biomes, animations, and loaders
├── js/
│   ├── modules/         # Modular logic (Globe engine, AI logic)
│   └── utils/           # Helper functions and constants
├── index.html           # Main application entry point
├── main.js              # Central orchestration script
└── README.md            # You are here
```

---

## 📈 Roadmap
- [ ] **Mobile Native App:** PWA and TWA versions for Android/iOS.
- [ ] **AR Wayfinding:** Augmented Reality view for historical monuments.
- [ ] **Live Booking Integration:** Real-time API sync for hotels and flights.
- [ ] **Community Stories:** User-generated travel logs and photo sharing.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place.
1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <p>Built with precision and passion for <strong>Incredible India</strong>.</p>
  <img src="assets/logos/musafir-ai-logo.png" alt="Musafir AI" width="50" style="opacity: 0.8;"/>
</div>
