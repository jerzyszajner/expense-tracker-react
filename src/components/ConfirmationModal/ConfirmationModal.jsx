import styles from "./ConfirmationModal.module.css";
import Button from "../Button/Button";
import { RemoveScroll } from "react-remove-scroll";
import { useModalKeyDown } from "../../hooks/useModalKeyDown";

const ConfirmationModal = ({
  title,
  message,
  itemName,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  icon = "⚠️",
  isOpen,
}) => {
  // Handle keyboard events
  const handleKeyDown = useModalKeyDown(onConfirm, onCancel);

  if (!isOpen) return null;

  return (
    // Prevent body scroll when modal is open
    <RemoveScroll enabled={isOpen}>
      <div
        className={styles.modalOverlay}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{title}</h2>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.modalIcon}>{icon}</div>{" "}
              <p className={styles.modalMessage}>
                {message} "{itemName}"?
                <br />
                This action cannot be undone.
              </p>
              <div className={styles.buttonGroup}>
                <Button onClick={onConfirm} variant="danger">
                  {confirmText}
                </Button>
                <Button onClick={onCancel} variant="primary">
                  {cancelText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default ConfirmationModal;
