import { prisma } from "../core/db";
import { User, Prisma } from "@prisma/client";

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
