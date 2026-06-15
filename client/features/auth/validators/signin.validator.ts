
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;