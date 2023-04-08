import useAuth from "@/hooks/use-auth";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

const Container = ({ children }: { children: ReactNode }) => {
  const { loading, done, user } = useAuth();
  if (loading || (!done && !user))
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  return <div className="w-full  max-w-screen-xl mx-auto ">{children}</div>;
};
export default Container;
