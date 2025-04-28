"use client";
import React from "react";
import { useDataContext } from "@/context/Context";

export default function People() {
  const { setTitle } = useDataContext();
  React.useEffect(() => {
    setTitle("People");
  }, []);
  return <></>;
}
