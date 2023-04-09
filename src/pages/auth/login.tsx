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
import { MailIcon, EyeOffIcon, EyeIcon } from "lucide-react";
import useAuth from "@/hooks/use-auth";
const initialState = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { data, message, done, post, errors, status, loading, success } =
    useFetch<null>();
  useEffect(() => {
    toast.remove();
    if (!loading && !success && done)
      toastError("please check your credentials");
    if (!loading && success && done) {
      toastSuccess("logged in successfully");
      login();
      router.push("/");
    }
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
                  icon={<MailIcon className="w-4 h-4 text-text " />}
                  variant="md"
                  name="email"
                  placeholder="Email"
                />
                <Input
                  icon={<EyeOffIcon className="w-4 h-4 text-text " />}
                  icon2={<EyeIcon className="w-4 h-4 text-text " />}
                  name="password"
                  variant="md"
                  type="password"
                  placeholder="Password"
                  passwordInput
                />
                {!success && done && (
                  <span className="text-red-400 font-medium text-sm">
                    - {message}
                  </span>
                )}
                <div className="w-full flex justify-end  text-xs font-medium cursor-pointer  py-2 text-text hover:text-primary transition-all duration-100">
                  <Link href="/auth/password-reset">
                    <span className=""> password reset </span>
                  </Link>
                </div>
                <Button
                  loading={loading}
                  size="md"
                  className="capitalize my-2"
                  disabled={props.isSubmitting || !props.isValid}
                >
                  log in
                </Button>
                <Link href="/auth/register" className="text-text text-sm py-2">
                  you dont have an account ?
                  <span className="text-primary font-medium"> register</span>
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
