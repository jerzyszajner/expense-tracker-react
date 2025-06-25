// This file defines constants for different categories of expenses and income.
export const DEFAULT_CATEGORY_OPTION = "choose category";

export const EXPENSE_CATEGORIES = [
  "Housing",
  "Utilities",
  "Grocery",
  "Transportation",
  "Clothing",
  "Entertainment",
  "Other",
];

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Bonus",
  "Gift",
  "Other",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SORT_OPTIONS = [
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "amount-asc", label: "Amount Low-High" },
  { value: "amount-desc", label: "Amount High-Low" },
  { value: "date-asc", label: "Date Old-New" },
  { value: "date-desc", label: "Date New-Old" },
  { value: "category-asc", label: "Category A-Z" },
  { value: "category-desc", label: "Category Z-A" },
];
