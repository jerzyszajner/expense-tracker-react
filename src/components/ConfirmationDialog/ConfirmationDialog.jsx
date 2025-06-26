import styles from "./ConfirmationDialog.module.css";
import Button from "../Button/Button";

const ConfirmationDialog = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  icon = "⚠️",
}) => {
  // Prevent propagation of the event to the parent
  const stopPropagation = (e) => e.stopPropagation();
  return (
    <div className={styles.bodyContent}>
      <div className={styles.icon}>{icon}</div>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonGroup}>
        <Button
          onClick={onConfirm}
          variant="danger"
          onKeyDown={stopPropagation}
        >
          {confirmText}
        </Button>
        <Button
          onClick={onCancel}
          variant="primary"
          onKeyDown={stopPropagation}
        >
          {cancelText}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
