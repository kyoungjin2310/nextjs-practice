import React from "react";
import { useTheme } from "next-themes";
import Sun from "../icon/sun";
import Moon from "../icon/moon";

const DarkModeToggleBtn = () => {
  const { theme, setTheme } = useTheme();
  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-50 dark:bg-slate-600 dark:text-slate-400 dark:bg-slate-700 hover:text-orange-500 dark:hover:text-yellow-300 rounded text-base mt-4 md:mt-0"
    >
      <Sun />
      <Moon />
    </button>
  );
};

export default DarkModeToggleBtn;
