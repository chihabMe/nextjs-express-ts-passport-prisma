import { response } from "express";
import httpStatus from "http-status";
import supertest from "supertest";
import { prisma } from "../../core/db";
import { hashPassword } from "../../lib/auth.libs";
import { createUserService } from "../../services/accounts.services";
import { createApiServer } from "../../utils/server";

const userCredentials = {
  username: "chihab",
  email: "chihab@email.com",
  password: "password",
  rePassword: "password",
};

const app = createApiServer();
const request = supertest(app);

beforeAll(async () => {
  await createUserService({
    email: userCredentials.email,
    username: userCredentials.username,
    password: hashPassword(userCredentials.password),
  });
});

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();
  const deleteTokens = prisma.token.deleteMany();
  const deleteProfiles = prisma.profile.deleteMany();
  await prisma.$transaction([deleteUsers, deleteTokens, deleteProfiles]);
});

describe("user authentication", () => {
  let session_cookie: string;
  it("should login the user ", async () => {
    const response = await request.post("/api/auth/login/").send({
      email: userCredentials.email,
      password: userCredentials.password,
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({
      message: "you are logged in",
      status: "success",
      statusCode: httpStatus.OK,
    });
    const parsed_session_cookie = response.headers["set-cookie"][0];
    expect(parsed_session_cookie).toContain("session_id");
    expect(parsed_session_cookie).toContain("HttpOnly");
    session_cookie = parsed_session_cookie;
  });

  //trying to get user infos wihout loging in
  //
  it("should return 400 error response with unauthorized  error   ", async () => {
    const meResponse = await request.get("/api/accounts/me/");
    expect(meResponse.statusCode).toEqual(httpStatus.UNAUTHORIZED);
    expect(meResponse.body).toMatchObject({
      status: "error",
      statusCode: httpStatus.UNAUTHORIZED,
      message: "you need to be authorized to access this route",
    });
  });
  //getting the user ifnos
  it("should return 200 response with user detials ", async () => {
    const meResponse = await request
      .get("/api/accounts/me/")
      .set("Cookie", session_cookie);
    expect(meResponse.statusCode).toEqual(httpStatus.OK);
    expect(meResponse.body).toMatchObject({
      message: "user profile",
      status: "success",
      statusCode: httpStatus.OK,
      data: {
        email: userCredentials.email,
        username: userCredentials.username,
        verified: expect.any(Boolean),
        active: expect.any(Boolean),
      },
    });
    expect(meResponse.body.data.password).toBeUndefined();
  });
});
