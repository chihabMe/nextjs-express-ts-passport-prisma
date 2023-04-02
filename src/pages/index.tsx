import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IUser from "../../server/interfaces/IUser";
const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [status, setStatus] = useState<number>(0);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/accounts/me/");
      const data = await response.json();
      setStatus(response.status);
      if (response.status == 200) setUser(data);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    if (status != 0 && status != 200) router.push("/auth/login/");
  }, [status]);
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
