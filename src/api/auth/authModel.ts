import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  faculty: z.string().min(1, "Faculty is required"),
  department: z.string().min(1, "Department is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const ForgetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const ResetPasswordSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterResponseSchema = z
  .object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
    faculty: z.string(),
    department: z.string(),
  })
  .strip();

export const LoginResponseSchema = z
  .object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
    faculty: z.string(),
    department: z.string(),
  })
  .strip();
