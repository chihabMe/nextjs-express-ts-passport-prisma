import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Short password "),
});

export const registerationSchema = z
  .object({
    email: z.string().email("Invalid email"),
    username: z.string(),
    password: z.string().min(6, "Short password "),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
