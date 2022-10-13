// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { assertStringIncludes } from "std/testing/asserts.ts";
import { chart } from "./core.ts";

Deno.test({
  name: "core - chart() - renders",
  fn() {
    const actual = chart();
    assertStringIncludes(
      actual,
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="768px" height="384px" viewBox="0 0 768 384">`,
    );
  },
});
