import { RemoveScroll } from "react-remove-scroll";
import styles from "./Modal.module.css";
import { useModalKeyDown } from "../../hooks/useModalKeyDown";

const Modal = ({ isOpen, onClose, onEnter, onEscape, title, children }) => {
  // Handle keyboard events
  const handleKeyDown = useModalKeyDown(
    onEnter || (() => {}),
    onEscape || onClose
  );

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
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default Modal;
