import styles from "./TransactionItem.module.css";
import Button from "../Button/Button";

const TransactionItem = ({ transaction, type, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(transaction);
  };

  const handleEdit = () => {
    onEdit(transaction);
  };

  const isExpense = type === "expense";
  const amountPrefix = isExpense ? "-" : "+";
  const amountClass = isExpense ? styles.expenseAmount : styles.incomeAmount;
  const rowClass = isExpense ? styles.expenseRow : styles.incomeRow;

  return (
    <tr className={rowClass}>
      <td className={`${styles.cell} ${styles.idCell}`}>
        {String(transaction.id).substring(0, 8)}...
      </td>
      <td className={styles.cell}>{transaction.title}</td>
      <td className={`${styles.cell} ${amountClass}`}>
        {amountPrefix}${transaction.amount.toFixed(2)}
      </td>
      <td className={`${styles.cell} ${styles.dateCell}`}>
        {new Date(transaction.date).toISOString().split("T")[0]}
      </td>
      <td className={`${styles.cell} ${styles.categoryCell}`}>
        {transaction.category}
      </td>
      <td className={styles.cell}>
        <Button onClick={handleEdit} className={styles.editButton}>
          Edit
        </Button>
        <Button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TransactionItem;
