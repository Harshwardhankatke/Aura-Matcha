# 🍵 Aura Matcha — Cinematic Scroll Experience

A premium, scroll-driven landing page for an artisanal matcha brand. Built with **Next.js 14**, **Framer Motion**, and a custom **HTML5 Canvas rendering engine** that scrubs through 240 high-resolution frames tied to scroll position — delivering a buttery-smooth, zero-lag cinematic experience.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?logo=framer)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **🎬 4K Canvas Engine** — 240-frame image sequence rendered via `requestAnimationFrame` at 60fps with zero visual tearing
- **🌊 Lenis Smooth Scroll** — Momentum-based scrolling with cinematic weight and inertia using `@studio-freight/react-lenis`
- **🔍 Cinematic Zoom** — Canvas dynamically scales from `1x` to `1.15x` as you scroll, adding depth to the visuals
- **⏳ Strict Preloader** — Locks scroll interaction until all 240 frames are fully cached in browser memory
- **📱 Fully Responsive** — Optimized for both desktop (1920×1080) and mobile (375×812) viewports
- **🖼️ Product Showcase** — AI-generated product photography for signature matcha flavors with hover animations
- **🎯 Performance Optimized** — Frame-skip caching prevents redundant GPU repaints; zero idle CPU drain

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [Framer Motion](https://www.framer.com/motion/) | Scroll-linked animations & spring physics |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [React Lenis](https://github.com/studio-freight/lenis) | Smooth scroll engine |
| HTML5 Canvas | Frame-perfect image sequence rendering |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

### Clone & Run

```bash
# 1. Clone the repository
git clone https://github.com/Harshwardhankatke/Aura-Matcha.git

# 2. Navigate into the project
cd Aura-Matcha

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Build for Production

```bash
# Build static export
npm run build

# The output is in the /out folder — ready for deployment
```

---

## 📁 Project Structure

```
Aura-Matcha/
├── public/
│   ├── sequence/          # 240 high-res frames (1920×1080)
│   │   ├── frame_0.jpg
│   │   ├── frame_1.jpg
│   │   └── ... (frame_239.jpg)
│   └── shop/              # Product showcase images
│       ├── strawberry.png
│       ├── vanilla.png
│       └── rose.png
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout with Lenis provider
│   │   ├── page.tsx       # Main page composition
│   │   └── globals.css    # Global styles
│   └── components/
│       ├── EspressoExtraction.tsx  # Core canvas engine & scroll logic
│       ├── LenisProvider.tsx       # Smooth scroll wrapper
│       ├── KineticText.tsx         # Animated typography component
│       ├── GlobalNav.tsx           # Navigation bar
│       ├── ProductShowcase.tsx     # Flavored matcha product grid
│       └── Footer.tsx              # Site footer
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages auto-deploy workflow
├── next.config.ts         # Static export configuration
└── package.json
```

---

## 🌐 Deployment

### GitHub Pages (Automatic)

This project includes a GitHub Actions workflow that auto-deploys on every push to `main`:

1. Go to **Settings → Pages → Source → GitHub Actions**
2. Push to `main` — the site deploys automatically
3. Live at: `https://harshwardhankatke.github.io/Aura-Matcha/`

### Netlify (Manual)

1. Run `npm run build`
2. Drag the `out/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

## 🎨 Customization

### Swap the Video / Image Sequence

1. Place your video file in the project root
2. Extract frames using FFmpeg:
   ```bash
   ffmpeg -i your_video.mp4 -vf "fps=30" -q:v 2 -start_number 0 public/sequence/frame_%d.jpg
   ```
3. Update `FRAME_COUNT` in `src/components/EspressoExtraction.tsx` to match the total frames

### Modify Scroll Pacing

Edit the `currentFrame` transform in `EspressoExtraction.tsx`:
```ts
// Linear scrub (current)
const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

// With sticky pauses (for text reveals)
const currentFrame = useTransform(
  smoothProgress,
  [0, 0.10, 0.25, 0.35, 0.50, 0.60, 0.75, 0.85, 1],
  [0, 40,   40,   120,  120,  200,  200,  239,  239]
);
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Harshwardhan Katke**

- GitHub: [@Harshwardhankatke](https://github.com/Harshwardhankatke)
- Email: harshwardhankatke@gmail.com

---

⭐ If you found this project impressive, give it a star on GitHub!
