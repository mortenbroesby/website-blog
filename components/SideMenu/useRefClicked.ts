import { useEffect } from "react";

export const useRefClicked = (ref, callback) => {
  const handleClick = (event) => {
    if (ref.current && ref.current === event.target) {
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
