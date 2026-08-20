import Button from '../common/Button';
import styles from './SubmissionModal.module.css';

export default function SubmissionModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={styles.submittedOverlay} onClick={onClose}>
      <div className={styles.submittedModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleWrap}>
            <div className={styles.modalBadgeSuccess}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <h3 className={styles.modalTitle}>Form Submitted Successfully</h3>
              <p className={styles.modalSubtitle}>All validations passed. Submitted payload:</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.modalCloseIconBtn}
            onClick={onClose}
            title="Close modal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.submittedDataList}>
            {data.map((item) => (
              <div key={item.id} className={styles.submittedItemCard}>
                <div className={styles.submittedItemLabel}>{item.label}</div>
                <div className={styles.submittedItemVal}>
                  {item.isFile && item.fileMeta?.previewUrl ? (
                    <div className={styles.modalFilePreview}>
                      <img src={item.fileMeta.previewUrl} alt="Uploaded" />
                      <span>{item.value}</span>
                    </div>
                  ) : (
                    String(item.value)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
