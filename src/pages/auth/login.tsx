import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
const initialState = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [form, setForm] = useState(initialState);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/auth/login/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (response.status == 200) router.push("/");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="enter your email"
          />
        </div>
        <div>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="enter your password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginPage;
