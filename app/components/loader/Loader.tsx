import styles from './loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.circleLoader}>
      <div className={`${styles.circle} ${styles.circle1}`}></div>
      <div className={`${styles.circle} ${styles.circle2}`}></div>
      <div className={`${styles.circle} ${styles.circle3}`}></div>
      <div className={`${styles.circle} ${styles.circle4}`}></div>
      <div className={styles.timerText}>Lädt</div>
      </div>
    </div>
  );
}

export default Loader;

// #29a7df
// #a8a9ac