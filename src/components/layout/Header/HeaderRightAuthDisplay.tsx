import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  UserIcon,
  LogOutIcon,
  SettingsIcon,
  ChevronDownIcon,
  HomeIcon,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const HeaderAuthDisplay = () => {
  return (
    <div className="flex gap-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            variant="ghost"
            rounded="full"
            className="hover:ring-2 hover:ring-primary  flex items-center gap-2 ring-text ring-1  "
            title="profile"
          >
            <UserIcon className="w-6 h-6 text-primary" />
            <ChevronDownIcon className="w-6 h-6 text-primary" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="  shadow-sm !rounded-md py-2 shadow-primary     mr-2 bg-bg-light dark:bg-bg-dark w-56   sm:w-64 md:w-72  rounded-sm"
            sideOffset={10}
          >
            <DropdownMenu.Item className=" py-4 px-4   text-sm font-medium hover:text-primary transition-all duration-100 cursor-pointer">
              <Link
                href="/accounts/profile"
                className="capitalize flex gap-2 items-center "
              >
                <UserIcon className="w-4 h-4 text-primary" />
                <span>my account</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-px bg-gray-400 dark:bg-bg" />
            <DropdownMenu.Item className="py-4 px-4 flex flex-col gap-4 ">
              <Link
                href="/"
                className="capitalize    flex  text-sm font-medium  hover:text-primary transitino-all duration-all flex gap-2 items-center "
              >
                <HomeIcon className="w-4 h-4 text-primary" />
                <span>my home</span>
              </Link>
              <p className="text-xs  font-medium">
                Get quick and easy access to your home value, neighborhood
                activity and financial possibilities.
              </p>
              <Button
                size="sm"
                rounded="full"
                className="w-32 flex items-center gap-2"
              >
                <span className="text-xs font-medium">Trak my home</span>
              </Button>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-px bg-gray-400 dark:bg-bg" />
            <DropdownMenu.Item className="px-4 pt-4 pb-2">
              <Link
                href="accounts/settings"
                className="capitalize hover:text-primary transitino-all duration-all   flex  text-sm font-medium flex gap-2 items-center "
              >
                <SettingsIcon className="w-4 h-4 text-primary" />
                <span>account settings</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-2">
              <Link
                href="accounts/settings"
                className="capitalize  hover:text-primary transitino-all duration-all   flex  text-sm font-medium flex gap-2 items-center "
              >
                <LogOutIcon className="w-4 h-4 text-primary" />
                <span>sign out</span>
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default HeaderAuthDisplay;
