export default function EmptyState({ title, children, styles }) {
  return (
    <div className={styles.emptyState}>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateText}>{children}</p>
    </div>
  );
}
