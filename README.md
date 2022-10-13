# fresh_charts

A server side rendered charting library for Fresh based on
[Chart.js](https://www.chartjs.org/).

## Usage

There are two main ways to render a chart. There is the JSX/TSX component
`Chart` which can be used to inline a chart on a page, and the `renderChart()`
function which can be used to respond in a handler with an SVG image.

### Inline chart example

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

### Responding as an image

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

---

Copyright 2018-2022 the Deno authors. All rights reserved. MIT Licensed.
