import { logoutEndpoint } from "@/config/endpoints";
import useAuth from "@/hooks/use-auth";
import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const LogoutPage = () => {
  const { post, loading, success } = useFetch();
  const { logout } = useAuth();

  useEffect(() => {
    post({
      url: logoutEndpoint,
    });
  }, []);

  useEffect(() => {
    if (!loading && success) {
      logout();
    }
  }, [loading]);

  return <div>logging out</div>;
};

export default LogoutPage;
