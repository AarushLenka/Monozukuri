export const THREAD_ITEMS = [
  { id: '01.', tag: 'MICROCONTROLLER', title: 'ESP32', barWidth: 132, animDur: '5s', animDelay: '-0.54s' },
  { id: '02.', tag: 'VLSI', title: 'VERILOG, PHYSICAL DESIGN, CMOS', barWidth: 160, animDur: '5s', animDelay: '-1.18s' },
  { id: '03.', tag: 'AI AUTOMATION', title: 'N8N, LANGCHAIN, MCP', barWidth: 106, animDur: '5s', animDelay: '-2.07s' },
  { id: '04.', tag: 'IOT', title: 'AWS, AZURE, FIREBASE', barWidth: 138, animDur: '5s', animDelay: '-1.46s' },
  { id: '05.', tag: 'LOREM IPSUM', title: 'DOLOR SIT AMET', barWidth: 116, animDur: '5s', animDelay: '-2.41s' },
  { id: '06.', tag: 'CONSECTETUR', title: 'ADIPISCING ELIT', barWidth: 126, animDur: '5s', animDelay: '-0.89s' },
  { id: '07.', tag: 'SED DO', title: 'EIUSMOD TEMPOR', barWidth: 102, animDur: '5s', animDelay: '-1.73s' },
];

export const PIXEL_CONFIG = {
  WIDTH: 7,
  HEIGHT: 13,
  COLOR: '#f1f1f1',
  UPDATE_INTERVAL: 220,
  LOWER_BIAS: 0.58,
  DECAY_LOWER: 0.985,
  DECAY_UPPER: 0.82,
  SPAWN_LOWER: 0.78,
  SPAWN_UPPER: 0.94,
};

export const GRID_CONFIG = {
  VERTICAL_POSITIONS: ['25%', '50%', '75%'],
  HORIZONTAL_POSITIONS: ['33.33%', '66.66%'],
  MARKER_POSITIONS: [
    { left: '25%', top: '33.33%' },
    { left: '50%', top: '33.33%' },
    { left: '75%', top: '33.33%' },
    { left: '25%', top: '66.66%' },
    { left: '50%', top: '66.66%' },
    { left: '75%', top: '66.66%' },
  ],
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
