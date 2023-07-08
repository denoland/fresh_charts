import ChartJS, {
  type ChartConfiguration,
  type ChartType,
  type DefaultDataPoint,
} from "chart.js";
import { useEffect, useRef } from "preact/hooks";

export type { ChartConfiguration, ChartType, DefaultDataPoint };

/**
 * A hook which takes in a Chart.js configuration object and returns `canvasRef` and `chartRef`.
 *
 * `canvasRef` is a reference to the canvas element which the chart is rendered to.
 * `chartRef` is a reference to the Chart.js instance.
 *
 * View {@linkcode ChartConfiguration} for a list of configuration options.
 *
 * ### Example
 *
 * ```tsx
 * import { useChart, type ChartOptions, type ChartType } from "https://deno.land/x/fresh_charts/hook.ts";
 *
 * function Chart<Type extends ChartType>(props: ChartOptions<Type>) {
 *   const { canvasRef, chartRef } = useChart(props);
 *
 *   useEffect(() => {
 *     chartRef.current?.render();
 *   }, []);
 *
 *   return <canvas ref={canvasRef} />;
 * }
 * ```
 */
export function useChart<
  Type extends ChartType,
  Data = DefaultDataPoint<Type>,
  Label = unknown,
>(options: ChartConfiguration<Type, Data, Label>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS<Type, Data, Label> | null>(null);

  useEffect(() => {
    if (canvasRef.current === null) {
      throw new Error("canvas is null");
    }
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJS(
      canvasRef.current,
      options,
    );

    return () => {
      chartRef.current?.destroy();
    };
  }, [canvasRef, options]);

  return { canvasRef, chartRef };
}
