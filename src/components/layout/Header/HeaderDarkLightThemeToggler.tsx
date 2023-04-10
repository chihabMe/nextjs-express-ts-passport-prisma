import Button from "@/components/ui/Button";
import { toastSuccess } from "@/helpers/toasters";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
const themes = {
  light: "light",
  dark: "dark",
};
const HeaderDarkLightThemeToggler = () => {
  const [theme, setTheme] = useState(themes.light);
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev == themes.light ? themes.dark : themes.light;
      toastSuccess(`${newTheme} theme on`);
      return newTheme;
    });
  };
  return (
    <>
      {theme == themes.light ? (
        <Button
          onClick={toggleTheme}
          variant="ghost"
          className="hover:ring-1 ring-black"
        >
          <MoonIcon className="text-black" />
        </Button>
      ) : (
        <Button
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
