"use server";

import { test } from "@/lib/api/test";

export const testAction = async () => {
  const res = await test();
  return res;
};
