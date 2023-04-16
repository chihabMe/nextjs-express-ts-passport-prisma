import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  facebookAuthUrl,
  googleAuthUrl,
  registrationEndpoint,
} from "@/config/endpoints";
import useFetch from "@/hooks/use-fetch";
import { registerationSchema } from "../../../server/schemas/auth.schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { toastError, toastSuccess } from "@/helpers/toasters";
import SocialLoginItem from "@/components/ui/SocialLoginItem";
import googleImage from "@/assets/images/social/google.png";
import facebookImage from "@/assets/images/social/facebook.png";
const initialState = {
  username: "",
  email: "",
  password: "",
  rePassword: "",
};
const RegistrationPage = () => {
  const router = useRouter();
  const { message, post, errors, done, loading, success } = useFetch<null>();
  useEffect(() => {
    toast.remove();
    if (!loading && !success && done)
      toastError("please check your credentials");
    if (!loading && success && done) {
      toastSuccess("registred successfully please check your email  ", 7000);
    }
  }, [loading, success]);
  return (
    <main>
      <section className="w-full mx-auto max-w-[380px] flex flex-col justify-center items-center min-h-screen px-4 md:px-0  ">
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
            <Form className="w-full  flex flex-col rounded-lg  bg-bg-light dark:bg-bg-dark gap-3 ">
              <>
                <Input type="text" name="username" placeholder="username" />
                <Input type="email" name="email" placeholder="email" />
                <Input type="password" name="password" placeholder="password" />
                <Input
                  type="password"
                  name="rePassword"
                  placeholder="confirm your password"
                />
                {!success && done && (
                  <span className="text-red-400 font-medium text-sm">
                    - {message}
                  </span>
                )}
                <Button
                  size="md"
                  loading={loading}
                  className="capitalize my-2"
                  disabled={props.isSubmitting || !props.isValid}
                >
                  register
                </Button>
                <Link href="/auth/login" className="text-text text-sm py-2">
                  you have an account ?
                  <span className="text-primary font-medium"> login</span>
                </Link>
              </>
            </Form>
          )}
        </Formik>

        <div className="flex flex-col mt-4    w-full gap-2">
          <SocialLoginItem
            text="login with Google"
            icon={googleImage}
            alt="google"
            authUrl={googleAuthUrl}
          />
          <SocialLoginItem
            text="login with Facebook"
            icon={facebookImage}
            alt="google"
            authUrl={facebookAuthUrl}
          />
        </div>
      </section>
    </main>
  );
};
export default RegistrationPage;
