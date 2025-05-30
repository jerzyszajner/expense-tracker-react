import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";

// Filter transactions by category or month criteria
export const useFilteredData = (data, filter, type) => {
  // Get appropriate categories for transaction type
  const categories =
    type === "expenses" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  if (!filter) return data;

  // Apply category filter
  if (categories.includes(filter)) {
    return data.filter((item) => item.category === filter);
  }

  // Apply month filter
  return data.filter((item) => {
    const itemMonth = new Date(item.date).toLocaleDateString("en-US", {
      month: "long",
    });
    return itemMonth === filter;
  });
};
