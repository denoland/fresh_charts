// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

let _seed = Date.now();

export function srand(seed: number): void {
  _seed = seed;
}

export function rand(min = 0, max = 0): number {
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

interface Config {
  min?: number;
  max?: number;
  from?: number[];
  count?: number;
  decimals?: number;
  continuity?: number;
  rmin?: number;
  rmax?: number;
  prefix?: string;
  section?: number;
}

export function numbers({
  min = 0,
  max = 100,
  from = [],
  count = 8,
  decimals = 8,
  continuity = 1,
}: Config = {}): (number | null)[] {
  const dfactor = Math.pow(10, decimals) || 0;
  const data: (number | null)[] = [];

  for (let i = 0; i < count; ++i) {
    const value = (from[i] || 0) + rand(min, max);
    if (rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

interface Point {
  x: number | null;
  y: number | null;
  r?: number;
}

export function points(config?: Config): Point[] {
  const xs = numbers(config);
  const ys = numbers(config);
  return xs.map((x, i) => ({ x, y: ys[i] }));
}

export function bubbles(config: Config = {}) {
  return points(config).map((pt) => {
    pt.r = rand(config.rmin, config.rmax);
    return pt;
  });
}

export function labels({
  min = 0,
  max = 100,
  count = 8,
  decimals = 8,
  prefix = "",
}: Config = {}): string[] {
  const step = (max - min) / count;
  const dfactor = Math.pow(10, decimals) || 0;
  const values = [];

  for (let i = min; i < max; i += step) {
    values.push(prefix + Math.round(dfactor * i) / dfactor);
  }

  return values;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function months({ count = 12, section }: Config = {}) {
  const values = [];

  for (let i = 0; i < count; ++i) {
    const value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

const COLORS = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
];

export function color(index: number): string {
  return COLORS[index % COLORS.length];
}
