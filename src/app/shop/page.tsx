"use client";
import React from "react";
import { useDataContext } from "@/context/Context";

export default function Shop() {
  const { setTitle } = useDataContext();
  React.useEffect(() => {
    setTitle("Shop");
  }, []);
  return <></>;
}
