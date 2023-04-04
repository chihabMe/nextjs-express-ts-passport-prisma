import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="w-full  max-w-screen-xl mx-auto ">{children}</div>;
};
export default Container;
