import { useState } from "react";

const useFormValidation = () => {
  // Form validation errors state
  const [formErrors, setFormErrors] = useState({});

  // Validate all form fields and return validation status
  const validateForm = (values) => {
    let newErrors = {};

    if (!values.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!values.amount?.trim()) {
      newErrors.amount = "Amount is required";
    } else if (
      isNaN(parseFloat(values.amount)) ||
      parseFloat(values.amount) <= 0
    ) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!values.date?.trim()) {
      newErrors.date = "Date is required";
    }

    if (!values.category?.trim()) {
      newErrors.category = "Category is required";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset all validation errors
  const clearErrors = () => {
    setFormErrors({});
  };

  return {
    formErrors,
    validateForm,
    clearErrors,
  };
};

export default useFormValidation;
