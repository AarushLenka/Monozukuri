# Graph Report - .  (2026-07-24)

## Corpus Check
- Large corpus: 84 files · ~1,067,580 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 175 nodes · 267 edges · 18 communities (13 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- 3D Rendering
- Dev Tooling
- Hero UI Layout
- React UI Components
- Runtime Deps
- App Shell
- Content Pages
- Package Manifest
- HTML Entry
- Readme (monozukuri)
- Readme (react)
- Readme (tailwind)
- Readme (vite)

## God Nodes (most connected - your core abstractions)
1. `App()` - 11 edges
2. `HeroSection()` - 9 edges
3. `AnimatedConnector()` - 8 edges
4. `addEdgeLines()` - 8 edges
5. `useIsMobile()` - 7 edges
6. `useOrbitSnapBack()` - 7 edges
7. `ESPModel()` - 6 edges
8. `ESP32Canvas()` - 6 edges
9. `AboutSection()` - 6 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `HeroSection()` --conceptually_related_to--> `Wireframe Edge Overlay Rendering`  [INFERRED]
  src/sections/HeroSection.jsx → README.md
- `AboutSection()` --conceptually_related_to--> `Wireframe Edge Overlay Rendering`  [INFERRED]
  src/sections/AboutSection.jsx → README.md
- `App()` --rationale_for--> `Technical Design Aesthetic`  [EXTRACTED]
  src/App.jsx → README.md
- `Loader()` --rationale_for--> `Scramble-Text Loader Animation`  [EXTRACTED]
  src/components/Loader.jsx → README.md
- `PROJECTS_DATA` --conceptually_related_to--> `Three.js 3D Rendering`  [INFERRED]
  src/constants/projects.js → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **3D Scene Rendering Infrastructure** — src_components_canvas3dbase_canvas3dbase, src_esp32_esp32canvas, src_raspberrypi_raspberrypicanvas [EXTRACTED 1.00]
- **Edge Line Rendering Pipeline** — src_utils_threeutils_addedgelines, src_utils_threeutils_setmeshopacity, src_hooks_usescememeshes_usescenemeshes [EXTRACTED 1.00]
- **Scroll-Driven UI Animation System** — src_hooks_usoscrollprogress_usescrollprogress, src_hooks_useelementposition_Useelementposition, src_components_animatedconnector_animatedconnector [EXTRACTED 1.00]

## Communities (18 total, 5 thin omitted)

### Community 0 - "3D Rendering"
Cohesion: 0.13
Nodes (20): GSAP Animation Library, Scroll-Driven Animation, Scroll-Driven Disassembly Effect, Canvas3DBase(), Model(), ModelCanvas(), ESP32Canvas(), ESPModel() (+12 more)

### Community 1 - "Dev Tooling"
Cohesion: 0.07
Nodes (27): autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, lucide-react, devDependencies (+19 more)

### Community 2 - "Hero UI Layout"
Cohesion: 0.16
Nodes (15): AnimatedConnector(), CoreThreadsPanel(), MovingSlashBar(), PixelField(), CONNECTOR_CONFIG, hPos, markers, PIXEL_CONFIG (+7 more)

### Community 3 - "React UI Components"
Cohesion: 0.13
Nodes (11): react, react, CreativeRibbon(), CreativeWorkGallery(), VIDEO_SOURCES, SocialLinks(), useIsMobile(), CitySection() (+3 more)

### Community 4 - "Runtime Deps"
Cohesion: 0.10
Nodes (21): animejs, framer-motion, gsap, dependencies, animejs, framer-motion, gsap, puppeteer (+13 more)

### Community 5 - "App Shell"
Cohesion: 0.16
Nodes (13): Hero Materialize Reveal Animation, Scramble-Text Loader Animation, App(), BackgroundBlobs(), ClickHereCursor(), CursorTooltip(), GridMarker(), Loader() (+5 more)

### Community 6 - "Content Pages"
Cohesion: 0.29
Nodes (7): Three.js 3D Rendering, DecorativeCard(), SPIKY_POINTS, ZigzagPattern(), PROJECTS_DATA, Projects Section, ProjectsSection()

### Community 7 - "Package Manifest"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

## Knowledge Gaps
- **50 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+45 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Deps` to `React UI Components`, `Package Manifest`?**
  _High betweenness centrality (0.463) - this node is a cross-community bridge._
- **Why does `react` connect `React UI Components` to `Runtime Deps`?**
  _High betweenness centrality (0.412) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `AnimatedConnector()` (e.g. with `Hero Materialize Reveal Animation` and `RaspberryPiCanvas()`) actually correct?**
  _`AnimatedConnector()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _50 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `3D Rendering` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
- **Should `Dev Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `React UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._