import styles from './Button.module.css';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  title,
}) {
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      type={type}
      className={`${styles.btn} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <span>{children}</span>
    </button>
  );
}
