import styles from "./SortSelector.module.css";
import { SORT_OPTIONS } from "../../constants/categories";

const SortSelector = ({ selectedSort, onSortChange }) => {
  // Handle sort selection change
  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  // Render sort dropdown
  return (
    <div className={styles.sortSelector}>
      <label htmlFor="sort" className={styles.sortLabel}>
        Sort:
      </label>
      <select
        id="sort"
        name="sort"
        className={styles.sortSelect}
        value={selectedSort}
        onChange={handleSortChange}
      >
        <option value="">Default order</option>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelector;
