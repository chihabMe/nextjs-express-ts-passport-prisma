import Link from "next/link";
import Button from "../ui/Button";
const Header = () => {
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
      <div className="flex gap-4 items-center justify-between w-full max-w-[450px]  ">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button className="items-cener !py-1.5 text-sm px-4 text-title outline outline-1 outline-text capitalize text-sm !bg-transparent">
              advertise
            </Button>
          </Link>
          <Link href="/">
            <Button className="items-cener !py-1.5 text-sm px-4 text-title outline outline-1 outline-text capitalize text-sm !bg-transparent">
              calculator
            </Button>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/auth/login">
            <Button className="rounded-full px-6 py-2 capitalize  !bg-transparent  text-primary outline-primary hover:outline active:outline-2 outline-1">
              log in
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="px-4 capitalize rounded-full py-2.5 hover:opacity-90  transition-all duration-100 active:outline-2 outline-primary active:outline ">
              sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
