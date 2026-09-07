import styles from "./styles.module.css";

export default function ViewerPage() {
  return (
    <main className={styles.viewerPage}>
      <header className={styles.viewerHeader}>
        <p className={styles.eyebrow}>DICOM workspace</p>
        <h1>Medical Viewer</h1>
      </header>

      <section className={styles.viewerSurface} aria-label="Image viewport">
        <canvas
          className={styles.viewerCanvas}
          aria-label="DICOM image canvas"
        />
      </section>
    </main>
  );
}
