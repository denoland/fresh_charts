// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

/**
 * A server side rendered charting library for Fresh based on
 * [Chart.js](https://www.chartjs.org/).
 *
 * There are two ways of rendering charts. {@linkcode Chart} is a JSX/TSX
 * components which can be used when inlining charts within a page.
 * {@linkcode renderChart} is a function which renders a chart and returns it as
 * a {@linkcode Response} where the body is an SVG image of the chart.
 *
 * ### Example of an inline chart
 *
 * ```tsx
 * import { Chart } from "https://deno.land/x/fresh_charts/mod.ts";
 * import {
 *   ChartColors,
 *   transparentize
 * } from "https://deno.land/x/fresh_charts/utils.ts";
 *
 * export default App() {
 *   return <>
 *     <h1>Chart Example</h1>
 *     <Chart
 *       type="line"
 *       options={{
 *         scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
 *       }}
 *       data={{
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
 *       }}
 *     />
 *   <>;
 * }
 * ```
 *
 * @module
 */

export { Chart } from "./Chart.tsx";
export {
  type ChartConfiguration,
  type ChartOptions,
  defaults,
  plugins,
} from "./core.ts";
export { renderChart } from "./render.ts";
