import styles from "./EmptyMessage.module.css";

const EmptyMessage = ({ message, icon = "📋" }) => {
  return (
    <div className={styles.emptyMessage}>
      <span className={styles.icon}>{icon}</span>
      <p className={styles.text}>{message}</p>
    </div>
  );
};

export default EmptyMessage;