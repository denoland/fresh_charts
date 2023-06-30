// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { assertStringIncludes } from "std/testing/asserts.ts";
import { render } from "preact-render-to-string";
import { Chart } from "./Chart.tsx";

Deno.test({
  name: "Chart - renders",
  fn() {
    const actual = render(<Chart data={{ datasets: [] }} />);
    assertStringIncludes(
      actual,
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="768px" height="384px" viewBox="0 0 768 384">`,
    );
  },
});

Deno.test({
  name: "Chart - renders with svgClass, svgStyle",
  fn() {
    let actual = render(
      <Chart
        data={{ datasets: [] }}
        svgClass="w-full"
        svgStyle="width: 100%;"
      />,
    );
    assertStringIncludes(
      actual,
      `<svg class="w-full" style="width: 100%;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="768px" height="384px" viewBox="0 0 768 384">`,
    );

    actual = render(
      <Chart data={{ datasets: [] }} svgClass={`"`} svgStyle={`"`} />,
    );
    assertStringIncludes(
      actual,
      `<svg class="&quot;" style="&quot;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="768px" height="384px" viewBox="0 0 768 384">`,
    );
  },
});
