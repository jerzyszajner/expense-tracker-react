import { useCallback } from "react";

// Custom hook for handling modal keyboard events
export const useModalKeyDown = (onEnter, onEscape) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Escape") {
        onEscape();
      }
    },
    [onEnter, onEscape]
  );

  return handleKeyDown;
};
