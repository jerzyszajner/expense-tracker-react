import styles from "./Button.module.css";

const Button = ({
  children = "Click",
  onClick,
  className,
  onKeyDown,
  disabled = false,
  ariaLabel,
  type,
  variant = "primary", // primary, secondary, danger
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return styles.secondary;
      case "danger":
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  return (
    <button
      className={`${styles.button} ${getVariantClass()} ${className || ""}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
      onKeyDown={onKeyDown} // Prevent propagation of the event to the parent
    >
      {children}
    </button>
  );
};

export default Button;
