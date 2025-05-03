import { LoginFields } from "@/lib/schemas/login-schema";
import { AUTH_ENDPOINTS } from "@/lib/enum/endpoints";
import axiosConfig from "..";
import { LoginResponse } from "@/lib/interfaces/auth";

export const handleLogin = async (
  credentials: LoginFields
): Promise<LoginResponse> => {
  return await axiosConfig.post(AUTH_ENDPOINTS.LOGIN, credentials);
};

export const refreshToken = async (params: {
  token: string;
}): Promise<LoginResponse> => {
  return await axiosConfig.post(AUTH_ENDPOINTS.REFRESH_TOKEN, params);
};
