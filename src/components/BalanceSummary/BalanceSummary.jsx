import styles from "./BalanceSummary.module.css";

const BalanceSummary = ({ expenses, incomes }) => {
  // Calculate financial totals
  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const balance = totalIncome - totalExpenses;

  // Display financial overview cards
  return (
    <div className={styles.balanceSummary}>
      <div className={styles.summaryGrid}>
        <div className={styles.incomeCard}>
          <h3 className={styles.cardTitle}>Total Income</h3>
          <p className={styles.incomeAmount}>+${totalIncome.toFixed(2)}</p>
        </div>

        <div className={styles.expenseCard}>
          <h3 className={styles.cardTitle}>Total Expenses</h3>
          <p className={styles.expenseAmount}>-${totalExpenses.toFixed(2)}</p>
        </div>

        <div
          className={`${styles.balanceCard} ${
            balance < 0 ? styles.negative : styles.positive
          }`}
        >
          <h3 className={styles.cardTitle}>Balance</h3>
          <p className={styles.balanceAmount}>
            {balance >= 0 ? "+" : ""}${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary;
