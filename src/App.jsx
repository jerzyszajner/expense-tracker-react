import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import styles from "./App.module.css";

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [incomes, setIncomes] = useLocalStorage("incomes", []);
  const [activeTab, setActiveTab] = useState("expenses");

  // Helper function
  const getCurrentType = () =>
    activeTab === "expenses" ? "expense" : "income";

  // Add transaction
  const addTransaction = (transaction, type) => {
    if (type === "expense") {
      setExpenses((prev) => [...prev, transaction]);
    } else {
      setIncomes((prev) => [...prev, transaction]);
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.appTitle}>Personal Finance Tracker</h1>

      {/* Tab switcher */}
      <Card className={styles.tabContainer}>
        <div className={styles.tabSection}>
          <Button
            onClick={() => setActiveTab("expenses")}
            className={`${styles.tabButton} ${
              activeTab === "expenses" ? styles.activeTab : ""
            }`}
          >
            Expenses
          </Button>
          <Button
            onClick={() => setActiveTab("incomes")}
            className={`${styles.tabButton} ${
              activeTab === "incomes" ? styles.activeTab : ""
            }`}
          >
            Incomes
          </Button>
        </div>
      </Card>

      {/* Form */}
      <Card>
        <h2>Add New {getCurrentType() === "expense" ? "Expense" : "Income"}</h2>
        <TransactionForm
          type={getCurrentType()}
          onAdd={(transaction) => addTransaction(transaction, getCurrentType())}
        />
      </Card>

      <Card>
        <p>Expenses: {expenses.length}</p>
        <p>Incomes: {incomes.length}</p>
      </Card>
    </div>
  );
}

export default App;
