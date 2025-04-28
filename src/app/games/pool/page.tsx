"use client";
import React from "react";
import Link from "next/link";

import { useDataContext } from "@/context/Context";

import poolCover from "@/assets/img/pool_cover.jpeg";
import pool from "@/assets/img/pool.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const gamesLvl = {
  id: "001",
  title: "8 Ball Pool",
  lvl: 11,
  adv: 65,
  rank: 1568,
  play: 80,
  won: 33,
};

export default function Pool() {
  const [foverite, setFavorite] = React.useState("");
  const [rank, setRank] = React.useState(1178);
  const poolImage: any = pool;

  const { title, setTitle } = useDataContext();
  React.useEffect(() => {
    setTitle("Pool");
  }, []);

  const handleFoverite = () => {
    if (foverite === "-fill text-blue-500") {
      setFavorite("");
    } else {
      setFavorite("-fill text-blue-500");
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-slate-950 z-50">
        <div className="flex w-full justify-between items-center p-4 border-b border-slate-800">
          <Link href={"/games"} className="flex items-center">
            <i className="ph-fill ph-caret-circle-left text-2xl"></i>
          </Link>
          <div>
            <h1>{title}</h1>
          </div>
          <div className="flex items-center">
            <i
              className={`ph${foverite} ph-heart text-2xl cursor-pointer`}
              onClick={() => handleFoverite()}
            ></i>
          </div>
        </div>
        <div
          className="h-40 overflow-hidden relative"
          style={{
            backgroundImage: `url(${poolCover.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div className="h-full w-full bg-gradient-to-t from-slate-950 to-transparent"></div>
          <div className="absolute top-0 right-0 bg-[#1e293b99] backdrop-blur-xs p-1 rounded-full m-2 flex items-center gap-1">
            <h3 className="text-sm pt-0.5 ml-2">Ranked Raiting:</h3>
            <span className="bg-sky-800 px-3 pt-1 rounded-full text-xs">
              {rank}
            </span>
            <i className="ph-fill ph-info text-2xl"></i>
          </div>
          <div className="absolute bottom-0 right-0 left-0">
            <div className="w-full flex justify-between items-center pb-2">
              <div className="w-[20%] p-4 flex justify-center items-center relative">
                <i className="ph-fill ph-star text-blue-500 text-5xl mr-[-5px] mb-[-5px]"></i>
                <span className="text-center absolute top-0 mt-8 ml-1">
                  {gamesLvl.lvl}
                </span>
              </div>
              <div className="w-[80%]">
                <div className="w-full flex justify-between items-center pr-2">
                  <h3>{gamesLvl.title}</h3>
                  <h3>Level {gamesLvl.lvl}</h3>
                </div>
                <div className="relative mr-2 mt-2 rounded-full overflow-hidden">
                  <div className="w-full h-8 bg-slate-600"></div>
                  <div
                    className={`w-[${gamesLvl.adv.toString()}%] h-8 bg-green-500 absolute top-0 left-0`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 px-4">
          <div>
            <Avatar className="w-[60px] h-[60px] relative overflow-visible">
              <AvatarImage
                className="border border-white rounded-full"
                src={poolImage}
              />
              <AvatarFallback className="text-slate-950 text-xs bg-slate-300">
                Pool
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <Link href={"/games/pool/play"} className="bg-green-500 py-2 px-5 rounded-full">Play</Link>
          </div>
        </div>
      </div>
    </>
  );
}
