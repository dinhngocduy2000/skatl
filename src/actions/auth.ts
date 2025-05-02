"use server";

import { handleLogin, refreshToken } from "@/lib/api/auth";
import { LoginFields } from "@/lib/schemas/login-schema";
import { AxiosError } from "axios";
import { setCookiesAction } from "./cookie";

export const loginAction = async (data: LoginFields) => {
  try {
    const res = await handleLogin(data);
    // Set the cookie
    setCookiesAction({ ...res, saveSession: data.saveSession });
    return {
      success: true,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      error: axiosError.message,
    };
  }
};
