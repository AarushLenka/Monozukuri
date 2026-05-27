export const THREAD_ITEMS = [
  { id: '01.', tag: 'EMBEDDED SYSTEMS', title: 'MICROCONTROLLERS, SENSOR FUSION', barWidth: 132, animDur: '5s', animDelay: '-0.54s' },
  { id: '02.', tag: 'HARDWARE DESIGN/VLSI', title: 'RTL VERIFication, PHYSICAL DESIGN, CMOS', barWidth: 160, animDur: '5s', animDelay: '-1.18s' },
  { id: '03.', tag: 'AI AUTOMATION', title: 'N8N, LANGCHAIN, MCP', barWidth: 106, animDur: '5s', animDelay: '-2.07s' },
  { id: '04.', tag: 'IOT', title: 'AWS, AZURE, FIREBASE', barWidth: 138, animDur: '5s', animDelay: '-1.46s' },
  { id: '05.', tag: 'LANGUAGES', title: ' EMBEDDED C, C++, BASH, PYTHON, JAVA', barWidth: 116, animDur: '5s', animDelay: '-2.41s' },
  { id: '06.', tag: 'SYSTEM AND TOOLS', title: 'Linux CLI, Git / GitHub', barWidth: 126, animDur: '5s', animDelay: '-0.89s' },
  { id: '07.', tag: 'CREATIVE PURSUITS', title: 'AFTER EFFECTS, BLENDER, FIGMA', barWidth: 102, animDur: '5s', animDelay: '-1.73s' },
];

export const PIXEL_CONFIG = {
  WIDTH: 6,
  HEIGHT: 12,
  COLOR: '#f1f1f1',
  UPDATE_INTERVAL: 220,
  LOWER_BIAS: 0.58,
  DECAY_LOWER: 0.985,
  DECAY_UPPER: 0.82,
  SPAWN_LOWER: 0.78,
  SPAWN_UPPER: 0.94,
};

const vPos = ['360px', '720px', '1080px']; // 25%, 50%, 75% of 1440px
const hPos = [];
const markers = [];

// Generate horizontal lines every 100px, up to 8000px tall (enough for 10 full-height sections)
for (let i = 250; i <= 8000; i += 250) {
  hPos.push(`${i}px`);
}

for (let v of vPos) {
  for (let h of hPos) {
    markers.push({ left: v, top: h });
  }
}

export const GRID_CONFIG = {
  VERTICAL_POSITIONS: vPos,
  HORIZONTAL_POSITIONS: hPos,
  MARKER_POSITIONS: markers,
};

export const CONNECTOR_CONFIG = [
  {
    id: 'text-deep-roots',
    gap: 4,
    startAlign: 'left',
    pts: [
      {},
      { useStartRightX: true, useStartY: true },
      { x: 35, y: 52, jitterY: true },
      { x: 40, y: 52, jitterX: true, jitterY: true },
    ],
  },
  {
    id: 'text-imagination',
    gap: 4,
    startAlign: 'right',
    pts: [
      {},
      { useStartLeftX: true, useStartY: true },
      { x: 45, y: 40, jitterY: true },
      { x: 40, y: 40, jitterX: true, jitterY: true },
    ],
  },
  {
    id: 'card-monozukuri',
    gap: 0,
    pts: [
      {},
      { x: 75, useStartY: true },
      { x: 65, y: 56, jitterY: true },
      { x: 60, y: 56, jitterX: true, jitterY: true },
    ],
  },
  {
    id: 'text-foundation',
    gap: 4,
    startAlign: 'right',
    pts: [
      {},
      { useStartLeftX: true, useStartY: true },
      { x: 50, y: 78, jitterY: true },
      { x: 43, y: 72, jitterX: true, jitterY: true },
    ],
  },
];
