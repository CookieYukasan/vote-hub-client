import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(36, { message: "Password must be at most 36 characters long" }),
});

export const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(36, { message: "Password must be at most 36 characters long" }),
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(36, { message: "Password must be at most 36 characters long" }),
});
