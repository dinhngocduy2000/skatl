import { LoginFields } from "@/lib/schemas/login-schema";
import { AUTH_ENDPOINTS } from "@/lib/enum/endpoints";
import axiosConfig from "..";

export const handleLogin = async (
  credentials: LoginFields
): Promise<{
  access_token: string;
  token_type: string;
  expires_at: string;
}> => {
  return await axiosConfig.post(AUTH_ENDPOINTS.LOGIN, credentials);
};
