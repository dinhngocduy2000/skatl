import { LoginFields } from "@/lib/schemas/login-schema";
import apiConfig from "..";
import { AUTH_ENDPOINTS } from "@/lib/enum/endpoints";

export const handleLogin = async (
  credentials: FormData
): Promise<{
  access_token: string;
  token_type: string;
  expires_at: string;
}> => {
  return await apiConfig.post(AUTH_ENDPOINTS.LOGIN, credentials);
};
