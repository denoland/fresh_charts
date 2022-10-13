// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { colorLib } from "./deps.ts";

/** A set of CSS RGB colors which can be used with charts. */
export enum ChartColors {
  Red = "rgb(255, 99, 132)",
  Orange = "rgb(255, 159, 64)",
  Yellow = "rgb(255, 205, 86)",
  Green = "rgb(75, 192, 192)",
  Blue = "rgb(54, 162, 235)",
  Purple = "rgb(153, 102, 255)",
  Grey = "rgb(201, 203, 207)",
}

/** A utility function which takes a CSS string color value and applies the
 * percentage of opacity to it and returns a new CSS string color value.
 *
 * If the opacity is not provided, it defaults to 50%.
 */
export function transparentize(value: string, opacity?: number) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}
