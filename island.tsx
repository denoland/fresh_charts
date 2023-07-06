import type { JSX } from "preact";
import { useEffect } from "preact/hooks";
import {
  type ChartConfiguration,
  type ChartType,
  type DefaultDataPoint,
  useChart,
} from "$fresh_charts/hook.ts";

export type { ChartType, DefaultDataPoint };

export type ChartProps<
  Type extends ChartType,
  Data = DefaultDataPoint<Type>,
  Label = unknown,
> = ChartConfiguration<Type, Data, Label> & {
  canvas?: JSX.HTMLAttributes<HTMLCanvasElement>;
};

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
