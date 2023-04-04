import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { registrationEndpoint } from "@/config/endpoints";
import useFetch from "@/hooks/use-fetch";
import { registerationSchema } from "../../../server/schemas/auth.schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
const initialState = {
  username: "",
  email: "",
  password: "",
  rePassword: "",
};
const RegistrationPage = () => {
  const router = useRouter();
  const { message, post, errors, loading, success } = useFetch<null>();
  return (
    <main>
      <section className="w-full flex justify-center items-center min-h-screen bg-gray-200">
        <Formik
          initialValues={initialState}
          validationSchema={toFormikValidationSchema(registerationSchema)}
          onSubmit={async (values, actions) => {
            const data = await post({
              url: registrationEndpoint,
              data: JSON.stringify(values),
            });
            if (data && data?.status == "error") {
              actions.setErrors(data.errors);
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form className="w-full max-w-[380px] flex flex-col rounded-lg p-4 bg-white gap-4 ">
              <>
                <Input type="text" name="username" placeholder="username" />
                <Input type="email" name="email" placeholder="email" />
                <Input type="password" name="password" placeholder="password" />
                <Input
                  type="password"
                  name="rePassword"
                  placeholder="confirm your password"
                />
                {errors && (
                  <span className="text-red-400 font-medium text-sm">
                    - {message}
                  </span>
                )}
                <Button disabled={props.isSubmitting || !props.isValid}>
                  register
                </Button>
                <Link
                  href="/auth/login"
                  className=" block text-center rounded-md capitalize text-blue-400 py-1.5 bg-transparent outline-2 outline font-medium outline-blue-300"
                >
                  login
                </Link>
              </>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};
export default RegistrationPage;
