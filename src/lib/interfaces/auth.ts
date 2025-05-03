import { z } from "zod";
import { SignupSchema } from "../schemas/signup-schema";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expired_at: string;
  refresh_token: string;
}

export type ISignUpParams = Omit<
  z.infer<typeof SignupSchema>,
  "confirm_password"
>;
