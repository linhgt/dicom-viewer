import type { ComponentChildren } from 'preact';

import styles from './Viewport.module.css';

type ViewportProps = {
  children?: ComponentChildren;
};

export function Viewport({ children }: ViewportProps) {
  return <div className={styles.viewport}>{children}</div>;
}
