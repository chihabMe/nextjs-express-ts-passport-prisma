import Button from "@/components/ui/Button";
import Link from "next/link";
import { UserIcon, LogOutIcon } from "lucide-react";

const HeaderAuthDisplay = () => {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className="hover:ring-1 ring-primary"
        title="profile"
      >
        <Link href="/accounts/profile">
          <UserIcon className="w-6 h-6 text-primary" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="hover:ring-1 ring-primary"
        title="logout"
      >
        <Link href="/auth/logout">
          <LogOutIcon className="w-5 h-5 text-primary" />
        </Link>
      </Button>
    </div>
  );
};

export default HeaderAuthDisplay;
