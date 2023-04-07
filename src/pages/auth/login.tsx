import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginEndponit } from "@/config/endpoints";
import useFetch from "@/hooks/use-fetch";
import { loginSchema } from "../../../server/schemas/auth.schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useEffect } from "react";
import { toastError, toastSuccess } from "@/helpers/toasters";
import toast from "react-hot-toast";
const initialState = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const router = useRouter();
  const { data, message, done, post, errors, status, loading, success } =
    useFetch<null>();
  useEffect(() => {
    toast.remove();
    if (!loading && !success && done)
      toastError("please check your credentials");
    if (!loading && success && done) toastSuccess("logged in successfully");
  }, [loading, success]);
  return (
    <main>
      <section className="w-full flex justify-center items-center min-h-screen bg-gray-200">
        <Formik
          initialValues={initialState}
          validationSchema={toFormikValidationSchema(loginSchema)}
          onSubmit={async (values, actions) => {
            const data = await post({
              url: loginEndponit,
              data: JSON.stringify(values),
            });
            if (data && data?.status == "error") {
              actions.setErrors(data.errors);
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form className="w-full max-w-[380px] flex flex-col rounded-lg p-4 bg-white gap-3 ">
              <>
                <Input
                  variant="md"
                  label="email"
                  name="email"
                  placeholder="Enter  email"
                />
                <Input
                  label="password"
                  name="password"
                  variant="md"
                  type="password"
                  placeholder="Enter  password"
                />
                {!success && done && (
                  <span className="text-red-400 font-medium text-sm">
                    - {message}
                  </span>
                )}
                <Button
                  loading={loading}
                  className="capitalize my-1"
                  disabled={props.isSubmitting || !props.isValid}
                >
                  log in
                </Button>
                <div className="w-full flex justify-center  ">
                  <Link href="/auth/password-reset">
                    <span className="capitalize text-primary text-sm  trsnaition-all duration-100 hover:opacity-70   cursor-pointer py-1 ">
                      forgot your password?
                    </span>
                  </Link>
                </div>
                <Link
                  href="/auth/register"
                  className=" block text-center text-sm rounded-md  text-blue-400 py-1.5 bg-transparent outline-2 outline font-medium outline-blue-300"
                >
                  register
                </Link>
              </>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};
export default LoginPage;
