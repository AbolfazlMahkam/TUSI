"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type DataContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const Context = createContext<DataContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("TUSI");
  return (
    <Context.Provider value={{ title, setTitle }}>{children}</Context.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useDataContext must be used within a ContextProvider");
  return context;
};
