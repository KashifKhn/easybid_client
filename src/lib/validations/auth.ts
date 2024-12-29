import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((value) => value.trim().length > 0, {
      message: "Password cannot be empty",
    }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .refine((value) => value.trim().length > 0, {
        message: "Name cannot be empty",
      }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .refine((value) => value.trim().length > 0, {
        message: "Password cannot be empty",
      }),
    confirmPassword: z.string(),
    role: z.enum(["BUYER", "SELLER"], {
      required_error: "Please select a role.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
