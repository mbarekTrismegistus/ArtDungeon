import Providers from "./utils/providers";
import Header from "./components/header";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import "./globals.css"
import { getSession } from "./libs/session";




export const metadata = {
  title: "Art Dungeon",
  description: "A place in the wired for your art",
  other: {
    "ppck-ver": "bd70be61fde39fdbec1a8880fb7dd460",
  },
};

export default async function RootLayout({ children }) {

  const session = await getSession()

  return (
    
        <html lang="en">
          
          <meta name="ppck-ver" content="bd70be61fde39fdbec1a8880fb7dd460" />
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
