import type { ViewMode } from "./types";

export interface CameraPreset {
  position: [number, number, number];
  fov: number;
  target: [number, number, number];
}

/** Static camera positions keyed by editor view mode */
export const CAMERA_PRESETS: Record<ViewMode, CameraPreset> = {
  edit: {
    position: [0, 0.75, 2.4],
    fov: 45,
    target: [0, 0, 0],
  },
  preview: {
    position: [0, 1.2, 4.5],
    fov: 50,
    target: [0, 0, 0],
  },
};

/**
 * Optional timed camera sequences for intro / showcase (not wired in v1).
 * Each step holds for `durationMs` then lerps to the next preset.
 *
 * Example:
 * ```ts
 * export const INTRO_SEQUENCE: CameraSequenceStep[] = [
 *   { preset: CAMERA_PRESETS.preview, durationMs: 800 },
 *   { preset: CAMERA_PRESETS.edit, durationMs: 1200 },
 * ];
 * ```
 */
export interface CameraSequenceStep {
  preset: CameraPreset;
  durationMs: number;
}

/** Placeholder — assign steps when you want automated zoom choreography */
export const INTRO_SEQUENCE: CameraSequenceStep[] = [];

/** Placeholder — e.g. alternate fit ↔ edit for marketing preview */
export const SHOWCASE_SEQUENCE: CameraSequenceStep[] = [];
