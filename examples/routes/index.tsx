// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import { months, numbers } from "../utils.ts";

export default function Home() {
  const barCfg = { count: 7, min: -100, max: 100 };
  const pieCfg = { count: 5, min: 0, max: 100 };
  return (
    <>
      <Head>
        <title>Fresh Charts Examples</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <div class="flex items-center">
          <img
            src="/logo.svg"
            class="w-32 h-32"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
          <div>
            <h1 class="text(4xl gray-700) font-bold">Fresh Charts</h1>
            <h2 class="text(xl gray-600) font-medium">Examples</h2>
          </div>
        </div>
        <h1 class="text(xl gray-600) font-medium mt-4">Bar Chart - Inline</h1>
        <Chart
          type="bar"
          options={{ devicePixelRatio: 1 }}
          data={{
            labels: months(barCfg),
            datasets: [
              {
                label: "Dataset 1",
                data: numbers(barCfg),
                backgroundColor: ChartColors.Red,
              },
              {
                label: "Dataset 2",
                data: numbers(barCfg),
                backgroundColor: ChartColors.Blue,
              },
              {
                label: "Dataset 3",
                data: numbers(barCfg),
                backgroundColor: ChartColors.Green,
              },
            ],
          }}
        />
        <h1 class="text(xl gray-600) font-medium mt-4">Pie Chart - Inline</h1>
        <Chart
          type="pie"
          options={{ devicePixelRatio: 1 }}
          data={{
            labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
            datasets: [
              {
                label: "Dataset 1",
                data: numbers(pieCfg),
                backgroundColor: [
                  ChartColors.Red,
                  ChartColors.Orange,
                  ChartColors.Yellow,
                  ChartColors.Green,
                  ChartColors.Blue,
                ],
              },
            ],
          }}
        />
        <h1 class="text(xl gray-600) font-medium mt-4">
          Line Chart - Image Tag
        </h1>
        <img
          src="/chart"
          class="mx-auto my-4 h-96"
          alt="an example chart provided as an image"
        />
        <h1 class="text(xl gray-600) font-medium mt-4">
          Polar Area Chart - Inline
        </h1>
        <Chart
          type="polarArea"
          options={{ devicePixelRatio: 1 }}
          data={{
            labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
            datasets: [
              {
                label: "Dataset 1",
                data: numbers(pieCfg),
                backgroundColor: [
                  ChartColors.Red,
                  ChartColors.Orange,
                  ChartColors.Yellow,
                  ChartColors.Green,
                  ChartColors.Blue,
                ],
              },
            ],
          }}
        />
      </div>
    </>
  );
}
