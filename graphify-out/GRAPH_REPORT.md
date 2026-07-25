# Graph Report - Monozukuri  (2026-07-25)

## Corpus Check
- 45 files · ~184,624 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 210 nodes · 246 edges · 36 communities (18 shown, 18 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4f5f6ff9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- Monozukuri — Personal Portfolio
- AnimatedConnector.jsx
- vercel.json
- Global CSS with Design Tokens
- Hero Materialize Reveal Animation
- GSAP Animation Library
- Scramble-Text Loader Animation
- Scroll-Driven Animation
- Three.js 3D Rendering
- Scroll-Driven Disassembly Effect
- DOM Element Position Tracking Hook
- Three.js Scene Mesh Setup Hook
- Scroll Progress Tracking Hook
- React Application Entry Point
- Projects Section
- Wireframe Edge Overlay Rendering

## God Nodes (most connected - your core abstractions)
1. `Monozukuri — Personal Portfolio` - 9 edges
2. `useIsMobile()` - 7 edges
3. `addEdgeLines()` - 7 edges
4. `scripts` - 5 edges
5. `useOrbitSnapBack()` - 5 edges
6. `Key Patterns` - 5 edges
7. `ESPModel()` - 4 edges
8. `ESP32Canvas()` - 4 edges
9. `AnimatedConnector()` - 4 edges
10. `BackgroundBlobs()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `CreativeWorkGallery()` --references--> `react`  [EXTRACTED]
  src/components/CreativeWorkGallery.jsx → package.json
- `Global CSS with Design Tokens` --rationale_for--> `Technical Design Aesthetic`  [EXTRACTED]
  src/index.css → README.md
- `App()` --calls--> `useIsMobile()`  [EXTRACTED]
  src/App.jsx → src/hooks/useIsMobile.js
- `RealPiModel()` --calls--> `addEdgeLines()`  [EXTRACTED]
  src/RaspberryPi.jsx → src/utils/threeUtils.js
- `Model()` --calls--> `addEdgeLines()`  [EXTRACTED]
  src/components/ModelCanvas.jsx → src/utils/threeUtils.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **3D Scene Rendering Infrastructure** — src_components_canvas3dbase_canvas3dbase, src_esp32_esp32canvas, src_raspberrypi_raspberrypicanvas [EXTRACTED 1.00]
- **Edge Line Rendering Pipeline** — src_utils_threeutils_addedgelines, src_utils_threeutils_setmeshopacity, src_hooks_usescememeshes_usescenemeshes [EXTRACTED 1.00]
- **Scroll-Driven UI Animation System** — src_hooks_usoscrollprogress_usescrollprogress, src_hooks_useelementposition_Useelementposition, src_components_animatedconnector_animatedconnector [EXTRACTED 1.00]

## Communities (36 total, 18 thin omitted)

### Community 0 - "3D Rendering"
Cohesion: 0.17
Nodes (11): Canvas3DBase(), Model(), ESP32Canvas(), ESPModel(), useOrbitSnapBack(), useSceneMeshes(), useScrollProgress(), RealPiModel() (+3 more)

### Community 1 - "Dev Tooling"
Cohesion: 0.06
Nodes (33): autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, lucide-react, devDependencies (+25 more)

### Community 2 - "Hero UI Layout"
Cohesion: 0.16
Nodes (13): CoreThreadsPanel(), MovingSlashBar(), PixelField(), SocialLinks(), CONNECTOR_CONFIG, GRID_CONFIG, hPos, markers (+5 more)

### Community 3 - "React UI Components"
Cohesion: 0.17
Nodes (6): CreativeRibbon(), CreativeWorkGallery(), VIDEO_SOURCES, useIsMobile(), AM_PATHS, CITY_PATHS

### Community 4 - "Runtime Deps"
Cohesion: 0.09
Nodes (23): animejs, framer-motion, gsap, dependencies, animejs, framer-motion, gsap, puppeteer (+15 more)

### Community 5 - "App Shell"
Cohesion: 0.16
Nodes (11): AboutSection, App(), CitySection, ClickHereCursor, CreativeWorkSection, CursorTooltip, ProjectModal, ProjectsSection (+3 more)

### Community 6 - "Content Pages"
Cohesion: 0.29
Nodes (5): DecorativeCard(), SPIKY_POINTS, ZigzagPattern(), PROJECTS_DATA, ModelCanvas

### Community 7 - "Package Manifest"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 18 - "Monozukuri — Personal Portfolio"
Cohesion: 0.14
Nodes (13): 3D Models, Configuration, Deployment, Edge Line Rendering, Fonts, Getting Started, Key Patterns, Loader Sequence (+5 more)

### Community 19 - "AnimatedConnector.jsx"
Cohesion: 0.60
Nodes (3): AnimatedConnector(), useElementPosition(), useWindowSize()

### Community 20 - "vercel.json"
Cohesion: 0.40
Nodes (4): buildCommand, framework, headers, outputDirectory

## Knowledge Gaps
- **82 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+77 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Deps` to `Package Manifest`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **Why does `react` connect `Runtime Deps` to `React UI Components`?**
  _High betweenness centrality (0.185) - this node is a cross-community bridge._
- **Why does `CreativeWorkGallery()` connect `React UI Components` to `Runtime Deps`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _82 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Runtime Deps` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Monozukuri — Personal Portfolio` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._