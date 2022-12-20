// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { chart, type ChartConfiguration } from "./core.ts";
import { type ChartJs } from "./deps.ts";

/** A JSX component which is can be used to server side render a chart inline
 * within a page.
 *
 * View {@linkcode ChartConfiguration} for a list of properties that can be set
 * on the component.
 *
 * ### Example
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
 */
export function Chart<
  TType extends ChartJs.ChartType = ChartJs.ChartType,
  TData = ChartJs.DefaultDataPoint<TType>,
  TLabel = unknown,
>(opts: ChartConfiguration<TType, TData, TLabel>) {
  return <span dangerouslySetInnerHTML={{ __html: chart(opts) }}></span>;
}
