"use server";

import { refreshToken } from "@/lib/api/auth";
import { setCookiesAction } from "./cookie";
import { AxiosError } from "axios";

export const refreshTokenAction = async (
  params: { token: string },
  saveSession?: boolean
) => {
  try {
    const res = await refreshToken(params);
    console.log(`CHECK RES REFRESH TOKEN: ${res.access_token}`);
    // Set the cookie
    return {
      success: true,
      data: res,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      error: axiosError.message,
    };
  }
};
