#!/usr/bin/env node
/** Verify JS preview math matches CSS clamp formula (see docs/DEVELOPMENT.md). */

const DEFAULTS = {
  fontSizeMin: 15,
  fontSizeMax: 16,
  fontRatioMin: 1.2,
  fontRatioMax: 1.3333,
  fontWidthMin: 360,
  fontWidthMax: 1440,
  fontSizeFloor: 8,
  remBase: 16,
  variableUnit: '100vi',
};

function applyFloor(px, c) {
  return Math.max(px, c.fontSizeFloor);
}

function fluidMin(level, c) {
  return c.fontSizeMin * Math.pow(c.fontRatioMin, level);
}

function fluidMax(level, c) {
  return c.fontSizeMax * Math.pow(c.fontRatioMax, level);
}

function slope(level, c) {
  return (fluidMax(level, c) - fluidMin(level, c)) / (c.fontWidthMax - c.fontWidthMin);
}

function sizeAtViewport(level, vw, c) {
  const min = fluidMin(level, c);
  const max = fluidMax(level, c);
  const m = slope(level, c);
  const preferred = min - m * c.fontWidthMin + m * vw;
  return applyFloor(Math.max(min, Math.min(max, preferred)), c);
}

function sizeFromCssFormula(level, vw, c) {
  const min = fluidMin(level, c);
  const max = fluidMax(level, c);
  const m = slope(level, c);
  const preferred = min - m * c.fontWidthMin + m * vw;
  return applyFloor(Math.max(min, Math.min(max, preferred)), c);
}

const c = DEFAULTS;
const viewports = [c.fontWidthMin, 768, c.fontWidthMax];
let failures = 0;

const FRACTIONAL_LEVELS = [-0.5, 0.5];
const TEST_LEVELS = (() => {
  const arr = [];
  for (let level = -3; level <= 9; level++) arr.push(level);
  for (const f of FRACTIONAL_LEVELS) arr.push(f);
  return arr.sort((a, b) => a - b);
})();

for (const level of TEST_LEVELS) {
  for (const vw of viewports) {
    const a = sizeAtViewport(level, vw, c);
    const b = sizeFromCssFormula(level, vw, c);
    if (Math.abs(a - b) > 0.001) {
      console.error(`FAIL Lv${level} @ ${vw}px: ${a} vs ${b}`);
      failures++;
    }
  }
}

if (failures) {
  process.exit(1);
}

console.log('OK — formula consistent for', TEST_LEVELS.length, 'levels @', viewports.join(', '));
console.log('Sample Lv0:', {
  SP: sizeAtViewport(0, c.fontWidthMin, c),
  PC: sizeAtViewport(0, c.fontWidthMax, c),
  mid: sizeAtViewport(0, 768, c),
});

function effectiveSpMin(level, c) {
  return sizeAtViewport(level, c.fontWidthMin, c);
}

function effectivePcMax(level, c) {
  return sizeAtViewport(level, c.fontWidthMax, c);
}

for (const level of TEST_LEVELS) {
  const sp = effectiveSpMin(level, c);
  const pc = effectivePcMax(level, c);
  const rawMin = fluidMin(level, c);
  const rawMax = fluidMax(level, c);
  if (pc < Math.max(sp, c.fontSizeFloor) - 0.001 && rawMin > rawMax) {
    console.error(`FAIL Lv${level}: PC endpoint ${pc} < expected max(${sp}, floor)`);
    failures++;
  }
  if (sp !== sizeAtViewport(level, c.fontWidthMin, c) || pc !== sizeAtViewport(level, c.fontWidthMax, c)) {
    console.error(`FAIL Lv${level}: endpoint helpers mismatch`);
    failures++;
  }
}
