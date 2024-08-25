"use client";

import { type ReactNode } from 'react'


import BottomMenu from "@/components/menu/BottomMenu";
import PostPopups from "@/components/modals/PostPopups";
import NavBar from "@/components/navbar/NavBar";
import Preloader from "@/components/preloader/Preloader";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Wallet & Providers */
import { Providers } from '../contracts/providers'



// modal video
import "node_modules/react-modal-video/scss/modal-video.scss";

//slick
import "slick-carousel/slick/slick.css";

//custon
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import "../styles/globals.scss";

export default function RootLayout({
  children,
}: {
  Component: any;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let clss = "";
  pathname !== "/index-two" ? (clss = "container") : (clss = "container-fluid");

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="description" content="Edufy" />
        <title>Edufy - Learn & Challange</title>
        <link rel="icon" href="/fav.png" />
      </head>
      <body>
      <Providers autoConnect>
            <ThemeProvider attribute="class" enableSystem={true}>
              <Preloader />
              <ScrollToTop />
              <NavBar clss={clss} />
              <BottomMenu />
              {children}
              <PostPopups />
            </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
