import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const LogoutPage = () => {
  const [status, setStatus] = useState(0);
  const router = useRouter();
  useEffect(() => {
    fetch("/auth/logout/").then((res) => {
      setStatus(res.status);
    });
  }, []);
  useEffect(() => {
    if (status == 200) {
      router.push("/");
    }
  }, [status]);

  return <div>logging out</div>;
};

export default LogoutPage;
