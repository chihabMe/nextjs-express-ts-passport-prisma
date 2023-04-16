import { prisma } from "../core/db";
import { User, Prisma } from "@prisma/client";
import crypto from "crypto";

export const validateUniqueEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user == null;
};
export const validateUniqueUsername = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user == null;
};
export const createUserService = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data,
  });
};
interface ValidateUserErrors {
  email?: string;
  username?: string;
}
export const validateUser = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  const isValidEmail = await validateUniqueEmail(email);
  const isValidUsername = await validateUniqueUsername(username);
  const errors: ValidateUserErrors = {};
  if (!isValidEmail) errors.email = "This email is been used";
  if (!isValidUsername) errors.username = "This usernmae is been used";
  const valid = isValidEmail && isValidUsername;
  return {
    valid,
    errors,
  };
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};
export const findUserById = async (id: string) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
};

export const findAllUsers = async () => {
  return prisma.user.findMany();
};

export const findUsersService = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where: Prisma.UserWhereInput;
  orderBy: Prisma.UserOrderByWithRelationInput;
}) => {
  return await prisma.user.findMany(params);
};

export const updateUserService = async (params: {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}) => {
  return prisma.user.update(params);
};

export const findUserOrCreateService = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.findFirst({
    where: {
      id: data.id,
    },
  });
  if (!user) return prisma.user.create({ data });
  return user;
};

//this func will generate a random token
// store it in the databsae
// return the token
export const generateAVerificatinoTokenService = async ({
  userId,
}: {
  userId: string;
}) => {
  const token = crypto.randomBytes(32).toString("hex");
  await prisma.token.create({
    data: {
      userId,
      value: token,
    },
  });
  return token;
};

export const generateVerificationEmailService = ({
  user,
  verificationLink,
}: {
  user: User;
  verificationLink: string;
}) => {
  const subject = ` ${user.username} verify your email `;
  const html = `
<div>
<p>
 hello ${user.username} we sent you this message to verify that you own this
email ${user.email}
</p>
<a href="${verificationLink}">
    <button  >
        click to verify
    </button>
<a>
</div>
`;
  return { subject, html };
};

export const generateAVerificationLink = ({
  protocol,
  host,
  token,
  userId,
}: {
  protocol: string;
  host: string;
  token: string;
  userId: string;
}) => {
  const baseHost =
    process.env.NODE_ENV != "production" ? "localhost:3000" : host;
  return (
    protocol + "://" + baseHost + "/api/accounts/verify/" + userId + "/" + token
  );
};

export const findUniqueTokenService = (
  params: Prisma.TokenUserIdValueCompoundUniqueInput
) => {
  return prisma.token.findUnique({
    where: {
      userId_value: params,
    },
  });
};
export const deleteTokenService = (
  params: Prisma.TokenUserIdValueCompoundUniqueInput
) => {
  return prisma.token.delete({
    where: {
      userId_value: params,
    },
  });
};
