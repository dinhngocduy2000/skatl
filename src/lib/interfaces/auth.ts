import { z } from "zod";
import { SignupSchema } from "../schemas/signup-schema";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expired_at: string;
  refresh_token: string;
}

export type ISignUpParams = Omit<ISignupFields, "confirm_password">;

export type ISignupFields = z.infer<typeof SignupSchema>;
