"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useDataContext } from "@/context/Context";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import cover from "@/assets/img/profile_cover.jpg";
import pool from "@/assets/img/pool.png";

const collections = [
  {
    id: "001",
    src: "",
    title: "collection 1",
  },
  {
    id: "002",
    src: "",
    title: "collection 2",
  },
  {
    id: "003",
    src: "",
    title: "collection 3",
  },
];
const gamesLvl = [
  {
    id: "001",
    src: pool,
    title: "8 Ball Pool",
    lvl: 11,
    adv: 65,
    rank: 1568,
    play: 80,
    won: 33,
  },
  {
    id: "002",
    src: "",
    title: "game 2",
    lvl: 1,
    adv: 0,
    rank: 2000,
    play: 0,
    won: 0,
  },
  {
    id: "003",
    src: "",
    title: "game 3",
    lvl: 1,
    adv: 0,
    rank: 2000,
    play: 0,
    won: 0,
  },
];

export default function Profile() {
  const { title, setTitle } = useDataContext();
  const [wins, setWins] = React.useState<number>(107);
  const [age, setAge] = React.useState<number>(954);
  const [balance, setBalance] = React.useState<number>(1500);
  const [gold, setGold] = React.useState<number>(120);
  const [collectionNumber, setCollectionNumber] = React.useState<number>(2);

  React.useEffect(() => {
    setTitle("Profile");
  }, []);

  // Edit Username
  const [openUsername, setOpenUsername] = React.useState(false);
  const [username, setUsername] = React.useState<string>("Username");
  const [tempUsername, setTempUsername] = React.useState<string>("Username");
  const isValidUsername = tempUsername.length >= 5 && tempUsername.length <= 12;
  const hasChangedUsername = tempUsername !== username;

  const handleCancelUsername = () => {
    setTempUsername(username);
    setOpenUsername(false);
  };
  const handleOkUsername = () => {
    if (isValidUsername && hasChangedUsername) {
      setUsername(tempUsername);
    }
    setOpenUsername(false);
  };

  // Edit Bio
  const [openBio, setOpenBio] = React.useState(false);
  const [bio, setBio] = React.useState<string>("Bio");
  const [tempBio, setTempBio] = React.useState<string>("Bio");
  const isValidBio = tempBio.length >= 0 && tempBio.length <= 50;
  const hasChangedBio = tempBio !== bio;

  const handleCancelBio = () => {
    setTempBio(bio);
    setOpenBio(false);
  };
  const handleOkBio = () => {
    if (isValidBio && hasChangedBio) {
      setBio(tempBio);
    }
    setOpenBio(false);
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-slate-950 z-50">
        <div className="flex w-full justify-between items-center p-4 border-b border-slate-800">
          <Link href={"/"} className="flex items-center">
            <i className="ph-fill ph-caret-circle-left text-2xl"></i>
          </Link>
          <div>
            <h1>{title}</h1>
          </div>
          <div className="flex items-center">
            <i className="ph-fill ph-gear text-2xl"></i>
          </div>
        </div>

        <div className="max-h-[92dvh] overflow-y-scroll">
          <div className="w-full max-h-40 overflow-hidden relative">
            <Image src={cover} alt="Cover" className="z-40" />
            <i className="ph-fill ph-plus text-blue-500 text-xl absolute bottom-0 right-0 m-1"></i>
          </div>

          <div className="flex flex-col justify-center items-center mt-[-50px] pb-5">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-slate-950">
                  Avatar
                </AvatarFallback>
              </Avatar>
              <i className="ph-fill ph-plus-circle text-blue-500 text-xl bg-white rounded-full absolute bottom-0 right-0 m-1.5"></i>
            </div>
            <div className="mt-2 flex justify-center items-start gap-1">
              <h2 className="mb-1">{username}</h2>
              <Dialog open={openUsername} onOpenChange={setOpenUsername}>
                <DialogTrigger className="mt-1">
                  <i className="ph-fill ph-pencil-simple-line text-blue-500 cursor-pointer"></i>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-0">
                  <DialogHeader>
                    <DialogTitle>Change TUSI ID</DialogTitle>
                    <Input
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      placeholder="Enter new username"
                    />
                    <Button
                      className="bg-blue-700 hover:bg-blue-500 w-full"
                      onClick={handleOkUsername}
                      disabled={!hasChangedUsername || !isValidUsername}
                    >
                      OK
                    </Button>
                    <Button
                      className="bg-blue-700 hover:bg-blue-500 w-full"
                      onClick={handleCancelUsername}
                    >
                      CANCEL
                    </Button>
                    <div className="flex justify-around gap-2 mt-3"></div>
                    {!isValidUsername && (
                      <p className="text-red-500 text-sm mt-2">
                        Username must be 5–12 characters long.
                      </p>
                    )}
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-2">
              <Dialog open={openBio} onOpenChange={setOpenBio}>
                <DialogTrigger className="bg-slate-600 rounded-xl p-2 w-60 min-h-10">
                  <h3>{bio}</h3>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-0">
                  <DialogHeader>
                    <DialogTitle>Change ypur BIO</DialogTitle>
                    <Input
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      placeholder="Enter your Bio"
                    />
                    <div className="flex gap-2 mt-3">
                      <Button
                        className="bg-blue-700 hover:bg-blue-500"
                        onClick={handleOkBio}
                        disabled={!hasChangedBio || !isValidBio}
                      >
                        OK
                      </Button>
                      <Button
                        className="bg-blue-700 hover:bg-blue-500"
                        onClick={handleCancelBio}
                      >
                        CANCEL
                      </Button>
                    </div>
                    {!isValidBio && (
                      <p className="text-red-500 text-sm mt-2">
                        Bio must be 0–50 characters long.
                      </p>
                    )}
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex justify-center items-center gap-2 mt-5">
              <div className="text-center w-28">
                <h2 className="text-slate-700">WINS</h2>
                <h1>{wins}</h1>
              </div>
              <div className="bg-slate-600 min-w-0.5 min-h-10"></div>
              <div className="text-center w-28">
                <h2 className="text-slate-700">TUSI AGE</h2>
                <h1>{age} d</h1>
              </div>
            </div>
            <div className="flex justify-center mt-5 gap-2">
              <div className="flex justify-center items-center gap-1">
                <i className="ph-fill ph-money text-green-700 text-2xl"></i>
                <h3>{balance.toLocaleString()}</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <i className="ph-fill ph-plus-circle rounded-full text-green-500 text-3xl"></i>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-0 pt-14 gap-0">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-center">
                        <span className="text-sm text-slate-600 mr-5">
                          My Ckash
                        </span>
                        <i className="ph-fill ph-money text-green-700 text-2xl mb-0.5 mr-1"></i>
                        {balance.toLocaleString()}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-between border-t border-slate-700 pt-3 pb-2 mt-2">
                      <div className="flex justify-start items-center gap-1">
                        <h2>1,000</h2>
                        <i className="ph-fill ph-money text-green-700 text-2xl mb-0.5"></i>
                      </div>
                      <div>
                        <h2 className="text-blue-500">1 USD</h2>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-3 pb-2">
                      <div className="flex justify-start items-center gap-1">
                        <h2>5,500</h2>
                        <i className="ph-fill ph-money text-green-700 text-2xl mb-0.5"></i>
                      </div>
                      <div>
                        <h2 className="text-blue-500">5 USD</h2>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-3 pb-2">
                      <div className="flex justify-start items-center gap-1">
                        <h2>12,500</h2>
                        <i className="ph-fill ph-money text-green-700 text-2xl mb-0.5"></i>
                      </div>
                      <div>
                        <h2 className="text-blue-500">11 USD</h2>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-3 pb-2">
                      <div className="flex justify-start items-center gap-1">
                        <h2>35,000</h2>
                        <i className="ph-fill ph-money text-green-700 text-2xl mb-0.5"></i>
                      </div>
                      <div>
                        <h2 className="text-blue-500">32 USD</h2>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-3 pb-2">
                      <div className="flex justify-start items-center gap-1">
                        <h2>85,000</h2>
                        <i className="ph-fill ph-money text-green-700 text-2xl mb-0.5"></i>
                      </div>
                      <div>
                        <h2 className="text-blue-500">81.50 USD</h2>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-3 pb-2">
                      <div className="flex justify-start items-center gap-1">
                        <h2>200,000</h2>
                        <i className="ph-fill ph-money text-green-700 text-2xl mb-0.5"></i>
                      </div>
                      <div>
                        <h2 className="text-blue-500">199 USD</h2>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex justify-center items-center gap-1">
                <i className="ph-fill ph-coin text-yellow-500 text-2xl"></i>
                <h3>{gold.toLocaleString()}</h3>
                <i className="ph-fill ph-plus-circle rounded-full text-green-500 text-3xl"></i>
              </div>
              <div className="flex justify-center items-center gap-1">
                <i className="ph-fill ph-cardholder bg-blue-500 text-xl py-0.5 px-1.5 rounded"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 w-full py-4">
            <div className="flex justify-between items-center px-2 mb-2">
              <h2 className="text-sm text-slate-600">MY COLLECTION</h2>
              <h2 className="text-sm text-slate-600">
                ({collectionNumber}/1200)
              </h2>
            </div>
            <div className="flex justify-start items-center overflow-x-scroll px-1">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="bg-slate-950 rounded-lg flex flex-col justify-around items-center p-2 w-24 h-24 mx-1"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={collection.src} />
                    <AvatarFallback className="text-slate-950 text-xs bg-slate-300">
                      Collection
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-sm">{collection.title}</h2>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            {gamesLvl?.map((gameLvl) => (
              <div
                key={gameLvl.id}
                className="w-full border-t border-b border-slate-800 flex justify-between items-center"
              >
                <div className="w-[20%] p-4">
                  <Avatar className="w-[100%] h-[100%] relative overflow-visible">
                    <AvatarImage
                      className="border border-white rounded-full"
                      src={
                        typeof gameLvl.src === "string"
                          ? gameLvl.src
                          : gameLvl.src?.src
                      }
                    />
                    <AvatarFallback className="text-slate-950 text-xs bg-slate-300">
                      Game
                    </AvatarFallback>
                    <i className="ph-fill ph-star text-blue-500 text-4xl absolute bottom-0 right-0 mr-[-5px] mb-[-5px]"></i>
                    <span className="absolute bottom-0 right-0 mr-2 mb-[-3px] text-center">
                      {gameLvl.lvl}
                    </span>
                  </Avatar>
                </div>
                <div className="w-[80%]">
                  <div className="w-full flex justify-between items-center pr-2">
                    <h3>{gameLvl.title}</h3>
                    <h3>Level {gameLvl.lvl}</h3>
                  </div>
                  <div className="relative mr-2 mt-2 rounded-full overflow-hidden">
                    <div className="w-full h-8 bg-slate-600"></div>
                    <div
                      className={`w-[${gameLvl.adv.toString()}%] h-8 bg-green-500 absolute top-0 left-0`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
