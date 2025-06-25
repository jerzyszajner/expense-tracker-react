import { useState } from "react";
import { DEFAULT_CATEGORY_OPTION } from "../constants/categories";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  // Validate form data
  const validate = (values) => {
    let newErrors = {};
    // Title validation
    if (!values.title.trim()) {
      newErrors.title = "Title is required";
    }

    // Amount validation
    if (!values.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(values.amount)) || Number(values.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    // Date validation
    if (!values.date.trim()) {
      newErrors.date = "Date is required";
    }

    // Category validation
    if (
      !values.category.trim() ||
      values.category === DEFAULT_CATEGORY_OPTION
    ) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};
