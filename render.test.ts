// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "std/testing/asserts.ts";
import { renderChart } from "./render.ts";

Deno.test({
  name: "renderChart() - renders",
  async fn() {
    const res = renderChart();
    assert(res instanceof Response);
    assertEquals(res.headers.get("content-type"), "image/svg+xml");
    const actual = await res.text();
    assertStringIncludes(
      actual,
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="768px" height="384px" viewBox="0 0 768 384">`,
    );
  },
});
