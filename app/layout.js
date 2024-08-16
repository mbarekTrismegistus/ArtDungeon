import Providers from "./utils/providers";
import Header from "./components/header";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import "./globals.css"
import { getSession } from "./libs/session";


export const metadata = {
  title: "Art Dungeon",
  description: "A place in the wired for your art",
};

export default async function RootLayout({ children }) {

  const session = await getSession()

  return (
    
        <html lang="en">
          <head>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1802898703606614"
            crossOrigin="anonymous"></script>
          </head>
          <body className="dark:bg-zinc-950">
            <Providers>
              <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                  <Header session={session}/>
                  {children}
                </NextThemesProvider>
              </NextUIProvider>
            </Providers>
          </body>
        </html>
    
  );
}
