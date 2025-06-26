import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormValidation } from "../../hooks/useFormValidation";
import styles from "./ExpenseForm.module.css";
import Button from "../Button/Button";
import {
  EXPENSE_CATEGORIES,
  DEFAULT_CATEGORY_OPTION,
} from "../../constants/categories";

const ExpenseForm = ({ onAdd, editing, onEdit, onCancelEdit }) => {
  // Form fields
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: DEFAULT_CATEGORY_OPTION,
  });

  // Validation errors
  const { errors, validate } = useFormValidation();

  // Success message
  const [success, setSuccess] = useState("");

  // Set form fields when editing
  useEffect(() => {
    if (editing) {
      setExpenseFormData({
        title: editing.title,
        amount: editing.amount.toString(),
        date: editing.date.split("T")[0],
        category: editing.category,
      });
    }
  }, [editing]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData({ ...expenseFormData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(expenseFormData)) {
      return;
    }

    const expenseData = {
      id: editing ? editing.id : uuidv4(),
      title: expenseFormData.title,
      amount: Number(expenseFormData.amount),
      date: new Date(expenseFormData.date).toISOString(),
      category: expenseFormData.category,
    };

    if (editing) {
      onEdit(expenseData);
      setSuccess("Expense updated successfully!");
    } else {
      onAdd(expenseData);
      setSuccess("Expense added successfully!");
    }

    setTimeout(() => setSuccess(""), 1000);
  };

  // Handle cancel action
  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="expense-title" className={styles.label}>
          Expense Title
        </label>
        <input
          id="expense-title"
          type="text"
          name="title"
          value={expenseFormData.title}
          maxLength={20}
          placeholder="Enter expense title"
          onChange={handleInputChange}
          className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
        />
        {errors.title && (
          <span className={styles.errorText}>{errors.title}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="expense-amount" className={styles.label}>
          Amount
        </label>
        <input
          id="expense-amount"
          type="number"
          name="amount"
          value={expenseFormData.amount}
          placeholder="Enter amount"
          onChange={handleInputChange}
          className={`${styles.input} ${
            errors.amount ? styles.inputError : ""
          }`}
        />
        {errors.amount && (
          <span className={styles.errorText}>{errors.amount}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="expense-date" className={styles.label}>
          Date
        </label>
        <input
          id="expense-date"
          type="date"
          name="date"
          value={expenseFormData.date}
          onChange={handleInputChange}
          className={`${styles.input} ${errors.date ? styles.inputError : ""}`}
        />
        {errors.date && <span className={styles.errorText}>{errors.date}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="expense-category" className={styles.label}>
          Category
        </label>
        <select
          id="expense-category"
          name="category"
          value={expenseFormData.category}
          onChange={handleInputChange}
          className={`${styles.input} ${
            errors.category ? styles.inputError : ""
          }`}
        >
          <option value={DEFAULT_CATEGORY_OPTION}>Choose Category</option>
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className={styles.errorText}>{errors.category}</span>
        )}
      </div>

      <div className={styles.successContainer}>
        {success && <p className={styles.successMessage}>{success}</p>}
      </div>

      <div className={styles.buttonGroup}>
        <Button type="submit" variant="primary">
          {editing ? "Update Expense" : "Add Expense"}
        </Button>

        {onCancelEdit && (
          <Button type="button" onClick={handleCancel} variant="primary">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
