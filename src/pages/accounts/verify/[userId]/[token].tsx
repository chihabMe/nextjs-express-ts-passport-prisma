import { accountVerification } from "@/config/endpoints";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { axiosServerInstance } from "@/helpers/axios";
import IJSonResponse from "../../../../../server/interfaces/IJsonResponse";
import { AxiosError } from "axios";
import { toastSuccess } from "@/helpers/toasters";
import Link from "next/link";

const VerifyUserEmailPage = ({
  response,
}: {
  response: IJSonResponse<null>;
}) => {
  const router = useRouter();
  if (response.status == "success") {
    toastSuccess("activated", 5000);
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div>
        {response.status == "success" ? (
          <div className="  text-sm font-medium  ">
            activated go to{" "}
            <Link className=" text-primary capitalize  " href="/auth/login">
              login
            </Link>
          </div>
        ) : (
          <div className="text-red-500 text-sm font-medium  ">
            invalid verification link
          </div>
        )}
      </div>
    </main>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const userId = ctx.query.userId;
    const token = ctx.query.token;
    const verificationLink = `${accountVerification}${userId}/${token}`;
    console.log(verificationLink);
    const headers = {
      ...ctx.req.headers,
    };
    const response = await axiosServerInstance.get<IJSonResponse<null>>(
      verificationLink,
      {
        withCredentials: true,
        headers,
      }
    );
    const data = response.data;
    console.log(data);

    return {
      props: {
        response: data,
      },
    };
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      return {
        props: {
          response: err.response?.data ?? { status: "error" },
        },
      };
    }
    return {
      notFound: true,
    };
  }
};

export default VerifyUserEmailPage;
