# fresh_charts

A full stack charting library for Fresh based on
[Chart.js](https://www.chartjs.org/).

## Usage

There are several ways to render a chart.

For server side rendering there is the JSX/TSX component `Chart` which can be
used to inline a chart on a page, and the `renderChart()` function which can be
used to respond in a handler with an SVG image.

For client side rendering there is also a JSX/TSX component `Chart` as well as a
custom hook `useChart`, which offers more flexibilty and control.

### [SSR] Inline chart example

This provides a chart rendered within the router page itself.

```tsx
import { Head } from "$fresh/runtime.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Example Chart</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Chart
          type="line"
          options={{
            devicePixelRatio: 1,
            scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          }}
          data={{
            labels: ["1", "2", "3"],
            datasets: [{
              label: "Sessions",
              data: [123, 234, 234],
              borderColor: ChartColors.Red,
              backgroundColor: transparentize(ChartColors.Red, 0.5),
              borderWidth: 1,
            }, {
              label: "Users",
              data: [346, 233, 123],
              borderColor: ChartColors.Blue,
              backgroundColor: transparentize(ChartColors.Blue, 0.5),
              borderWidth: 1,
            }],
          }}
        />
      </div>
    </>
  );
}
```

### [SSR] Responding as an image

This route will provide the landing page of the site, which has an image link to
a route, which will send a request to `/routes/chart.ts` to render the chart.

**/routes/index.tsx**

```tsx
import { Head } from "$fresh/runtime.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Example Chart</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/chart"
          class="mx-auto my-4 h-96"
          alt="an example chart provided as an image"
        />
      </div>
    </>
  );
}
```

**/routes/chart.ts**

```ts
import { type Handlers } from "$fresh/server.ts";
import { renderChart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export const handler: Handlers = {
  GET() {
    return renderChart({
      type: "line",
      data: {
        labels: ["1", "2", "3"],
        datasets: [{
          label: "Sessions",
          data: [123, 234, 234],
          borderColor: ChartColors.Red,
          backgroundColor: transparentize(ChartColors.Red, 0.5),
          borderWidth: 1,
        }, {
          label: "Users",
          data: [346, 233, 123],
          borderColor: ChartColors.Blue,
          backgroundColor: transparentize(ChartColors.Blue, 0.5),
          borderWidth: 1,
        }],
      },
      options: {
        devicePixelRatio: 1,
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
      },
    });
  },
};
```

### [CSR] Inline chart example

This provides a client side rendered and interactive chart within the router
page itself.

**/islands/chart.tsx**

```tsx
import { Chart } from "$fresh_charts/island.tsx";

export default Chart;
```

**/routes/index.tsx**

```tsx
import { Head } from "$fresh/runtime.ts";
import { ChartColors } from "$fresh_charts/utils.ts";
import { Chart } from "../islands/chart.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Example Chart</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Chart
          type="line"
          options={{
            scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          }}
          data={{
            labels: ["1", "2", "3"],
            datasets: [{
              label: "Sessions",
              data: [123, 234, 234],
              borderColor: ChartColors.Red,
              borderWidth: 1,
            }, {
              label: "Users",
              data: [346, 233, 123],
              borderColor: ChartColors.Blue,
              borderWidth: 1,
            }],
          }}
        />
      </div>
    </>
  );
}
```

### [CSR] Using the provided hook

**/islands/chart.tsx**

```tsx
import { useEffect } from "preact/hooks";
import { useChart, type ChartConfiguration, type ChartType } from "$fresh_charts/hook.tsx";

export default function Chart<Type extends ChartType>(props: ChartConfiguration<Type>) {
  const { canvasRef, chartRef } = useChart<Type>(props);

  useEffect(() => {
    chartRef.current?.render();
  }, []);

  return <canvas ref={canvasRef} />;
}
```

**/routes/index.tsx**

```tsx
import { Head } from "$fresh/runtime.ts";
import { ChartColors } from "$fresh_charts/utils.ts";
import { Chart } from "../islands/chart.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Example Chart</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Chart
          type="line"
          options={{
            scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          }}
          data={{
            labels: ["1", "2", "3"],
            datasets: [{
              label: "Sessions",
              data: [123, 234, 234],
              borderColor: ChartColors.Red,
              borderWidth: 1,
            }, {
              label: "Users",
              data: [346, 233, 123],
              borderColor: ChartColors.Blue,
              borderWidth: 1,
            }],
          }}
        />
      </div>
    </>
  );
}
```

---

Copyright 2018-2022 the Deno authors. All rights reserved. MIT Licensed.
