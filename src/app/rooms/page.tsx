"use client";
import React from "react";
import { useDataContext } from "@/context/Context";

export default function Rooms() {
  const { setTitle } = useDataContext();
  React.useEffect(() => {
    setTitle("Rooms");
  }, []);
  return <></>;
}
