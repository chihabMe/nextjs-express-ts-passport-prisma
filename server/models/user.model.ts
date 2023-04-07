import { PrismaClient } from "@prisma/client";
import { comparePassword } from "../lib/auth.libs";
import { prisma } from "../core/db";

function UserModel(prismaUser: PrismaClient["user"]) {
  return Object.assign(prismaUser, {
    async checkPassword({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      const user = await prismaUser.findFirst({
        where: {
          email,
        },
      });
      const isValid = comparePassword({
        hash: user?.password ?? "",
        password,
      });
      return { user: isValid ? user : null, isValid };
    },
  });
}
const User = UserModel(prisma.user);
export default User;
