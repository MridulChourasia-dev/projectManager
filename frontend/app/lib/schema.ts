import { object, z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });


export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(8, { message: "Confirm password is required" }),
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  })


export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})