"use client";
import { testAction } from "@/actions/test";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {};

const ClientComponent = (props: Props) => {
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () => testAction(),
  });
  return <div>{data}</div>;
};

export default ClientComponent;
