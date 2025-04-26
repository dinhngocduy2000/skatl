import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type LoginFields = z.infer<typeof loginSchema>;
