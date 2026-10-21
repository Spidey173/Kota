# KOTA — Rebel Against Boring ✦ Agency Recreation

A high-fidelity, interactive recreation of the award-winning [KOTA](https://kota.co.uk) creative digital agency website. Built with React 19, Vite, Three.js (WebGL GLSL shaders), GSAP (ScrollTrigger), and Lenis smooth scrolling.

🌐 **Live Demo:** [https://kota17.vercel.app](https://kota17.vercel.app)  
📦 **Repository:** [https://github.com/Spidey173/Kota](https://github.com/Spidey173/Kota)

---

## ✨ Features & Highlights

- **Dynamic WebGL Fluid Wave Shader**:
  - Custom Three.js vertex & fragment GLSL shaders generating smooth, colorful pastel fluid waves.
  - Automatic undulating movement without cursor jank, optimized for 60fps performance with GPU compositing and off-screen pause detection.
- **Hero Mask-Lift Typography Entrance**:
  - Interactive SVG typography mask lift ("Rebel Against Boring") with responsive desktop and mobile vector assets.
  - Hoverable circular preview video showcasing agency showreels with full-screen theater mode.
- **Approach Section with Character Stagger**:
  - *"Shaping how global brands are seen, trusted, and remembered."* with smooth masked character rise animations on scroll.
  - Interactive value-proposition cards with staggered entrance.
- **Services Stacking Panels & Rotating Vector Indicator**:
  - Diagonal SVG arrow scrubbed continuously to scroll velocity.
  - Card pinning and depth-scaling for Brand Strategy, Web Design & Development, and Growth Marketing.
- **Our Brand-to-Build Framework Carousel**:
  - Interactive step carousel with custom magnetic circular SVG navigation arrows and filter pills.
  - Light-theme aesthetic preserved over fluid background wave.
- **Dark Theme Shift at "Our Work"**:
  - Seamless dark theme transition (`#000000`) triggering when scrolling into the featured portfolio grid.
  - Video previews on card hover with dynamic project badges.
- **Animated Metrics & Results Carousel**:
  - Client case-study metrics (Pison, DKA, Wogan, ISI Global) with swiper slide transitions.
- **Partners, Testimonials, Articles & FAQs**:
  - Interactive grid layouts, accordion expandable FAQs with rotating cross icons, and marquee animations.
- **Kotaverse CTA & Floating Action Button**:
  - Infinite showreel video banner with looping text marquee and persistent floating "Start your project" magnetic trigger.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D / WebGL**: [Three.js](https://threejs.org/) (Perlin Noise Shader, PostProcessing EffectComposer)
- **Animation**: [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/scrolltrigger/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Carousels**: [Swiper](https://swiperjs.com/)
- **Styling**: Vanilla CSS with tailored typography & responsive breakpoints
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18+ recommended)
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Spidey173/Kota.git
   cd Kota
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
Kota/
├── public/                 # Static assets (favicons, SVGs, preview videos)
│   ├── favicon.ico
│   ├── favicon.png
│   ├── hero-poster.jpg
│   └── hero-preview-loop.mp4
├── src/
│   ├── HeroDesktopSvg.jsx  # Hero typography SVG with letter masking
│   ├── HeroMobileSvg.jsx   # Mobile optimized SVG typography
│   ├── KotaverseCta.jsx    # Marquee CTA & showreel video banner
│   ├── WebGLBackground.jsx # Three.js custom Perlin noise shader canvas
│   ├── main.jsx            # Main app components, GSAP timelines & Lenis
│   └── style.css           # Global typography, layout, animations & dark mode
├── index.html              # HTML shell with meta tags & favicons
├── package.json            # Project dependencies & scripts
└── vite.config.js          # Vite build config with React plugin
```

---

## 📄 License

This project is created for educational and portfolio demonstration purposes. All original brand trademarks, logos, and creative assets belong to [KOTA Creative Agency](https://kota.co.uk).
