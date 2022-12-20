// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { assertEquals } from "std/testing/asserts.ts";
import * as mod from "./mod.ts";

Deno.test({
  name: "/mod.ts has expected exports",
  fn() {
    assertEquals(typeof mod.Chart, "function");
    assertEquals(typeof mod.renderChart, "function");
    assertEquals(Object.entries(mod).length, 4);
  },
});
