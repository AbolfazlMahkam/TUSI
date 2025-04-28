"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useDataContext } from "@/context/Context";

import poolCover from "@/assets/img/pool_cover.jpeg";

export default function Games() {
  const { setTitle } = useDataContext();
  React.useEffect(() => {
    setTitle("Game");
  }, []);
  return (
    <>
      <div className="mt-14 p-2">
        <Link href={"/games/pool"} className="rounded-lg shadow-lg">
          <Image src={poolCover} alt="pool-cover" className="rounded-xl" />
        </Link>
      </div>
    </>
  );
}
