import { GetServerSideProps } from "next";
import axios from "axios";
import IUser from "../../../../server/interfaces/IUser";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface Props {
  profile: IUser;
}
const ProfilePage = ({ profile }: Props) => {
  return (
    <main>
      <div className=" w-full  items-center max-w-sm mx-auto cursor-pointer flex flex-col gap-2">
        <UserCircleIcon className="w-16 h-16 text-gray-800 " />
        <h2 className="font-medium">{profile.username}</h2>
        <Link href="/">
          <Button>home</Button>
        </Link>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const meEndpoint = process.env.HOST + "/api/accounts/me/";
    const headers = {
      ...ctx.req.headers,
    };
    const response = await axios.get<IUser>(meEndpoint, {
      withCredentials: true,
      headers,
    });
    const data = response.data;

    return {
      props: {
        profile: data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};

export default ProfilePage;
