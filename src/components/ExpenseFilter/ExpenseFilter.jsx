import styles from "./ExpenseFilter.module.css";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  MONTHS,
} from "../../constants/categories";

const ExpenseFilter = ({ selectedFilter, onFilterChange, activeTab }) => {
  // Get appropriate categories for current tab
  const categories =
    activeTab === "expenses" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  // Handle filter selection change
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  // Render filter dropdown
  return (
    <div className={styles.expenseFilter}>
      <label htmlFor="filter" className={styles.filterLabel}>
        Filter:
      </label>
      <select
        id="filter"
        name="filter"
        className={styles.filterSelect}
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="">
          All {activeTab === "expenses" ? "Expenses" : "Incomes"}
        </option>

        <optgroup label="Categories">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </optgroup>

        <optgroup label="Months">
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default ExpenseFilter;
