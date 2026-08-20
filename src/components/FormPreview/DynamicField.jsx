import FileInput from '../FileInput/FileInput';
import styles from './DynamicField.module.css';

export default function DynamicField({ field, value, onChange, error, inputRef }) {
  const inputId = `input_${field.id}`;

  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            ref={inputRef}
            id={inputId}
            className={`${styles.input} ${styles.textarea} ${error ? styles.hasError : ''}`}
            placeholder={field.placeholder || ''}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
          />
        );

      case 'select':
        return (
          <div className={styles.selectWrapper}>
            <select
              ref={inputRef}
              id={inputId}
              className={`${styles.input} ${styles.select} ${error ? styles.hasError : ''}`}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value="">-- Choose an option --</option>
              {field.options?.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        );

      case 'checkbox':
        return (
          <label className={styles.checkboxLabel} htmlFor={inputId}>
            <input
              ref={inputRef}
              id={inputId}
              type="checkbox"
              className={styles.checkbox}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span className={styles.checkboxText}>{field.label}</span>
            {field.required && <span className={styles.fieldRequired}>*</span>}
          </label>
        );

      case 'file':
        return (
          <FileInput
            field={field}
            value={value}
            onChange={onChange}
            error={error}
          />
        );

      case 'number':
        return (
          <input
            ref={inputRef}
            id={inputId}
            type="number"
            className={`${styles.input} ${error ? styles.hasError : ''}`}
            placeholder={field.placeholder || ''}
            value={value !== undefined ? value : ''}
            min={field.min}
            max={field.max}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'email':
      case 'text':
      default:
        return (
          <input
            ref={inputRef}
            id={inputId}
            type={field.type || 'text'}
            className={`${styles.input} ${error ? styles.hasError : ''}`}
            placeholder={field.placeholder || ''}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  if (field.type === 'checkbox') {
    return (
      <div className={styles.fieldGroup}>
        {renderInput()}
        {error && <span className={styles.fieldError}>{error}</span>}
      </div>
    );
  }

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={inputId} className={styles.fieldLabel}>
        <span>{field.label}</span>
        {field.required && <span className={styles.fieldRequired}>*</span>}
      </label>
      {renderInput()}
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}
