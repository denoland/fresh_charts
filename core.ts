// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { ChartJs, Rect2D, SvgCanvas, SvgCanvas2DGradient } from "./deps.ts";

/** The set of chart options that are supported. Unsupported or fixed values
 * are omitted from the underlying {@linkcode ChartJs.ChartOptions}. */
export type ChartOptions = Omit<
  ChartJs.ChartOptions,
  | "responsive"
  | "responsiveAnimationDuration"
  | "events"
  | "legendCallback"
  | "onHover"
  | "onClick"
  | "onResize"
  | "hover"
  | "animation"
>;

/** The configuration options that are settable when rendering a chart. */
export interface ChartConfiguration {
  /** The width, in pixels, of the chart.
   *
   * Defaults to `768`.
   */
  width?: number;
  /** The height, in pixels, of the chart.
   *
   * Defaults to `384`.
   */
  height?: number;
  /** The type of chart.
   *
   * Defaults to `"line"`.
   */
  type?: ChartJs.ChartType;
  /** Data to be rendered in the chart. */
  data?: ChartJs.ChartData;
  /** Options which can be configured on the chart. */
  options?: ChartOptions;
  /** Chart plugins to be registered for the chart. */
  plugins?: ChartJs.PluginServiceRegistrationOptions[];
}

interface SvgCanvasCanvas {
  canvas?: {
    width: number;
    height: number;
    style: Record<string, string>;
  };
}

/** Global plugins for the underlying Chart.js library. */
export const plugins = ChartJs.plugins;

/** Render a chart, returning a SVG string representation of the chart.
 *
 * This is a lower level function, where the `Chart` component and `renderChart`
 * are intended for use within a Fresh application.
 */
export function chart(
  { width = 768, height = 384, type, data, options = {}, plugins }:
    ChartConfiguration = {},
): string {
  Object.assign(options, {
    animation: false,
    events: [],
    responsive: false,
  });

  const ctx: SvgCanvas & SvgCanvasCanvas = new SvgCanvas();
  ctx.canvas = {
    width,
    height,
    style: { width: `${width}px`, height: `${height}px` },
  };
  ctx.fontHeightRatio = 2;
  // deno-lint-ignore no-explicit-any
  const el: HTMLCanvasElement = { getContext: () => ctx } as any;
  const savedGradient = globalThis.CanvasGradient;
  globalThis.CanvasGradient = SvgCanvas2DGradient as typeof CanvasGradient;

  try {
    new ChartJs.Chart(el, { type, data, options, plugins });
  } finally {
    if (savedGradient) {
      globalThis.CanvasGradient = savedGradient;
    }
  }

  return ctx.render(new Rect2D(0, 0, width, height), "px");
}
