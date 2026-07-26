# Monozukuri — Personal Portfolio

> *ものづくり* — "The making of things"

A personal portfolio site built with React, Three.js, and Tailwind CSS. Features interactive 3D hardware models, scroll-driven animations, a scramble-text loader, and a technical design aesthetic.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + Vite 8 |
| 3D Rendering | Three.js + @react-three/fiber + @react-three/drei |
| Animation | GSAP 3, Anime.js 4, Framer Motion |
| Styling | Tailwind CSS 3 |
| Analytics | Vercel Analytics + Speed Insights |

---

## Project Structure

```
src/
├── App.jsx                  # Root layout, all page sections
├── ESP32.jsx                # ESP32 3D canvas (scroll-driven disassembly)
├── RaspberryPi.jsx          # Raspberry Pi 3D canvas (intro animation)
│
├── components/
│   ├── AnimatedConnector.jsx   # SVG polyline connectors with jitter
│   ├── Canvas3DBase.jsx        # Shared 3D canvas wrapper (lights, orbit, env)
│   ├── CoreThreadsPanel.jsx    # "Core Threads" skill panel
│   ├── CreativeRibbon.jsx      # Animated ribbon component
│   ├── CreativeWorkGallery.jsx # Creative work section gallery
│   ├── GridMarker.jsx          # SVG crosshair markers for the grid overlay
│   ├── Loader.jsx              # Fullscreen scramble-text loading screen
│   ├── MovingSlashBar.jsx      # Animated hatch-fill bar
│   ├── PixelField.jsx          # Randomised pixel grid animation
│   ├── Ribbon3D.jsx            # 3D ribbon scene component
│   └── ZigzagPattern.jsx       # Reusable zigzag dot pattern
│
├── config/
│   └── heroConfig.js           # THREAD_ITEMS, PIXEL_CONFIG, GRID_CONFIG, CONNECTOR_CONFIG
│
├── hooks/
│   ├── useElementPosition.js   # DOM element position tracking (scroll + resize)
│   ├── useOrbitSnapBack.js     # GSAP-powered OrbitControls snap-back
│   ├── useSceneMeshes.js       # Three.js scene mesh setup (clone, sort, index)
│   ├── useScrollProgress.js    # Scroll-into-view progress for a given element ID
│   └── useWindowSize.js        # Reactive window dimensions
│
└── utils/
    └── threeUtils.js           # addEdgeLines(), setMeshOpacity(), applyToMaterials()
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 3D Models

Place GLB files in `public/`:

| File | Used by |
|---|---|
| `raspberrypi5.glb` | `RaspberryPi.jsx` |
| `esp32.glb` | `ESP32.jsx` |

The models are rendered as white wireframe edge overlays. The ESP32 has a scroll-driven disassembly effect — layers explode along the Z-axis as the section enters the viewport, then reassemble into the solid model.

---

## Fonts

Custom fonts go in `public/`:

| File | Family name | Used for |
|---|---|---|
| `Ndot57-Regular.otf` | `ndot-57` | Headings, hero title |
| `Recoleta-Medium.woff2` | `Recoleta` | Loader English greeting text |

Both are registered via `@font-face` in `src/index.css`.

---

## Key Patterns

### Scroll Progress
`useScrollProgress(elementId)` returns a 0–1 value as a section scrolls into view. Used to drive the ESP32 disassembly animation.

### Orbit Snap-Back
`useOrbitSnapBack(onComplete)` wraps GSAP spherical interpolation to smoothly return the camera to the default position after the user stops dragging a 3D model.

### Edge Line Rendering
`addEdgeLines(scene, options)` in `threeUtils.js` traverses a Three.js scene and adds `EdgesGeometry` + `LineSegments` overlays to every mesh. Supports `hideSolid` (wireframe-only) and `transparent` (for animated opacity) modes.

### Loader Sequence
1. Scramble animation runs for 4s (title + subtitle in parallel)
2. Text holds static for 2s
3. Loader fades out in 200ms
4. Hero materializes via CSS `filter: blur` + `opacity` transition over 600ms

---

## Configuration

All hero section data lives in `src/config/heroConfig.js`:

- `THREAD_ITEMS` — skill list entries for the CoreThreadsPanel
- `PIXEL_CONFIG` — dimensions and timing for the PixelField animation
- `GRID_CONFIG` — positions for the background grid lines and intersection markers
- `CONNECTOR_CONFIG` — AnimatedConnector definitions (start element, path points)

---

## Deployment

The project is configured for Vercel. `@vercel/analytics` and `@vercel/speed-insights` are included in `main.jsx`. Push to your connected repo and Vercel will handle the rest.

```bash
# Manual build output
npm run build
# Output goes to dist/
```
