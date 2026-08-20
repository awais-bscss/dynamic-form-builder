export default function PanelHeader({ icon, title, subtitle, count, styles }) {
  return (
    <div className={styles.panelHeader}>
      <div className={styles.panelIcon}>
        {icon}
      </div>
      <div>
        <h2 className={styles.panelTitle}>{title}</h2>
        <p className={styles.panelSubtitle}>{subtitle}</p>
      </div>
      <span className={styles.panelCount}>
        {count} {count === 1 ? 'Field' : 'Fields'}
      </span>
    </div>
  );
}
