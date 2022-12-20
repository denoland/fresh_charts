// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { chart, type ChartConfiguration } from "./core.ts";
import { type ChartJs } from "./deps.ts";

/** Render a chart, based on the configuration, returning the chart as an SVG
 * {@linkcode Response}.
 *
 * View {@linkcode ChartConfiguration} for information on how to configure a
 * chart to be rendered.
 *
 * ```ts
 * import { type Handlers } from "$fresh/server.ts";
 * import { renderChart } from "https://deno.land/x/fresh_charts/mod.ts";
 * import {
 *   ChartColors,
 *   transparentize
 * } from "https://deno.land/x/fresh_charts/utils.ts";
 *
 * export const handler: Handlers = {
 *   GET() {
 *     return renderChart({
 *       type: "line",
 *       data: {
 *         labels: ["1", "2", "3"],
 *         datasets: [{
 *           label: "Sessions",
 *           data: [123, 234, 234],
 *           borderColor: ChartColors.Red,
 *           backgroundColor: transparentize(ChartColors.Red, 0.5),
 *           borderWidth: 1,
 *         }, {
 *           label: "Users",
 *           data: [346, 233, 123],
 *           borderColor: ChartColors.Blue,
 *           backgroundColor: transparentize(ChartColors.Blue, 0.5),
 *           borderWidth: 1,
 *         }],
 *       },
 *       options: {
 *         devicePixelRatio: 1,
 *         scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
 *       },
 *     });
 *   },
 * };
 * ```
 */
export function renderChart<
  TType extends ChartJs.ChartType = ChartJs.ChartType,
  TData = ChartJs.DefaultDataPoint<TType>,
  TLabel = unknown,
>(configuration?: ChartConfiguration<TType, TData, TLabel>): Response {
  return new Response(chart(configuration), {
    headers: { "content-type": "image/svg+xml" },
  });
}
