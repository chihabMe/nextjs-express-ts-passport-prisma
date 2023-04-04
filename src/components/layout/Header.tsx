import Link from "next/link";
import Button from "../ui/Button";
const Header = () => {
  return (
    <header className="py-3 flex justify-between px-2">
      <nav>
        <ul className="flex gap-2 items-center ">
          <li>link1</li>
          <li>link1</li>
          <li>link1</li>
        </ul>
      </nav>
      <div className="flex gap-4 items-center">
        <Link href="/auth/register">
          <Button className="px-4 py-2.5 outline-blue-300 transition-all duration-100 outline-1 active:outline-2 outline hover:opacity-90   font-medium text-blue-300 bg-transparent">
            register
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button className="px-6 py-2.5 hover:opacity-90  transition-all duration-100 active:outline-2 outline-blue-400 active:outline ">
            login
          </Button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
