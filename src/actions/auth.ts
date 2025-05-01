"use server";

import { handleLogin } from "@/lib/api/auth";
import { COOKIE_KEYS } from "@/lib/enum/cookie-keys";
import { LoginFields } from "@/lib/schemas/login-schema";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export const loginAction = async (data: LoginFields) => {
  try {
    const res = await handleLogin(data);
    const cookieStore = await cookies();

    // Set the cookie
    cookieStore.set({
      name: COOKIE_KEYS.ACCESS_TOKEN,
      value: res.access_token,
      expires: data.saveSession ? new Date(res.expired_at) : undefined,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
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
