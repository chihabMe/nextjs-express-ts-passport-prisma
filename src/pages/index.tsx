import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IUser from "../../server/interfaces/IUser";
import useUser from "@/hooks/use-user";
import Head from "next/head";
const HomePage = () => {
  const router = useRouter();
  const user = useUser();
  return (
    <>
      <Head>
        <title>housy home page</title>
      </Head>
      <main className="">
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
      </main>
    </>
  );
};
export default HomePage;
