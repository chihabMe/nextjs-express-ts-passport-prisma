import { prisma } from "../core/db";
import { User } from "@prisma/client";

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
export const createUserService = async ({
  username,
  email,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  return await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
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
