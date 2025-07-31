import Providers from "./utils/providers";
import Header from "./components/header";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./globals.css";
import { getSession } from "./libs/session";
import Script from 'next/script';

export const metadata = {
  title: "Art Dungeon",
  description: "A place in the wired for your art",
  other: {
    "ppck-ver": "93e9abb45b7fee127a0afe20863ba44d",
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <meta name="ppck-ver" content="bd70be61fde39fdbec1a8880fb7dd460" />
      <body className="dark:bg-zinc-950">
        <Providers>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              <Header session={session} />
              {children}
              <Script
                id="popcash-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
              var uid = '493271';
              var wid = '743910';
              var pop_fback = 'up';
              var pop_tag = document.createElement('script');
              pop_tag.src = '//cdn.popcash.net/show.js';
              document.body.appendChild(pop_tag);
              pop_tag.onerror = function() {
                pop_tag = document.createElement('script');
                pop_tag.src = '//cdn2.popcash.net/show.js';
                document.body.appendChild(pop_tag);
              };
            `,
                }}
              />
            </NextThemesProvider>
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  );
}
