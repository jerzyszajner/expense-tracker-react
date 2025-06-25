// Custom hook for sorting transactions by various criteria
export const useSortedData = (data, sort) => {
  if (!sort || !data.length) return data;

  const sortedData = [...data];

  switch (sort) {
    case "title-asc":
      // A-Z
      sortedData.sort((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase())
      );
      break;
    case "title-desc":
      // Z-A
      sortedData.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
      break;
    case "amount-asc":
      // Low to High
      sortedData.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
      break;
    case "amount-desc":
      // High to Low
      sortedData.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
      break;
    case "date-asc":
      // Old to New
      sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "date-desc":
      // New to Old
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "category-asc":
      // A-Z
      sortedData.sort((a, b) =>
        a.category.toLowerCase().localeCompare(b.category.toLowerCase())
      );
      break;
    case "category-desc":
      // Z-A
      sortedData.sort((a, b) =>
        b.category.toLowerCase().localeCompare(a.category.toLowerCase())
      );
      break;
    default:
      // If no sort option is selected, keep the original order
      break;
  }

  return sortedData;
};
