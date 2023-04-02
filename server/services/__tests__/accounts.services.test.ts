import * as accountsServices from "../accounts.services";
import { prisma } from "../../core/db";
import { hashPassword, comparePassword } from "../../lib/auth.libs";
import { execOnce } from "next/dist/shared/lib/utils";
import { isValidElement } from "react";
const userInfo = {
  username: "chihab",
  email: "chihab@email.com",
  password: "password",
  id: "random_id",
};
const userInfos2 = {
  username: "chihab_2",
  email: "chihab_2@email.com",
  password: "password",
};

beforeAll(async () => {
  await prisma.user.create({
    data: userInfo,
  });
});
afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();
  await prisma.$transaction([deleteUsers]);
});

describe("test user services", () => {
  it("it should find one user ", async () => {
    const users = await accountsServices.findAllUsers();
    expect(users.length).toEqual(1);
  });
  it("it should find the user by the email", async () => {
    const user = await accountsServices.findUserByEmail(userInfo.email);
    expect(user).not.toEqual(null);
    if (user == null) throw new Error("the user is null");
    expect(user.email).toEqual(userInfo.email);
    expect(user.username).toEqual(userInfo.username);
    expect(
      comparePassword({
        hash: user.password,
        password: userInfo.password,
      })
    );
  });
  //the email (because it has to be unique)
  it("it should (false) not be valid ", async () => {
    const isValid = await accountsServices.validateUniqueEmail(userInfo.email);
    expect(isValid).toEqual(false);
  });
  //the username (because it has to be unique)
  it("it should (false) not be valid ", async () => {
    const isValid = await accountsServices.validateUniqueUsername(
      userInfo.username
    );
    expect(isValid).toEqual(false);
  });
  //validate the user
  it("it should return the false (in valid) and fields errors ", async () => {
    const { valid, errors } = await accountsServices.validateUser({
      email: userInfo.email,
      username: userInfo.username,
    });
    expect(valid).toEqual(false);
    expect(typeof errors.email).toEqual("string");
    expect(typeof errors.username).toEqual("string");
  });
  //find the user by the
  it("it should find the used by using its id ", async () => {
    const user = await accountsServices.findUserById(userInfo.id);
    expect(user).not.toBeNull();
    if (!user) throw new Error("the used must not be null");
    expect(user.id).toEqual(userInfo.id);
    expect(user.username).toEqual(userInfo.username);
    expect(user.email).toEqual(userInfo.email);
  });
  it("should create a new user", async () => {
    const user = await accountsServices.createUserService(userInfos2);
    expect(user).not.toBeNull();
    expect(user.email).toEqual(userInfos2.email);
    expect(user.username).toEqual(userInfos2.username);
    const users = await accountsServices.findAllUsers();
    expect(users.length).toEqual(2);
  });
});
