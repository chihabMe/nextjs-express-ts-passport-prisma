import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginSchema } from "@/schemas/auth.schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
const initialState = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [form, setForm] = useState(initialState);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login/", {
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
    <main>
      <section className="w-full flex justify-center items-center min-h-screen bg-gray-200">
        <Formik
          initialValues={initialState}
          onSubmit={(values, actions) => {
            console.log(values);
          }}
          validationSchema={toFormikValidationSchema(loginSchema)}
        >
          {(props) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full max-w-[380px] flex flex-col rounded-lg p-4 bg-white gap-4 "
            >
              <Input name="email" placeholder="enter your email" />
              <Input name="password" placeholder="enter your password" />
              {console.log(props.errors)}
              <Button disabled={props.isSubmitting || !props.isValid}>
                login
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};
export default LoginPage;
