// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.

import { ChartJs } from "./deps.ts";
import type { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";

export type ChartType = ChartJs.ChartType;
export type DefaultDataPoint<TType extends ChartType> =
  ChartJs.DefaultDataPoint<TType>;

export type ChartProps<
  Type extends ChartType,
  Data = DefaultDataPoint<Type>,
  Label = unknown,
> = ChartJs.ChartConfiguration<Type, Data, Label> & {
  canvas?: JSX.HTMLAttributes<HTMLCanvasElement>;
};

/**
 * A hook which takes in a Chart.js configuration object and returns `canvasRef` and `chartRef`.
 *
 * `canvasRef` is a reference to the canvas element which the chart is rendered to.
 * `chartRef` is a reference to the Chart.js instance.
 */
function useChart<
  Type extends ChartType,
  Data = DefaultDataPoint<Type>,
  Label = unknown,
>(options: ChartJs.ChartConfiguration<Type, Data, Label>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJs.Chart<Type, Data, Label> | null>(null);

  useEffect(() => {
    if (canvasRef.current === null) {
      throw new Error("canvas is null");
    }
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJs.Chart(
      canvasRef.current,
      options,
    );

    return () => {
      chartRef.current?.destroy();
    };
  }, [canvasRef, options]);

  return { canvasRef, chartRef };
}

/**
 * A JSX component which can be used to client side render a chart inline
 * within a page.
 *
 * View {@linkcode ChartProps} for a list of properties that can be set
 * on the component.
 *
 * ### Example
 *
 * ```tsx
 * import { Chart } from "https://deno.land/x/fresh_charts/island.tsx";
 * import { ChartColors } from "https://deno.land/x/fresh_charts/utils.ts";
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
 *           borderWidth: 1,
 *         }, {
 *           label: "Users",
 *           data: [346, 233, 123],
 *           borderColor: ChartColors.Blue,
 *           borderWidth: 1,
 *         }],
 *       }}
 *     />
 *   <>;
 * }
 * ```
 */
export function Chart<Type extends ChartType>(props: ChartProps<Type>) {
  const { canvasRef, chartRef } = useChart<Type>(props);

  useEffect(() => {
    chartRef.current?.render();
  }, []);

  return <canvas ref={canvasRef} />;
}
