import * as THREE from "three";
import {
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
  PAPER_WORLD_HEIGHT,
  PAPER_WORLD_WIDTH,
} from "./constants";

export const PAPER_DEPTH = 0.014;
export const PAPER_FRONT_Z = PAPER_DEPTH / 2;

export type PaperScreenQuad = {
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
  visible: boolean;
};

const HALF_W = PAPER_WORLD_WIDTH / 2;
const HALF_H = PAPER_WORLD_HEIGHT / 2;

const LOCAL_CORNERS: [number, number, number][] = [
  [-HALF_W, HALF_H, PAPER_FRONT_Z],
  [HALF_W, HALF_H, PAPER_FRONT_Z],
  [-HALF_W, -HALF_H, PAPER_FRONT_Z],
  [HALF_W, -HALF_H, PAPER_FRONT_Z],
];

const _world = new THREE.Vector3();

export function computePaperScreenQuad(
  paperGroup: THREE.Object3D,
  camera: THREE.Camera,
  canvas: HTMLCanvasElement
): PaperScreenQuad {
  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;

  if (cw <= 0 || ch <= 0) {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      scale: 0,
      visible: false,
    };
  }

  paperGroup.updateWorldMatrix(true, false);

  const xs: number[] = [];
  const ys: number[] = [];
  let behind = 0;

  for (const [lx, ly, lz] of LOCAL_CORNERS) {
    _world.set(lx, ly, lz).applyMatrix4(paperGroup.matrixWorld);
    _world.project(camera);
    if (_world.z > 1) behind += 1;
    xs.push((_world.x * 0.5 + 0.5) * cw);
    ys.push((1 - (_world.y * 0.5 + 0.5)) * ch);
  }

  if (behind >= 4) {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      scale: 0,
      visible: false,
    };
  }

  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const top = Math.min(...ys);
  const bottom = Math.max(...ys);
  const width = right - left;
  const height = bottom - top;

  if (width < 8 || height < 8) {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      scale: 0,
      visible: false,
    };
  }

  const scaleX = width / CANVAS_WIDTH_PX;
  const scaleY = height / CANVAS_HEIGHT_PX;
  const scale = Math.min(scaleX, scaleY);

  return {
    left,
    top,
    width,
    height,
    scale,
    visible: true,
  };
}

export function quadsNearEqual(
  a: PaperScreenQuad | null,
  b: PaperScreenQuad,
  epsilon = 0.75
): boolean {
  if (!a || a.visible !== b.visible) return false;
  if (!b.visible) return true;
  return (
    Math.abs(a.left - b.left) < epsilon &&
    Math.abs(a.top - b.top) < epsilon &&
    Math.abs(a.width - b.width) < epsilon &&
    Math.abs(a.height - b.height) < epsilon &&
    Math.abs(a.scale - b.scale) < epsilon * 0.001
  );
}
