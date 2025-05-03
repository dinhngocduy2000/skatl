import { z } from "zod";
import { REGEX_PASSWORD } from "../enum/regex";

export const SignupSchema = z
  .object({
    username: z.string().min(1, "Required"),
    email: z.string().email().min(1, "Required"),
    password: z
      .string()
      .regex(
        REGEX_PASSWORD,
        "Password must contain atleast 1 lowercase character, 1 uppercase character, 1 number and 1 special character"
      ),
    confirm_password: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password in both fields dont match",
    path: ["confirm_password"],
  });
