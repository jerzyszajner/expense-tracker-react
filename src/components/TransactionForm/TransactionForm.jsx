import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./TransactionForm.module.css";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import useFormValidation from "../../hooks/useFormValidation";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/categories";

const TransactionForm = ({ type, onAdd, editing, onEdit, onCancelEdit }) => {
  // Form state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState("");

  const { formErrors, validateForm, clearErrors } = useFormValidation();

  // Get appropriate categories and labels based on transaction type
  const categories =
    type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const defaultCategory = categories[0];
  const transactionName = type === "expense" ? "Expense" : "Income";

  // Populate form when editing
  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setAmount(editing.amount.toString());
      setDate(editing.date.split("T")[0]);
      setCategory(editing.category);
    } else {
      setCategory(defaultCategory);
    }
  }, [editing, defaultCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm({ title, amount, date, category })) {
      return;
    }

    // Create transaction object
    const transactionData = {
      id: editing ? String(editing.id) : uuidv4(),
      title,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      category,
    };

    // Save or update transaction
    if (editing) {
      onEdit(transactionData);
      setSuccess(`${transactionName} updated successfully!`);
    } else {
      onAdd(transactionData);
      setSuccess(`${transactionName} added successfully!`);
    }

    resetForm();
    setTimeout(() => setSuccess(""), 3000);
  };

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setDate("");
    setCategory(defaultCategory);
    clearErrors();
  };

  const handleCancel = () => {
    if (editing) {
      onCancelEdit();
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormInput
        label={`${transactionName} Title`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={formErrors.title}
      />

      <FormInput
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={formErrors.amount}
      />

      <FormInput
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={formErrors.date}
      />

      <FormInput
        label="Category"
        type="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        error={formErrors.category}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </FormInput>

      {success && <p className={styles.successMessage}>{success}</p>}

      <div className={styles.buttonGroup}>
        <Button type="submit">
          {editing ? `Update ${transactionName}` : `Add ${transactionName}`}
        </Button>

        {editing && (
          <Button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
