import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginEndponit } from "@/config/endpoints";
import useFetch from "@/hooks/use-fetch";
import { loginSchema } from "@/schemas/auth.schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
const initialState = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const router = useRouter();
  const { data, message, post, errors, status, loading, success } =
    useFetch<null>();
  return (
    <main>
      <section className="w-full flex justify-center items-center min-h-screen bg-gray-200">
        <Formik
          initialValues={initialState}
          validationSchema={toFormikValidationSchema(loginSchema)}
          onSubmit={async (values, actions) => {
            const data = await post({
              url: loginEndponit,
              data: values,
            });
            if (data?.status == "error") {
              actions.setErrors(data.errors);
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form className="w-full max-w-[380px] flex flex-col rounded-lg p-4 bg-white gap-4 ">
              <>
                {console.log("errors from the backend", JSON.stringify(errors))}
                <Input name="email" placeholder="enter your email" />
                <Input name="password" placeholder="enter your password" />
                {errors && (
                  <span className="text-red-400 font-medium text-sm">
                    - {message}
                  </span>
                )}
                <Button disabled={props.isSubmitting || !props.isValid}>
                  login
                </Button>
                <Link
                  href="/auth/register"
                  className=" block text-center rounded-md capitalize text-blue-400 py-1.5 bg-transparent outline-2 outline font-medium outline-blue-300"
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
