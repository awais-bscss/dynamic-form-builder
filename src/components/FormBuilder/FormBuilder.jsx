import { useState } from 'react';
import FieldConfigurator from './FieldConfigurator';
import FieldCard from './FieldCard';
import PanelHeader from '../common/PanelHeader';
import EmptyState from '../common/EmptyState';
import { PRESET_TEMPLATES } from '../../constants/formConstants';
import styles from './FormBuilder.module.css';

export default function FormBuilder({
  fields,
  onAddField,
  onUpdateField,
  onRemoveField,
  onMoveField,
  onClearAll,
  onLoadPreset
}) {
  const [editingField, setEditingField] = useState(null);
  return (
    <div className={styles.panel}>
      <PanelHeader
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        }
        title="Form Architect"
        subtitle="Configure schema and dynamic validations"
        count={fields.length}
        styles={styles}
      />

      <div className={styles.panelBody}>
        <div className={styles.presetsBar}>
          <span className={styles.presetsTitle}>Quick Templates:</span>
          <div className={styles.presetsButtons}>
            {PRESET_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.name}
                type="button"
                className={styles.presetBtn}
                onClick={() => onLoadPreset(tmpl.fields)}
              >
                {tmpl.name}
              </button>
            ))}
            {fields.length > 0 && (
              <button
                type="button"
                className={`${styles.presetBtn} ${styles.presetBtnClear}`}
                onClick={onClearAll}
                title="Clear all fields"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        <FieldConfigurator
          onAddField={onAddField}
          editingField={editingField}
          onUpdateField={(updated) => { onUpdateField(updated); setEditingField(null); }}
          onCancelEdit={() => setEditingField(null)}
        />

        <div className={styles.builderFieldsList}>
          {fields.length === 0 ? (
            <EmptyState title="No Fields Configured" styles={styles}>
              Click <strong>Add New Field</strong> above or load a quick template to start constructing your dynamic form.
            </EmptyState>
          ) : (
            fields.map((field, index) => (
              <FieldCard
                key={field.id}
                field={field}
                index={index}
                total={fields.length}
                isEditing={editingField?.id === field.id}
                onRemove={onRemoveField}
                onEdit={() => setEditingField(field)}
                onMoveUp={(idx) => onMoveField(idx, idx - 1)}
                onMoveDown={(idx) => onMoveField(idx, idx + 1)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
