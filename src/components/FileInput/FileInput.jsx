import { useState, useRef, useEffect } from 'react';
import styles from './FileInput.module.css';

export default function FileInput({ field, value, onChange, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (value && value instanceof File && value.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileSelect = (file) => {
    if (file) {
      onChange(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const acceptString = field.acceptedTypes?.join(',') || '';

  return (
    <div className={styles.fileInputWrapper}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptString}
        onChange={handleInputChange}
        className={styles.fileInputHidden}
        id={`file-${field.id}`}
      />

      {value ? (
        <div className={styles.fileInputPreview}>
          {preview && (
            <div className={styles.filePreviewImage}>
              <img src={preview} alt="Preview" />
            </div>
          )}
          <div className={styles.filePreviewInfo}>
            <span className={styles.filePreviewName}>{value.name}</span>
            <span className={styles.filePreviewSize}>
              {(value.size / 1024).toFixed(1)} KB
            </span>
          </div>
          <button
            type="button"
            className={styles.fileRemoveBtn}
            onClick={handleRemove}
            title="Remove file"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${error ? styles.hasError : ''}`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className={styles.dropzoneText}>
            <span className={styles.dropzoneHighlight}>Click to upload</span> or drag and drop
          </p>
          {field.acceptedTypes?.length > 0 && (
            <p className={styles.dropzoneHint}>
              {field.acceptedTypes.join(', ')}
            </p>
          )}
          {field.maxFileSize && (
            <p className={styles.dropzoneHint}>Max size: {field.maxFileSize}MB</p>
          )}
        </div>
      )}
    </div>
  );
}
