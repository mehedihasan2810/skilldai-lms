import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8, {message: "Password must contain at least 8 character(s)"}),
});
