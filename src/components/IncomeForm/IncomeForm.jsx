import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormValidation } from "../../hooks/useFormValidation";
import styles from "./IncomeForm.module.css";
import Button from "../Button/Button";
import {
  INCOME_CATEGORIES,
  DEFAULT_CATEGORY_OPTION,
} from "../../constants/categories";

const IncomeForm = ({ onAdd, editing, onEdit, onCancelEdit }) => {
  // Form fields
  const [incomeFormData, setIncomeFormData] = useState({
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
      setIncomeFormData({
        title: editing.title,
        amount: editing.amount.toString(),
        date: editing.date.split("T")[0],
        category: editing.category,
      });
    } else {
      setIncomeFormData({
        title: "",
        amount: "",
        date: "",
        category: DEFAULT_CATEGORY_OPTION,
      });
    }
  }, [editing]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeFormData({ ...incomeFormData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(incomeFormData)) {
      return;
    }

    const incomeData = {
      id: editing ? String(editing.id) : uuidv4(),
      title: incomeFormData.title,
      amount: parseFloat(incomeFormData.amount),
      date: new Date(incomeFormData.date).toISOString(),
      category: incomeFormData.category,
    };

    if (editing) {
      onEdit(incomeData);
      setSuccess("Income updated successfully!");
    } else {
      onAdd(incomeData);
      setSuccess("Income added successfully!");
    }

    clearForm();
    setTimeout(() => setSuccess(""), 1000);
  };

  // Clear form fields
  const clearForm = () => {
    setIncomeFormData({
      title: "",
      amount: "",
      date: "",
      category: DEFAULT_CATEGORY_OPTION,
    });
  };

  // Handle cancel action
  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
      clearForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="income-title" className={styles.label}>
          Income Title
        </label>
        <input
          id="income-title"
          type="text"
          name="title"
          value={incomeFormData.title}
          maxLength={20}
          placeholder="Enter income title"
          onChange={handleInputChange}
          className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
        />
        {errors.title && (
          <span className={styles.errorText}>{errors.title}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="income-amount" className={styles.label}>
          Amount
        </label>
        <input
          id="income-amount"
          type="number"
          name="amount"
          value={incomeFormData.amount}
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
        <label htmlFor="income-date" className={styles.label}>
          Date
        </label>
        <input
          id="income-date"
          type="date"
          name="date"
          value={incomeFormData.date}
          onChange={handleInputChange}
          className={`${styles.input} ${errors.date ? styles.inputError : ""}`}
        />
        {errors.date && <span className={styles.errorText}>{errors.date}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="income-category" className={styles.label}>
          Category
        </label>
        <select
          id="income-category"
          name="category"
          value={incomeFormData.category}
          onChange={handleInputChange}
          className={`${styles.input} ${
            errors.category ? styles.inputError : ""
          }`}
        >
          <option value={DEFAULT_CATEGORY_OPTION}>Choose Category</option>
          {INCOME_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
          {editing ? "Update Income" : "Add Income"}
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

export default IncomeForm;
