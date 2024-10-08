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
