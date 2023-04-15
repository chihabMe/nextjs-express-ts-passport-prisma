import ProfileLayout from "@/components/layout/pageLayout/profileLayout";
import Button from "@/components/ui/Button";
import { UserIcon, MailIcon, LockIcon, BellIcon } from "lucide-react";

const SettingsPage = () => {
  return (
    <section className="flex py-10 gap-10 w-full  ">
      <div>
        <UserIcon className="h-20 w-20 " />
      </div>
      <div className="w-full">
        <div className="capitalize w-full py-4 flex flex-col gap-4 px-4 border-b border-b-gray-400 border-b-[1px]">
          <h1>add name</h1>
          <h1>add adress</h1>
          <h1>add phone number</h1>
          <Button
            size="sm"
            rounded="full"
            className="capitalize w-[120px] px-2"
          >
            edit proifle
          </Button>
        </div>
        <div className=" flex gap-4 capitalize w-full py-6    gap-4 px-4 border-b border-b-gray-400 border-b-[1px]">
          <MailIcon className="w-6 h-6" />
          <span>chihab@email.com</span>
          <span>verified</span>
        </div>

        <div className=" flex gap-4 capitalize w-full py-6    gap-4 px-4 border-b border-b-gray-400 border-b-[1px]">
          <LockIcon className="w-6 h-6" />
          <span>change passsword</span>
          <span>reset password</span>
        </div>
        <div className=" flex gap-4 capitalize w-full py-6    gap-4 px-4 border-b border-b-gray-400 border-b-[1px]">
          <BellIcon className="w-6 h-6" />
          <span> notifications settings</span>
        </div>
      </div>
    </section>
  );
};
SettingsPage.PageLayout = ProfileLayout;
export default SettingsPage;
