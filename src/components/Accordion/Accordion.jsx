import { useState, useEffect } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({
  title,
  children,
  defaultOpen = false,
  icon,
  forceOpen = false,
}) => {
  // Accordion collapse/expand state
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Force open accordion when needed (e.g., editing)
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  // Toggle accordion visibility
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Render collapsible accordion component
  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionHeader}
        onClick={toggleAccordion}
        type="button"
      >
        <div className={styles.headerContent}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.title}>{title}</span>
        </div>
        <span className={`${styles.chevron} ${isOpen ? styles.open : ""}`}>
          ▼
        </span>
      </button>
      <div
        className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.accordionBody}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
