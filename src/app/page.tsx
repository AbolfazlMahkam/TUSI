"use client";
import React from "react";

import { useDataContext } from "@/context/Context";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const { setTitle } = useDataContext();
  React.useEffect(() => {
    setTitle("TUSI");
  }, []);
  return (
    <>
      <Tabs defaultValue="feed" className="min-w-full mt-14">
        <TabsList className="w-full bg-slate-950 h-12">
          <TabsTrigger
            className="text-white text-[10px] data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            value="feed"
          >
            FEED
          </TabsTrigger>
          <TabsTrigger
            className="text-white text-[10px] data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            value="news"
          >
            NEWS
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <div></div>
        </TabsContent>
        <TabsContent value="news">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
