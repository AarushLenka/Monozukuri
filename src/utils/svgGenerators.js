/**
 * Pure-math SVG path generators — no React dependencies.
 * Pre-computed at module load time and exported as constants.
 */

const generateAMPaths = () => {
  const amPts = [];
  const envLeftPts = [];
  const envRightPts = [];

  for (let y = 0; y <= 610; y += 2) {
    const t = y / 610;
    const env = 60 + 40 * Math.sin(t * Math.PI * 5);
    const carrier = Math.sin(t * Math.PI * 70);
    const x = env * carrier;
    amPts.push(`${x.toFixed(1)},${y}`);

    if (y % 6 === 0) {
      envLeftPts.push(`${(-env).toFixed(1)},${y}`);
      envRightPts.push(`${env.toFixed(1)},${y}`);
    }
  }

  return {
    wave: `M ${amPts.join(' L ')}`,
    envLeft: `M ${envLeftPts.join(' L ')}`,
    envRight: `M ${envRightPts.join(' L ')}`,
  };
};

const generateCityPaths = () => {
  const drawLayer = (buildings, doWindows = false) => {
    // Smooth out deep narrow valleys/dips in the skyline
    let smoothedBuildings = [...buildings];
    for (let iter = 0; iter < 3; iter++) {
      for (let i = 1; i < smoothedBuildings.length - 1; i++) {
        const b = smoothedBuildings[i];
        const leftH = smoothedBuildings[i - 1].h;
        const rightH = smoothedBuildings[i + 1].h;
        if (b.h > leftH && b.h > rightH) {
          smoothedBuildings[i] = { ...b, h: Math.max(leftH, rightH) };
        }
      }
    }

    let outline = 'M 0 900 ';
    let x = 0;
    let windows = '';
    for (let b of smoothedBuildings) {
      if (b.type === "flat") {
        outline += `L ${x} ${b.h} L ${x + b.w} ${b.h} `;
      } else if (b.type === "spire") {
        outline += `L ${x} ${b.h} L ${x + b.w / 2 - 2} ${b.h} L ${x + b.w / 2} ${b.h - b.spire} L ${x + b.w / 2 + 2} ${b.h} L ${x + b.w} ${b.h} `;
      } else if (b.type === "step") {
        outline += `L ${x} ${b.h} L ${x + b.w / 4} ${b.h} L ${x + b.w / 4} ${b.h - b.step} L ${x + 3 * b.w / 4} ${b.h - b.step} L ${x + 3 * b.w / 4} ${b.h} L ${x + b.w} ${b.h} `;
      }

      if (doWindows && b.w > 20 && b.h < 850) {
        let seed = x * b.h;
        const pseudoRand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        for (let wy = b.h + 20; wy < 880; wy += 20) {
          if (pseudoRand() > 0.4) {
            windows += `M ${x + 8} ${wy} L ${x + b.w - 8} ${wy} `;
          }
        }
      }
      x += b.w;
    }
    outline += `L 1440 900 Z`;
    return { outline, windows };
  };

  const front = drawLayer([
    { w: 50, h: 880, type: 'flat' }, { w: 30, h: 800, type: 'flat' }, { w: 20, h: 850, type: 'flat' },
    { w: 40, h: 780, type: 'flat' }, { w: 60, h: 720, type: 'step', step: 40 }, { w: 30, h: 820, type: 'flat' },
    { w: 40, h: 650, type: 'step', step: 30 }, { w: 20, h: 800, type: 'flat' }, { w: 50, h: 550, type: 'spire', spire: 60 },
    { w: 40, h: 700, type: 'flat' }, { w: 30, h: 600, type: 'flat' }, { w: 30, h: 750, type: 'flat' },
    { w: 20, h: 820, type: 'flat' }, { w: 80, h: 620, type: 'step', step: 50 }, { w: 40, h: 750, type: 'flat' },
    { w: 20, h: 830, type: 'flat' }, { w: 70, h: 400, type: 'spire', spire: 150 }, { w: 30, h: 750, type: 'flat' },
    { w: 60, h: 650, type: 'step', step: 40 }, { w: 40, h: 800, type: 'flat' }, { w: 50, h: 500, type: 'spire', spire: 80 },
    { w: 30, h: 700, type: 'flat' }, { w: 60, h: 620, type: 'flat' }, { w: 40, h: 750, type: 'flat' },
    { w: 70, h: 450, type: 'step', step: 60 }, { w: 30, h: 700, type: 'flat' }, { w: 50, h: 800, type: 'flat' },
    { w: 40, h: 650, type: 'flat' }, { w: 60, h: 600, type: 'step', step: 40 }, { w: 50, h: 750, type: 'flat' },
    { w: 30, h: 820, type: 'flat' }, { w: 40, h: 780, type: 'flat' }, { w: 50, h: 850, type: 'step', step: 20 },
    { w: 40, h: 880, type: 'flat' }
  ], true);

  const mid = drawLayer([
    { w: 80, h: 800, type: 'flat' }, { w: 50, h: 700, type: 'step', step: 30 }, { w: 60, h: 550, type: 'flat' },
    { w: 40, h: 750, type: 'flat' }, { w: 70, h: 400, type: 'spire', spire: 80 }, { w: 50, h: 650, type: 'flat' },
    { w: 80, h: 480, type: 'step', step: 40 }, { w: 60, h: 700, type: 'flat' }, { w: 90, h: 300, type: 'spire', spire: 120 },
    { w: 60, h: 600, type: 'flat' }, { w: 50, h: 450, type: 'step', step: 50 }, { w: 80, h: 680, type: 'flat' },
    { w: 70, h: 350, type: 'spire', spire: 90 }, { w: 60, h: 550, type: 'flat' }, { w: 80, h: 420, type: 'step', step: 60 },
    { w: 50, h: 720, type: 'flat' }, { w: 90, h: 320, type: 'spire', spire: 100 }, { w: 60, h: 650, type: 'flat' },
    { w: 70, h: 500, type: 'step', step: 40 }, { w: 50, h: 750, type: 'flat' }, { w: 60, h: 600, type: 'flat' },
    { w: 80, h: 800, type: 'flat' }
  ], true);

  const back = drawLayer([
    { w: 120, h: 750, type: 'flat' }, { w: 90, h: 600, type: 'step', step: 50 }, { w: 80, h: 450, type: 'flat' },
    { w: 100, h: 300, type: 'spire', spire: 100 }, { w: 110, h: 550, type: 'flat' }, { w: 90, h: 400, type: 'step', step: 60 },
    { w: 120, h: 250, type: 'spire', spire: 150 }, { w: 100, h: 500, type: 'flat' }, { w: 90, h: 350, type: 'step', step: 70 },
    { w: 110, h: 600, type: 'flat' }, { w: 100, h: 280, type: 'spire', spire: 110 }, { w: 80, h: 480, type: 'flat' },
    { w: 90, h: 650, type: 'step', step: 40 }, { w: 160, h: 750, type: 'flat' }
  ], false);

  const stars = [];
  let seed = 42;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = 0; i < 50; i++) {
    stars.push({
      cx: rand() * 1440,
      cy: rand() * 400,
      r: rand() * 1.5,
      opacity: rand() * 0.5 + 0.2
    });
  }

  return { front, mid, back, stars };
};

export const AM_PATHS = generateAMPaths();
export const CITY_PATHS = generateCityPaths();
