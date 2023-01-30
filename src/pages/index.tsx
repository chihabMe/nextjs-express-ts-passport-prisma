import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IUser from "../../server/interfaces/IUser";
const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [status, setStatus] = useState<number>(0);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/accounts/me/");
      const data = await response.json();
      console.log(data);
      setUser(data);
      setStatus(response.status);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    if (status != 0 && status != 200) router.push("/auth/login/");
  }, [status]);
  return (
    <div>
      {user && (
        <div>
          <div>
            email:{user.email}
            username:{user.username}
          </div>
          <a href="/auth/logout/">
            <button>logout</button>
          </a>
        </div>
      )}
    </div>
  );
};
export default HomePage;
