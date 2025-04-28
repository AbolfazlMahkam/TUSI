"use client";
import Link from "next/link";
import { useDataContext } from "../context/Context";

export default function Header() {
  const { title } = useDataContext();
  const onlinePlayers = 123456;

  return (
    <>
      <header className="fixed top-0 right-0 left-0 p-4 border-b border-slate-800 bg-slate-950">
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <Link href="/profile" className=" flex items-center">
              <i className="ph-fill ph-user-circle text-2xl"></i>
            </Link>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <h1>{title}</h1>
          </div>
          <div className="col-span-1 flex justify-end items-center gap-1">
            <span className="block rounded-full bg-green-500 w-2 h-2"></span>
            <span className="text-slate-400 text-xs">{onlinePlayers}</span>
            <i className="ph-fill ph-users"></i>
          </div>
        </div>
      </header>
    </>
  );
}
