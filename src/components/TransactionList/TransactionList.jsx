import styles from "./TransactionList.module.css";
import EmptyMessage from "../EmptyMessage/EmptyMessage";
import TransactionItem from "../TransactionItem/TransactionItem";

const TransactionList = ({ transactions, type, onDelete, onEdit }) => {
  // Handle empty state display
  if (transactions.length === 0) {
    const message =
      type === "expense"
        ? "No expenses found. Start by adding your first expense!"
        : "No incomes found. Start by adding your first income!";
    const icon = type === "expense" ? "💸" : "💰";

    return <EmptyMessage message={message} icon={icon} />;
  }

  // Render transaction table with data
  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr className={styles.headerRow}>
          {/* <th className={styles.headerCell}>ID</th> */}
          <th className={styles.headerCell}>Title</th>
          <th className={styles.headerCell}>Amount</th>
          <th className={styles.headerCell}>Date</th>
          <th className={styles.headerCell}>Category</th>
          <th className={styles.headerCell}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            type={type}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
