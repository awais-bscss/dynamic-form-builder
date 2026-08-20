import { TYPE_BADGES } from '../../constants/formConstants';
import styles from './FieldCard.module.css';

export default function FieldCard({ field, index, total, isEditing, onRemove, onEdit, onMoveUp, onMoveDown }) {
  const badge = TYPE_BADGES[field.type] || { label: field.type };

  return (
    <div className={`${styles.fieldCard} ${isEditing ? styles.fieldCardEditing : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
      <div className={styles.fieldCardHeader}>
        <div className={styles.fieldCardBadge}>
          <span className={styles.fieldCardType}>{badge.label}</span>
        </div>
        {field.required && <span className={styles.fieldCardRequired}>Required</span>}
      </div>

      <div className={styles.fieldCardBody}>
        <h4 className={styles.fieldCardLabel}>{field.label || 'Untitled Field'}</h4>
        {field.placeholder && (
          <p className={styles.fieldCardPlaceholder}>Placeholder: {field.placeholder}</p>
        )}
        <div className={styles.fieldCardRules}>
          {field.minLength && <span className={styles.fieldRule}>Min: {field.minLength}</span>}
          {field.maxLength && <span className={styles.fieldRule}>Max: {field.maxLength}</span>}
          {field.type === 'number' && field.min !== undefined && field.min !== '' && (
            <span className={styles.fieldRule}>Min: {field.min}</span>
          )}
          {field.type === 'number' && field.max !== undefined && field.max !== '' && (
            <span className={styles.fieldRule}>Max: {field.max}</span>
          )}
          {field.type === 'file' && field.maxFileSize && (
            <span className={styles.fieldRule}>Max: {field.maxFileSize}MB</span>
          )}
          {field.type === 'select' && field.options?.length > 0 && (
            <span className={styles.fieldRule}>{field.options.length} options</span>
          )}
        </div>
      </div>

      <div className={styles.fieldCardActions}>
        <button
          type="button"
          className={`${styles.fieldActionBtn} ${styles.moveBtn}`}
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
          title="Move field up"
        >
          ↑
        </button>
        <button
          type="button"
          className={`${styles.fieldActionBtn} ${styles.moveBtn}`}
          onClick={() => onMoveDown(index)}
          disabled={index === total - 1}
          title="Move field down"
        >
          ↓
        </button>
        <button
          type="button"
          className={`${styles.fieldActionBtn} ${styles.editBtn}`}
          onClick={onEdit}
          title="Edit field"
        >
          Edit
        </button>
        <button
          type="button"
          className={`${styles.fieldActionBtn} ${styles.deleteBtn}`}
          onClick={() => onRemove(field.id)}
          title="Delete field"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
