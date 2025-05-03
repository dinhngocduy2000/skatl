"use server";

import { handleLogin, signUp } from "@/lib/api/auth";
import { LoginFields } from "@/lib/schemas/login-schema";
import { AxiosError } from "axios";
import { setCookiesAction } from "./cookie";
import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/lib/enum/cookie-keys";
import { redirect } from "next/navigation";
import { ROUTE_PATH } from "@/lib/enum/route-path";
import { ISignUpParams } from "@/lib/interfaces/auth";

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

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);
  cookieStore.delete(COOKIE_KEYS.SAVE_SESSION);
  redirect(ROUTE_PATH.LOGIN);
};

export const signUpAction = async (params: ISignUpParams) => {
  try {
    await signUp(params);
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
