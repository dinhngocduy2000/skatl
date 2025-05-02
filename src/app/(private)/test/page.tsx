import { testAction } from "@/actions/test";
import React from "react";

type Props = {};

const TestPage = async (props: Props) => {
  const res = await testAction();
  return <div>TestPage</div>;
};

export default TestPage;
