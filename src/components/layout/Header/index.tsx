import Button from "@/components/ui/Button";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import HeaderNonAuthDisplay from "./HeaderNonAuthDisplay";
import HeaderAuthDisplay from "./HeaderRightAuthDisplay";
import { MoonIcon } from "lucide-react";
import HeaderDarkLightThemeToggler from "./HeaderDarkLightThemeToggler";
const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <header className="py-1 flex justify-between px-2 py-2">
      <div className="flex items-center gap-6 ">
        <Link href="/">
          <h1 className="font-medium text-2xl capitalize">
            <span className="text-primary">real</span>
            home
          </h1>
        </Link>
        <nav className="">
          <ul className="flex gap-2  items-center  capitalize text-sm h-full">
            <li className="px-3 transition-all  duraition-100 border-b-[3px] hover:border-primary h-10 flex items-center justify-center cursor-pointer">
              buy
            </li>
            <li className="px-3 transition-all  duraition-100 border-b-[3px] hover:border-primary h-10 flex items-center justify-center cursor-pointer">
              rent
            </li>
            <li className="px-3 transition-all  duraition-100 border-b-[3px] hover:border-primary h-10 flex items-center justify-center cursor-pointer">
              sell
            </li>
            <li className="px-3 transition-all  duraition-100 border-b-[3px] hover:border-primary h-10 flex items-center justify-center cursor-pointer">
              my home
            </li>
            <li className="px-3 transition-all  duraition-100 border-b-[3px] hover:border-primary h-10 flex items-center justify-center cursor-pointer">
              news & blogs
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex gap-4 items-center justify-between w-full  max-w-[550px]  ">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              size="xs"
              variant="ghost"
              className=" ring-1 focus:ring-2 hover:ring-2 rounded-[4px]  !text-title  text-sm px-4  !ring-title    capitalize  "
            >
              advertise
            </Button>
          </Link>
          <Link href="/">
            <Button
              size="xs"
              variant="ghost"
              className=" ring-1 focus:ring-2 rounded-[4px] hover:ring-2  !text-title  text-sm px-4  !ring-title    capitalize  "
            >
              calculator
            </Button>
          </Link>
        </div>
        <div className="flex  gap-2">
          <HeaderDarkLightThemeToggler />
          {!isAuthenticated ? <HeaderNonAuthDisplay /> : <HeaderAuthDisplay />}
        </div>
      </div>
    </header>
  );
};
export default Header;
