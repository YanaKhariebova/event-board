import { useState, useEffect } from "react";

const STORAGE_KEY = "eventboard-theme";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) ?? "garden";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "garden" ? "forest" : "garden"));
  }

  return { theme, toggleTheme };
}
