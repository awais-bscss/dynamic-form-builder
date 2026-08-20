import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { FIELD_TYPES, getDefaultConfig } from '../../constants/formConstants';
import styles from './FieldConfigurator.module.css';

export default function FieldConfigurator({ onAddField, editingField, onUpdateField, onCancelEdit }) {
  const [selectedType, setSelectedType] = useState('text');
  const [config, setConfig] = useState(getDefaultConfig('text'));
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (editingField) {
      setSelectedType(editingField.type);
      setConfig({
        type: editingField.type,
        label: editingField.label || '',
        placeholder: editingField.placeholder || '',
        required: editingField.required || false,
        minLength: editingField.minLength || '',
        maxLength: editingField.maxLength || '',
        min: editingField.min !== undefined && editingField.min !== '' ? String(editingField.min) : '',
        max: editingField.max !== undefined && editingField.max !== '' ? String(editingField.max) : '',
        options: Array.isArray(editingField.options) ? editingField.options.join(', ') : '',
        maxFileSize: editingField.maxFileSize || '',
        acceptedTypes: Array.isArray(editingField.acceptedTypes) ? editingField.acceptedTypes.join(', ') : '',
      });
      setIsExpanded(true);
    }
  }, [editingField]);

  const handleChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    if (!config.label.trim()) return;

    const newField = {
      id: editingField ? editingField.id : `field_${crypto.randomUUID()}`,
      type: selectedType,
      label: config.label.trim(),
      placeholder: config.placeholder.trim(),
      required: config.required,
    };

    if (['text', 'email', 'textarea'].includes(selectedType)) {
      if (config.minLength) newField.minLength = Number(config.minLength);
      if (config.maxLength) newField.maxLength = Number(config.maxLength);
    }

    if (selectedType === 'number') {
      if (config.min !== '') newField.min = Number(config.min);
      if (config.max !== '') newField.max = Number(config.max);
    }

    if (selectedType === 'select') {
      const parsed = config.options
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);
      if (parsed.length === 0) return;
      newField.options = parsed;
    }

    if (selectedType === 'file') {
      if (config.maxFileSize) newField.maxFileSize = Number(config.maxFileSize);
      if (config.acceptedTypes) {
        newField.acceptedTypes = config.acceptedTypes
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }

    if (editingField) {
      onUpdateField(newField);
    } else {
      onAddField(newField);
    }
    setConfig(getDefaultConfig(selectedType));
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setConfig(getDefaultConfig('text'));
    setSelectedType('text');
    setIsExpanded(false);
    onCancelEdit();
  };

  const showLengthConfig = ['text', 'email', 'textarea'].includes(selectedType);
  const showNumberConfig = selectedType === 'number';
  const showSelectConfig = selectedType === 'select';
  const showFileConfig = selectedType === 'file';

  return (
    <div className={styles.fieldConfigurator}>
      <button
        type="button"
        className={`${styles.configuratorToggle} ${isExpanded ? styles.expanded : ''} ${editingField ? styles.editing : ''}`}
        onClick={() => {
          if (editingField) {
            handleCancel();
          } else {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <span className={styles.configuratorToggleIcon}>{editingField ? '✕' : isExpanded ? '-' : '+'}</span>
        <span>{editingField ? `Editing: ${editingField.label}` : 'Add New Field'}</span>
      </button>

      {isExpanded && (
        <div className={styles.configuratorPanel}>
          <div className={styles.configuratorTypes}>
            {FIELD_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`${styles.typeChip} ${selectedType === type.value ? styles.active : ''}`}
                onClick={() => {
                  setSelectedType(type.value);
                  if (!editingField) {
                    setConfig(getDefaultConfig(type.value));
                  }
                }}
              >
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.configuratorForm}>
            <div className={styles.configField}>
              <label className={styles.configLabel} htmlFor="cfg-label">
                Field Label <span className={styles.configRequired}>*</span>
              </label>
              <input
                id="cfg-label"
                type="text"
                className={styles.configInput}
                placeholder="Full Name"
                value={config.label}
                onChange={(e) => handleChange('label', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>

            {selectedType !== 'checkbox' && selectedType !== 'file' && (
              <div className={styles.configField}>
                <label className={styles.configLabel} htmlFor="cfg-placeholder">Placeholder</label>
                <input
                  id="cfg-placeholder"
                  type="text"
                  className={styles.configInput}
                  placeholder="Enter value"
                  value={config.placeholder}
                  onChange={(e) => handleChange('placeholder', e.target.value)}
                />
              </div>
            )}

            {showLengthConfig && (
              <div className={styles.configRow}>
                <div className={styles.configField}>
                  <label className={styles.configLabel} htmlFor="cfg-minlen">Min Length</label>
                  <input
                    id="cfg-minlen"
                    type="number"
                    className={styles.configInput}
                    placeholder="0"
                    min="0"
                    value={config.minLength}
                    onChange={(e) => handleChange('minLength', e.target.value)}
                  />
                </div>
                <div className={styles.configField}>
                  <label className={styles.configLabel} htmlFor="cfg-maxlen">Max Length</label>
                  <input
                    id="cfg-maxlen"
                    type="number"
                    className={styles.configInput}
                    placeholder="100"
                    min="0"
                    value={config.maxLength}
                    onChange={(e) => handleChange('maxLength', e.target.value)}
                  />
                </div>
              </div>
            )}

            {showNumberConfig && (
              <div className={styles.configRow}>
                <div className={styles.configField}>
                  <label className={styles.configLabel} htmlFor="cfg-min">Min Value</label>
                  <input
                    id="cfg-min"
                    type="number"
                    className={styles.configInput}
                    placeholder="0"
                    value={config.min}
                    onChange={(e) => handleChange('min', e.target.value)}
                  />
                </div>
                <div className={styles.configField}>
                  <label className={styles.configLabel} htmlFor="cfg-max">Max Value</label>
                  <input
                    id="cfg-max"
                    type="number"
                    className={styles.configInput}
                    placeholder="100"
                    value={config.max}
                    onChange={(e) => handleChange('max', e.target.value)}
                  />
                </div>
              </div>
            )}

            {showSelectConfig && (
              <div className={styles.configField}>
                <label className={styles.configLabel} htmlFor="cfg-options">
                  Options <span className={styles.configHint}>(comma separated)</span>
                </label>
                <input
                  id="cfg-options"
                  type="text"
                  className={styles.configInput}
                  placeholder="Option 1, Option 2, Option 3"
                  value={config.options}
                  onChange={(e) => handleChange('options', e.target.value)}
                />
              </div>
            )}

            {showFileConfig && (
              <div className={styles.configRow}>
                <div className={styles.configField}>
                  <label className={styles.configLabel} htmlFor="cfg-filesize">Max Size (MB)</label>
                  <input
                    id="cfg-filesize"
                    type="number"
                    className={styles.configInput}
                    placeholder="5"
                    min="0"
                    value={config.maxFileSize}
                    onChange={(e) => handleChange('maxFileSize', e.target.value)}
                  />
                </div>
                <div className={styles.configField}>
                  <label className={styles.configLabel} htmlFor="cfg-filetypes">
                    Types <span className={styles.configHint}>(.jpg, .png)</span>
                  </label>
                  <input
                    id="cfg-filetypes"
                    type="text"
                    className={styles.configInput}
                    placeholder=".jpg, .png, .pdf"
                    value={config.acceptedTypes}
                    onChange={(e) => handleChange('acceptedTypes', e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className={`${styles.configField} ${styles.configCheckboxField}`}>
              <label className={styles.configCheckboxLabel}>
                <input
                  type="checkbox"
                  className={styles.configCheckbox}
                  checked={config.required}
                  onChange={(e) => handleChange('required', e.target.checked)}
                />
                <span>Required field</span>
              </label>
            </div>

            <div className={styles.configActions}>
              <Button
                type="button"
                variant="primary"
                onClick={handleAdd}
                disabled={!config.label.trim()}
                className={styles.configAddBtn}
              >
                {editingField ? 'Save Changes' : 'Add Field'}
              </Button>
              {editingField && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
