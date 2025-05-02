import { testAction } from "@/actions/test";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function HomePage() {
  const res = await testAction();
  return <div>{/* <Button onClick={testAction}>Click</Button> */}</div>;
}
