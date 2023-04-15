import useAuth from "@/hooks/use-auth";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/helpers/utils";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const { loading, user } = useAuth();
  const router = useRouter();
  console.log(router.query);
  if (loading || !user) return <h1>loading</h1>;
  return (
    <main className="w-full max-w-[1200px] mx-auto  min-h-screen ">
      <section className="flex flex-col gap-8 py-4">
        <h1 className="font-bold text-3xl"> Hi there!</h1>
        <h3 className="font-medium text-sm">{user.email}</h3>
      </section>
      <section>
        <ul className="flex pt-2 pb-px  gap-2  border-b-[1px]  border-gray-300  ">
          <SettingNavMenuItem text="profile" path="/accounts/profile" />
          <SettingNavMenuItem
            text="settings"
            path="/accounts/profile/settings"
          />
          <SettingNavMenuItem text="status" path="/accounts/profile/status" />
        </ul>
      </section>
      {children}
    </main>
  );
};
const SettingNavMenuItem = ({
  path,
  text,
  className,
}: {
  className?: string;
  path: string;
  text: string;
}) => {
  const router = useRouter();
  const currentPathName = router.pathname;
  const isActive = currentPathName == path ? "border-primary text-primary" : "";
  const defaultClasses = `px-2 py-2 mx-2 capitalize border-b-[3px] transition-all duration-100 ${isActive}
   hover:border-primary  text-sm cursor-pointer hover:text-primary`;
  return (
    <li className={cn(defaultClasses, className)}>
      <Link href={path}>{text}</Link>
    </li>
  );
};

export default ProfileLayout;
