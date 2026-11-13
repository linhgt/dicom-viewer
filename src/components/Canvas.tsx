import type { Ref } from 'preact';

import styles from './Canvas.module.css';

type CanvasProps = {
  canvasRef?: Ref<HTMLCanvasElement>;
  label?: string;
};

export function Canvas({ canvasRef, label = 'DICOM image canvas' }: CanvasProps) {
  return <canvas ref={canvasRef} className={styles.canvas} aria-label={label} />;
}
