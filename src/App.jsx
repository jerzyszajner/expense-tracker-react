import styles from "./App.module.css";
import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import useModal from "./hooks/useModal";
import { useFilteredData } from "./hooks/useFilteredData";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import ExpenseFilter from "./components/ExpenseFilter/ExpenseFilter";
import TransactionList from "./components/TransactionList/TransactionList";
import BalanceSummary from "./components/BalanceSummary/BalanceSummary";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";
import Accordion from "./components/Accordion/Accordion";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";

function App() {
  // Core state management
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [incomes, setIncomes] = useLocalStorage("incomes", []);
  const [filter, setFilter] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState("expenses");

  // Modal state
  const deleteModal = useModal();
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter data based on active tab and filter criteria
  const filteredExpenses = useFilteredData(expenses, filter, "expenses");
  const filteredIncomes = useFilteredData(incomes, filter, "incomes");

  // Helper functions to avoid repetition
  const getCurrentType = () =>
    activeTab === "expenses" ? "expense" : "income";

  const getCurrentTransactions = () =>
    activeTab === "expenses" ? filteredExpenses : filteredIncomes;

  // Reset filter when switching tabs
  useEffect(() => {
    setFilter("");
  }, [activeTab]);

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

  // Update existing transaction
  const editTransaction = (updatedTransaction, type) => {
    if (type === "expense") {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === updatedTransaction.id ? updatedTransaction : item
        )
      );
    } else {
      setIncomes((prev) =>
        prev.map((item) =>
          item.id === updatedTransaction.id ? updatedTransaction : item
        )
      );
    }
    setEditingTransaction(null);
  };

  // Enter edit mode and switch to correct tab
  const startEditing = (transaction, type) => {
    setEditingTransaction({ ...transaction, type });
    setActiveTab(type === "expense" ? "expenses" : "incomes");
  };

  const cancelEditing = () => {
    setEditingTransaction(null);
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

  // Switch between expense/income tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEditingTransaction(null);
  };

  const isEditing =
    editingTransaction && editingTransaction.type === getCurrentType();

  return (
    <div className={styles.app}>
      <header>
        {<h1 className={styles.appTitle}>Personal Finance Tracker</h1>}
        {/* Balance overview */}
        <Card>
          <BalanceSummary expenses={expenses} incomes={incomes} />
        </Card>

        {/* Tab switcher */}
        <nav>
          <Card className={styles.tabContainer}>
            <div className={styles.tabSection}>
              <Button
                onClick={() => handleTabChange("expenses")}
                className={`${styles.tabButton} ${
                  activeTab === "expenses" ? styles.activeTab : ""
                }`}
                ariaLabel={"Switch to Expenses Tab"}
              >
                Expenses
              </Button>
              <Button
                onClick={() => handleTabChange("incomes")}
                className={`${styles.tabButton} ${
                  activeTab === "incomes" ? styles.activeTab : ""
                }`}
                ariaLabel={"Switch to Incomes Tab"}
              >
                Incomes
              </Button>
            </div>

            <div className={styles.filterSection}>
              <ExpenseFilter
                selectedFilter={filter}
                onFilterChange={setFilter}
                activeTab={activeTab}
              />
            </div>
          </Card>
        </nav>
      </header>

      <main>
        {/* Add/Edit form */}
        <section>
          <Accordion
            title={
              isEditing
                ? `Edit ${activeTab.slice(0, -1)}`
                : `Add New ${activeTab.slice(0, -1)}`
            }
            icon={activeTab === "expenses" ? "💰" : "💵"}
            defaultOpen={false}
            forceOpen={!!isEditing}
          >
            <TransactionForm
              type={getCurrentType()}
              onAdd={(transaction) =>
                addTransaction(transaction, getCurrentType())
              }
              editing={isEditing ? editingTransaction : null}
              onEdit={(transaction) =>
                editTransaction(transaction, getCurrentType())
              }
              onCancelEdit={cancelEditing}
            />
          </Accordion>
        </section>

        <section>
          <Card>
            <h2 className={styles.sectionTitle}>
              Your {activeTab === "expenses" ? "Expenses" : "Incomes"}
            </h2>
            {/* Transaction list */}
            <TransactionList
              transactions={getCurrentTransactions()}
              type={getCurrentType()}
              onDelete={(item) => handleDeleteRequest(item, getCurrentType())}
              onEdit={(item) => startEditing(item, getCurrentType())}
            />
          </Card>
        </section>
      </main>

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
