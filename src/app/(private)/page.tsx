import { test } from "@/lib/api/test";
import React from "react";

export default async function HomePage() {
  const res = await test();
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
