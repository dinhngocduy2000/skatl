"use client";
import { testAction } from "@/actions/test";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ClientComponent = () => {
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () => testAction(),
  });
  return <div>{data}</div>;
};

export default ClientComponent;
