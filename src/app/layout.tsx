"use client";
import React from "react";
import { ContextProvider } from "@/context/Context";
import { Josefin_Sans } from "next/font/google";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import "./globals.css";

const JosefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
        />
      </head>
      <body
        className={
          "bg-slate-950 text-white h-dvh" + " " + JosefinSans.className
        }
      >
        <ContextProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
