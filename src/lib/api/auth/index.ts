import { LoginFields } from "@/lib/schemas/login-schema";
import { AUTH_ENDPOINTS } from "@/lib/enum/endpoints";
import axiosConfig from "..";
import { LoginResponse } from "@/lib/interfaces/auth";

export const handleLogin = async (
  credentials: LoginFields
): Promise<LoginResponse> => {
  return await axiosConfig.post(AUTH_ENDPOINTS.LOGIN, credentials);
};
