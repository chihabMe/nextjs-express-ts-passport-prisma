import Button from "@/components/ui/Button";
import { toastSuccess } from "@/helpers/toasters";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const themes = {
  light: "light",
  dark: "dark",
};
const HeaderDarkLightThemeToggler = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme == "system" ? systemTheme : theme;
  const toggleTheme = () => {
    if (theme == themes.dark) {
      setTheme(themes.light);
      toastSuccess(`light theme on`);
    } else {
      setTheme(themes.dark);
      toastSuccess(`dark theme on`);
    }
  };
  return (
    <>
      {theme == themes.light ? (
        <Button
          rounded="full"
          onClick={toggleTheme}
          variant="ghost"
          className="hover:ring-1 ring-text"
        >
          <MoonIcon className="text-black" />
        </Button>
      ) : (
        <Button
          rounded="full"
          onClick={toggleTheme}
          variant="ghost"
          className="hover:ring-1 ring-yellow-500"
        >
          <SunIcon className="text-yellow-500" />
        </Button>
      )}
    </>
  );
};

export default HeaderDarkLightThemeToggler;
