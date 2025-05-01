import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  saveSession: z.boolean().default(true).optional(),
});

export type LoginFields = z.infer<typeof loginSchema>;
