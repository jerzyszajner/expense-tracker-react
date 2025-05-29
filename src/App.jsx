import styles from "./App.module.css";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import useModal from "./hooks/useModal";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [incomes, setIncomes] = useLocalStorage("incomes", []);
  const [activeTab, setActiveTab] = useState("expenses");

  // Modal state
  const deleteModal = useModal();
  const [itemToDelete, setItemToDelete] = useState(null);

  // Helper function
  const getCurrentType = () =>
    activeTab === "expenses" ? "expense" : "income";

  // Add new transaction to appropriate list
  const addTransaction = (transaction, type) => {
    if (type === "expense") {
      setExpenses((prev) => [...prev, transaction]);
    } else {
      setIncomes((prev) => [...prev, transaction]);
    }
  };

  // Remove transaction from appropriate list
  const deleteTransaction = (id, type) => {
    if (type === "expense") {
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } else {
      setIncomes((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Show delete confirmation modal
  const handleDeleteRequest = (item, type) => {
    setItemToDelete({ ...item, type });
    deleteModal.openModal();
  };

  const handleConfirmDelete = () => {
    deleteTransaction(itemToDelete.id, itemToDelete.type);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    deleteModal.closeModal();
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
        <h2>Your {activeTab === "expenses" ? "Expenses" : "Incomes"}</h2>
        <TransactionList
          transactions={activeTab === "expenses" ? expenses : incomes}
          type={getCurrentType()}
          onDelete={(item) => handleDeleteRequest(item, getCurrentType())}
          onEdit={(item) => console.log("Edit:", item.title)}
        />
      </Card>

      <Card>
        <p>Expenses: {expenses.length}</p>
        <p>Incomes: {incomes.length}</p>
      </Card>

      {/* Delete confirmation modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

export default App;
