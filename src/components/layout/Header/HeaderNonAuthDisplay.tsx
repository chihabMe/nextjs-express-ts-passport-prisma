import Button from "@/components/ui/Button";
import Link from "next/link";

const HeaderNonAuthDisplay = () => {
  return (
    <div className="flex gap-4 items-center">
      <Link href="/auth/login">
        <Button className="!rounded-full px-6 py-2 !text-primary capitalize  !bg-transparent  text-primary outline-primary hover:outline active:outline-2 outline-1">
          log in
        </Button>
      </Link>
      <Link href="/auth/register">
        <Button className="px-4 capitalize !rounded-full py-2.5 hover:opacity-90  transition-all duration-100 active:outline-2 outline-primary active:outline ">
          sign up
        </Button>
      </Link>
    </div>
  );
};

export default HeaderNonAuthDisplay;
