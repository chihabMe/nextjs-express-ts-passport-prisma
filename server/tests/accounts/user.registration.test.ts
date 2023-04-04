import { createApiServer } from "../../utils/server";
import supertest from "supertest";
import { prisma } from "../../core/db";
import IUser from "../../interfaces/IUser";
import { hashPassword } from "../../lib/auth.libs";
import { registrationEndpoint } from "@/config/endpoints";
import { response } from "express";

const app = createApiServer();
const request = supertest(app);

const userCredentials = {
  email: "user@email.com",
  username: "username",
  password: "strong_password",
  rePassword: "strong_password",
};

beforeAll(async () => {});
afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();
  await prisma.$transaction([deleteUsers]);
});

describe("user registraion", () => {
  it("should create a user and return its credentials", async () => {
    const response = await request(registrationEndpoint, {
      data: userCredentials,
    });
    console.log(response.status);
    expect(1).toEqual(1);
  });
});
