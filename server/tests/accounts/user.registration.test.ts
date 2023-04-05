import { response } from "express";
import httpStatus from "http-status";
import supertest from "supertest";
import { prisma } from "../../core/db";
import { createApiServer } from "../../utils/server";

const userCredentials = {
  username: "chihab",
  email: "chihab@email.com",
  password: "password",
  rePassword: "password",
};

const app = createApiServer();
const request = supertest(app);

//beforeAll(async () => {});

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();
  const deleteTokens = prisma.token.deleteMany();
  const deleteProfiles = prisma.profile.deleteMany();
  await prisma.$transaction([deleteUsers, deleteTokens, deleteProfiles]);
});

describe("user registration", () => {
  //missing fields
  it("should return 400 error with the missed fields  ", async () => {
    const response = await request.post("/api/accounts/register/").send({});
    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(response.body).toMatchObject({
      message: "please make sure that you didn't miss any required field",
      status: "error",
      statusCode: httpStatus.BAD_REQUEST,
      errors: {
        email: ["Required"],
        username: ["Required"],
        password: ["Required"],
        rePassword: ["Required"],
      },
    });
  });
  //passwords don't match
  it("should return 400 error with the passwords don't match error  ", async () => {
    const response = await request
      .post("/api/accounts/register/")
      .send({ ...userCredentials, rePassword: "random txt " });
    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(response.body).toMatchObject({
      message: "please make sure that you didn't miss any required field",
      status: "error",
      statusCode: httpStatus.BAD_REQUEST,
      errors: {
        rePassword: ["Passwords don't match"],
      },
    });
  });
  it(" should register a user successfully and returns his credentials", async () => {
    const response = await request
      .post("/api/accounts/register/")
      .send(userCredentials);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toMatchObject({
      message: "registred",
      status: "success",
      statusCode: 201,
      data: {
        username: userCredentials.username,
        email: userCredentials.email,
        id: expect.any(String),
        active: false,
        verified: false,
      },
    });
  });

  //trying to register with an existing email or username
  it(" should return 400 error with the invalid fields", async () => {
    const response = await request
      .post("/api/accounts/register/")
      .send(userCredentials);
    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(response.body).toMatchObject({
      message: "Invalid fields",
      status: "error",
      statusCode: httpStatus.BAD_REQUEST,
      errors: {
        email: "This email is been used",
        username: "This usernmae is been used",
      },
    });
  });
});

//
//
// import { createApiServer } from "../../utils/server";
// import supertest from "supertest";
// import { prisma } from "../../core/db";
// import IUser from "../../interfaces/IUser";
// import { hashPassword } from "../../lib/auth.libs";
// import { response } from "express";

// const app = createApiServer();
// const request = supertest(app);
// beforeAll(async () => {
//   await prisma.$connect();
// });
// afterAll(async () => {
//   await prisma.user.deleteMany();
// });

// const userCredentials = {
//   email: "user@email.com",
//   username: "username",
//   password: "strong_password",
//   rePassword: "strong_password",
// };

// describe("user registraion", () => {
//   it("should create a user and return its credentials", async () => {
//     expect(1).toEqual(1);
//     const response = await request
//       .post("/api/accounts/register/")
//       .send(userCredentials);
//     console.log(response.status);
//   });
// });
