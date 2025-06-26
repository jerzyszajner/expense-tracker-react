import styles from "./App.module.css";
import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import useModal from "./hooks/useModal";
import { useFilteredData } from "./hooks/useFilteredData";
import { useSortedData } from "./hooks/useSortedData";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import IncomeForm from "./components/IncomeForm/IncomeForm";
import ExpenseFilter from "./components/ExpenseFilter/ExpenseFilter";
import SortSelector from "./components/SortSelector/SortSelector";
import TransactionList from "./components/TransactionList/TransactionList";
import BalanceSummary from "./components/BalanceSummary/BalanceSummary";
import Modal from "./components/Modal/Modal";
import ConfirmationDialog from "./components/ConfirmationDialog/ConfirmationDialog";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";

function App() {
  // Core state management
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [incomes, setIncomes] = useLocalStorage("incomes", []);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState("expenses");

  // Modal state
  const addModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter data based on active tab and criteria
  const filteredExpenses = useFilteredData(expenses, filter, "expenses");
  const filteredIncomes = useFilteredData(incomes, filter, "incomes");

  // Sort filtered data
  const sortedExpenses = useSortedData(filteredExpenses, sort);
  const sortedIncomes = useSortedData(filteredIncomes, sort);

  // Helper functions to avoid repetition
  const getCurrentType = () =>
    activeTab === "expenses" ? "Expense" : "Income";

  const getCurrentTransactions = () =>
    activeTab === "expenses" ? sortedExpenses : sortedIncomes;

  // Reset filter and sort when switching tabs
  useEffect(() => {
    setFilter("");
    setSort("");
  }, [activeTab]);

  // Add new transaction to appropriate list
  const addTransaction = (transaction, type) => {
    if (type === "Expense") {
      setExpenses((prev) => [...prev, transaction]);
    } else {
      setIncomes((prev) => [...prev, transaction]);
    }
  };

  // Remove transaction from appropriate list
  const deleteTransaction = (id, type) => {
    if (type === "Expense") {
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } else {
      setIncomes((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Update existing transaction
  const editTransaction = (updatedTransaction, type) => {
    if (type === "Expense") {
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
  };

  // Enter edit mode
  const startEditing = (transaction, type) => {
    setEditingTransaction({ ...transaction, type });
    editModal.openModal();
  };

  const cancelEditing = () => {
    setEditingTransaction(null);
    editModal.closeModal();
  };

  const cancelAdding = () => {
    addModal.closeModal();
  };

  // Show delete confirmation modal
  const handleDeleteRequest = (item, type) => {
    setItemToDelete({ ...item, type });
    deleteModal.openModal();
  };

  const handleConfirmDelete = () => {
    deleteTransaction(itemToDelete.id, itemToDelete.type);
    setItemToDelete(null);
    deleteModal.closeModal();
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

  return (
    <div className={styles.app}>
      {/* Header */}
      <header>
        <Card>
          <h1 className={styles.appTitle}>Expense Tracker</h1>
        </Card>

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
                variant={activeTab === "expenses" ? "primary" : "secondary"}
                ariaLabel={"Switch to Expenses Tab"}
              >
                Expenses
              </Button>
              <Button
                onClick={() => handleTabChange("incomes")}
                variant={activeTab === "incomes" ? "primary" : "secondary"}
                ariaLabel={"Switch to Incomes Tab"}
              >
                Incomes
              </Button>
            </div>
          </Card>
          <Card className={styles.filterSortContainer}>
            <div className={styles.filterSortSection}>
              <ExpenseFilter
                selectedFilter={filter}
                onFilterChange={setFilter}
                activeTab={activeTab}
              />
              <SortSelector selectedSort={sort} onSortChange={setSort} />
            </div>
          </Card>
        </nav>
        {/* Add button */}
        <section>
          <Card>
            <Button onClick={addModal.openModal}>
              Add New {activeTab === "expenses" ? "Expense" : "Income"}
            </Button>
          </Card>
        </section>
      </header>

      <main>
        <section>
          <Card>
            <h2 className={styles.sectionTitle}>
              Your {activeTab === "expenses" ? "Expenses" : "Incomes"}...
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

      {/* Add transaction modal */}
      <Modal
        isOpen={addModal.isOpen}
        onClose={addModal.closeModal}
        title={`Add New ${activeTab === "expenses" ? "Expense" : "Income"}`}
      >
        {activeTab === "expenses" ? (
          <ExpenseForm
            onAdd={(expense) => {
              addTransaction(expense, "expense");
              setTimeout(() => addModal.closeModal(), 1000);
            }}
            onCancelEdit={cancelAdding}
          />
        ) : (
          <IncomeForm
            onAdd={(income) => {
              addTransaction(income, "income");
              setTimeout(() => addModal.closeModal(), 1000);
            }}
            onCancelEdit={cancelAdding}
          />
        )}
      </Modal>

      {/* Edit transaction modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={cancelEditing}
        title={`Edit ${editingTransaction?.type || "Transaction"}`}
      >
        {editingTransaction?.type === "expense" ? (
          <ExpenseForm
            editing={editingTransaction}
            onEdit={(expense) => {
              editTransaction(expense, "expense");
              setTimeout(() => cancelEditing(), 1000);
            }}
            onCancelEdit={cancelEditing}
          />
        ) : (
          <IncomeForm
            editing={editingTransaction}
            onEdit={(income) => {
              editTransaction(income, "income");
              setTimeout(() => cancelEditing(), 1000);
            }}
            onCancelEdit={cancelEditing}
          />
        )}
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        title={`Delete ${itemToDelete?.type}`}
        onEnter={handleConfirmDelete}
        onEscape={handleCancelDelete}
      >
        <ConfirmationDialog
          message={
            <>
              Are you sure you want to delete{" "}
              <span className={styles.dangerTitle}>
                "{itemToDelete?.title}"
              </span>
              ?
              <br />
              This action cannot be undone!
            </>
          }
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Modal>
    </div>
  );
}

export default App;
