import styles from "./styles.module.css";

export default function ViewerPage() {
  return (
    <div className={styles.viewerPage}>
      <header className={styles.viewerHeader}>
        <div>
          <p className={styles.eyebrow}>DICOM workspace</p>
          <h1>Medical Viewer</h1>
        </div>
      </header>

      <div className={styles.viewerWorkspace}>
        <aside className={styles.seriesPanel} aria-labelledby="series-heading">
          <div className={styles.panelHeader}>
            <h2 id="series-heading">Series</h2>
            <span className={styles.seriesCount}>0</span>
          </div>

          <div className={styles.emptySeries}>
            <p>No series loaded</p>
            <span>Series will appear here.</span>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <section className={styles.viewerSurface} aria-label="Image viewport">
            <canvas
              className={styles.viewerCanvas}
              aria-label="DICOM image canvas"
            />
          </section>
        </main>
      </div>
    </div>
  );
}
