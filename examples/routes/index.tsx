// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors } from "$fresh_charts/utils.ts";
import ChartIsland from "../islands/chart.tsx";
import { months, numbers } from "../utils.ts";

export default function Home() {
  const barCfg = { count: 7, min: -100, max: 100 };
  const lineCfg = { count: 7, min: -100, max: 100 };
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
        <h3 class="text(xl gray-600) font-medium mt-4">Bar Chart - Inline</h3>
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
          svgClass="w-full"
        />
        <h3 class="text(xl gray-600) font-medium mt-4">Pie Chart - Inline</h3>
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
          svgStyle="width: 100%;"
        />
        <h3 class="text(xl gray-600) font-medium mt-4">
          Line Chart - Image Tag
        </h3>
        <img
          src="/chart"
          class="mx-auto my-4 h-96"
          alt="an example chart provided as an image"
        />
        <h3 class="text(xl gray-600) font-medium mt-4">
          Polar Area Chart - Inline
        </h3>
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
          svgClass="w-full"
        />
        <h3 class="text(xl gray-600) font-medium mt-4">Bar Chart - Island</h3>
        <ChartIsland
          type="bar"
          options={{ interaction: { mode: "index", intersect: false } }}
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
        <h3 class="text(xl gray-600) font-medium mt-4">Line Chart - Island</h3>
        <ChartIsland
          type="line"
          options={{ interaction: { mode: "index", intersect: false } }}
          data={{
            labels: months(lineCfg),
            datasets: [
              {
                label: "Dataset 1",
                data: numbers(lineCfg),
                borderColor: ChartColors.Red,
              },
              {
                label: "Dataset 2",
                data: numbers(lineCfg),
                borderColor: ChartColors.Blue,
              },
            ],
          }}
        />
      </div>
    </>
  );
}
