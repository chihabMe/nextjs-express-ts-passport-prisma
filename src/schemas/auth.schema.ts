import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

export const registerationSchema = z
  .object({
    email: z.string().email("Invalid email"),
    username: z.string(),
    password: z.string(),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password don't match",
    path: ["rePassword"],
  });
