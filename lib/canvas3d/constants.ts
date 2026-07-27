/** A4 at 96 DPI — matches resume builder and export-cv-image scaling */
export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;
export const MM_TO_PX = 3.779527559;

export const CANVAS_WIDTH_PX = A4_WIDTH_MM * MM_TO_PX;
export const CANVAS_HEIGHT_PX = A4_HEIGHT_MM * MM_TO_PX;

/** Paper mesh in world units (aspect ratio preserved) */
export const PAPER_WORLD_WIDTH = 2.1;
export const PAPER_WORLD_HEIGHT = (A4_HEIGHT_MM / A4_WIDTH_MM) * PAPER_WORLD_WIDTH;

export const CANVAS3D_TEMPLATE_ID = "3d-canvas-cv";
export const CANVAS3D_STORAGE_KEY = `canvas3d:${CANVAS3D_TEMPLATE_ID}`;
