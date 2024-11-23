import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});

export const forgotPasswordSchema = signInSchema.omit({ password: true });

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
  confirmPassword: z
    .string()
    .trim()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});
