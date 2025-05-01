"use server";

import { cookies } from "next/headers";

export const getAccessTokenCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};
