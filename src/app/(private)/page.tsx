import { testAction } from "@/actions/test";
import React from "react";

export default async function HomePage() {
  const res = await testAction();
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
