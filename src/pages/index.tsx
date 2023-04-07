import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IUser from "../../server/interfaces/IUser";
import useUser from "@/hooks/use-user";
const HomePage = () => {
  const user = useUser();
  const router = useRouter();
  return (
    <div className="">
      {user && (
        <div>
          <div>
            email:{user.email}
            username:{user.username}
          </div>
          <a href="/auth/logout/">
            <button className="bg-red-500 hover:bg-red-300 text-white rounded-md px-4 py-2 curso-pointer">
              logout
            </button>
          </a>
        </div>
      )}
    </div>
  );
};
export default HomePage;
