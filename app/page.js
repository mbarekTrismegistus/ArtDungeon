import { Suspense } from "react";
import Arts from "./components/fetchdata";
import Main from "./components/main";
import localFont from 'next/font/local'


const myFont = localFont({ src: '../public/Nexa-Heavy.ttf' })
export const revalidate = 0


export default function Home() {
  return (
    <div className={myFont.className}>
        <Main>
          <Suspense fallback="loading ....">
            <Arts/>
          </Suspense>
        </Main>
        
    </div>
  );
}
