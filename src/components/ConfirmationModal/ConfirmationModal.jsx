import Modal from "../Modal/Modal";
import styles from "./ConfirmationModal.module.css";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // danger, warning, info
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showCloseButton={false}
    >
      <div className={styles.confirmationContent}>
        <div className={`${styles.iconContainer} ${styles[type]}`}>
          {type === "danger" && <span className={styles.icon}>⚠️</span>}
          {type === "warning" && <span className={styles.icon}>⚠️</span>}
          {type === "info" && <span className={styles.icon}>ℹ️</span>}
        </div>

        <p className={styles.message}>{message}</p>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            {cancelText}
          </button>
          <button
            className={`${styles.confirmButton} ${styles[type]}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
