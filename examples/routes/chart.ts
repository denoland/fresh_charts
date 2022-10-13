// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { type Handlers } from "$fresh/server.ts";
import { renderChart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import { months, numbers } from "../utils.ts";

export const handler: Handlers = {
  GET() {
    const cfg = { count: 7, min: -100, max: 100 };
    return renderChart({
      type: "line",
      data: {
        labels: months(cfg),
        datasets: [
          {
            label: "Dataset 1",
            data: numbers(cfg),
            borderColor: ChartColors.Red,
            backgroundColor: transparentize(ChartColors.Red),
          },
          {
            label: "Dataset 2",
            data: numbers(cfg),
            borderColor: ChartColors.Blue,
            backgroundColor: transparentize(ChartColors.Blue),
          },
        ],
      },
      options: { devicePixelRatio: 1 },
    });
  },
};
