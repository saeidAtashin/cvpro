import { CANVAS_HEIGHT_PX, CANVAS_WIDTH_PX } from "../constants";

export const REF_W = 595;
export const REF_H = 842;

const SCALE_X = CANVAS_WIDTH_PX / REF_W;
const SCALE_Y = CANVAS_HEIGHT_PX / REF_H;

export function sx(value: number): number {
  return value * SCALE_X;
}

export function sy(value: number): number {
  return value * SCALE_Y;
}

export function scaleRect(
  x: number,
  y: number,
  w: number,
  h: number
): { x: number; y: number; width: number; height: number } {
  return { x: sx(x), y: sy(y), width: sx(w), height: sy(h) };
}
