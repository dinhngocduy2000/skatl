import { testAction } from "@/actions/test";
import React from "react";

const HomePage = async () => {
  await testAction();
  console.log("CHECK RENDERING");
  return <div>HomePage</div>;
};

export default HomePage;
