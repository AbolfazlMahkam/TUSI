"use client";

import dynamic from "next/dynamic";

const Game = dynamic(() => import("@/components/games/Pool"), { ssr: false });

export default function Home() {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <Game />
    </div>
  );
}
