export interface ResumeElement {
  id: string;
  type: 'text' | 'heading' | 'image' | 'divider';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;

  // text content
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  lineHeight?: number;

  // images
  src?: string;
  opacity?: number;
  borderRadius?: number;
}

