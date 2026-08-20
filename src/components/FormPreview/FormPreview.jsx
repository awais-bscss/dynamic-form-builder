import { useState, useEffect, useRef } from 'react';
import DynamicField from './DynamicField';
import SubmissionModal from './SubmissionModal';
import Button from '../common/Button';
import PanelHeader from '../common/PanelHeader';
import EmptyState from '../common/EmptyState';
import { getFieldError, validateAllFields } from '../../utils/validation';
import styles from './FormPreview.module.css';

export default function FormPreview({ fields }) {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [submitCount, setSubmitCount] = useState(0);
  const [prevFields, setPrevFields] = useState(fields);

  const firstInputRef = useRef(null);

  if (fields !== prevFields) {
    setPrevFields(fields);
    setFormValues((prev) => {
      const updated = {};
      fields.forEach((field) => {
        if (prev[field.id] !== undefined) {
          updated[field.id] = prev[field.id];
        } else {
          updated[field.id] = field.type === 'checkbox' ? false : '';
        }
      });
      return updated;
    });
    setErrors({});
  }

  useEffect(() => {
    if (fields.length > 0 && firstInputRef.current) {
      const timer = setTimeout(() => {
        if (firstInputRef.current && typeof firstInputRef.current.focus === 'function') {
          firstInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [fields.length]);

  const handleFieldChange = (field, val) => {
    setFormValues((prev) => ({
      ...prev,
      [field.id]: val,
    }));

    if (submitCount > 0) {
      const error = getFieldError(field, val);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[field.id] = error;
        } else {
          delete next[field.id];
        }
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitCount((c) => c + 1);

    const { isValid, errors: validationErrors } = validateAllFields(fields, formValues);
    setErrors(validationErrors);

    if (!isValid) return;

    const formattedData = fields.map((field) => {
      const val = formValues[field.id];
      let displayVal = val;
      let isFile = false;
      let fileMeta = null;

      if (field.type === 'file' && val instanceof File) {
        isFile = true;
        fileMeta = {
          name: val.name,
          size: `${(val.size / 1024).toFixed(1)} KB`,
          type: val.type,
          previewUrl: val.type.startsWith('image/') ? URL.createObjectURL(val) : null,
        };
        displayVal = `${val.name} (${fileMeta.size})`;
      } else if (field.type === 'checkbox') {
        displayVal = val ? 'Checked (Yes)' : 'Unchecked (No)';
      } else if (val === '' || val === undefined) {
        displayVal = '-';
      }

      return {
        id: field.id,
        label: field.label,
        type: field.type,
        value: displayVal,
        isFile,
        fileMeta,
      };
    });

    setSubmittedData(formattedData);
  };

  const handleReset = () => {
    const fresh = {};
    fields.forEach((f) => {
      fresh[f.id] = f.type === 'checkbox' ? false : '';
    });
    setFormValues(fresh);
    setErrors({});
    setSubmitCount(0);
  };

  const closeModal = () => {
    if (submittedData) {
      submittedData.forEach((item) => {
        if (item.fileMeta?.previewUrl) {
          URL.revokeObjectURL(item.fileMeta.previewUrl);
        }
      });
    }
    setSubmittedData(null);
  };

  return (
    <div className={styles.panel}>
      <PanelHeader
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        }
        title="Live Preview"
        subtitle="Interactive consumer view with validation"
        count={fields.length}
        styles={styles}
      />

      <div className={styles.panelBody}>
        {fields.length === 0 ? (
          <EmptyState title="Empty Form Canvas" styles={styles}>
            Add fields from the builder on the left to see your dynamic form render live in real-time.
          </EmptyState>
        ) : (
          <form className={styles.previewForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.previewFieldsContainer}>
              {fields.map((field, index) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  value={formValues[field.id]}
                  onChange={(val) => handleFieldChange(field, val)}
                  error={errors[field.id]}
                  inputRef={index === 0 ? firstInputRef : null}
                />
              ))}
            </div>

            <div className={styles.previewFormActions}>
              <Button type="submit" variant="primary" className={styles.submitBtn}>
                Submit Form
              </Button>
              <Button
                type="button"
                variant="secondary"
                className={styles.resetBtn}
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </form>
        )}
      </div>

      <SubmissionModal data={submittedData} onClose={closeModal} />
    </div>
  );
}
