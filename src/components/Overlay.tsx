import type { ComponentChildren } from 'preact';

import styles from './Overlay.module.css';

type OverlayProps = {
  children?: ComponentChildren;
};

type CornerProps = {
  children?: ComponentChildren;
};

function TopLeftCorner({ children }: CornerProps) {
  return <div className={`${styles.corner} ${styles.topLeft}`}>{children}</div>;
}

function TopRightCorner({ children }: CornerProps) {
  return <div className={`${styles.corner} ${styles.topRight}`}>{children}</div>;
}

function BottomLeftCorner({ children }: CornerProps) {
  return <div className={`${styles.corner} ${styles.bottomLeft}`}>{children}</div>;
}

function BottomRightCorner({ children }: CornerProps) {
  return <div className={`${styles.corner} ${styles.bottomRight}`}>{children}</div>;
}

export const Overlay = Object.assign(
  function OverlayRoot({ children }: OverlayProps) {
    return <div className={styles.overlay}>{children}</div>;
  },
  {
    TopLeftCorner,
    TopRightCorner,
    BottomLeftCorner,
    BottomRightCorner,
  },
);
