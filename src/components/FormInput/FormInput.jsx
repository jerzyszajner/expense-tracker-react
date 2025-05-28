import styles from "./FormInput.module.css";

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  children,
  ...props
}) => {
  const inputClass = `${styles.input} ${error ? styles.error : ""}`;

  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className={inputClass}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={inputClass}
          {...props}
        />
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default FormInput;
