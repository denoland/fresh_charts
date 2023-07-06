import {
  Chart as FreshChart,
  type ChartProps,
  type ChartType,
} from "$fresh_charts/island.tsx";

export default function Chart<Type extends ChartType>(props: ChartProps<Type>) {
  return <FreshChart {...props} />;
}
