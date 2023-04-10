import { logoutEndpoint } from "@/config/endpoints";
import { toastSuccess } from "@/helpers/toasters";
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
      toastSuccess("logged out");
    }
  }, [loading]);

  return <div>logging out</div>;
};

export default LogoutPage;
