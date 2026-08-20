import { useState, useEffect, useRef } from 'react';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormPreview from './components/FormPreview/FormPreview';
import { DEFAULT_INITIAL_FIELDS, LOCAL_STORAGE_KEY } from './constants/formConstants';
import styles from './App.module.css';

export default function App() {
  const [fields, setFields] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
    }
    return DEFAULT_INITIAL_FIELDS;
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fields));
    } catch {
    }
  }, [fields]);

  const handleAddField = (newField) => {
    setFields((prev) => [...prev, newField]);
  };

  const handleRemoveField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpdateField = (updatedField) => {
    setFields((prev) => prev.map((f) => f.id === updatedField.id ? updatedField : f));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all fields?')) {
      setFields([]);
    }
  };

  const handleLoadPreset = (presetFields) => {
    setFields(presetFields);
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.appHeaderContent}>
          <div className={styles.appLogo}>
            <h1 className={styles.appTitle}>Dynamic Form Builder</h1>
          </div>
        </div>
      </header>

      <main className={styles.appMain}>
        <FormBuilder
          fields={fields}
          onAddField={handleAddField}
          onUpdateField={handleUpdateField}
          onRemoveField={handleRemoveField}
          onClearAll={handleClearAll}
          onLoadPreset={handleLoadPreset}
        />

        <FormPreview fields={fields} />
      </main>
    </div>
  );
}
