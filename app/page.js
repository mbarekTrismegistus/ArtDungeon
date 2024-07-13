import { Suspense } from "react";
import Art from "./components/fetchdata";
import Main from "./components/main";
import localFont from 'next/font/local'


const myFont = localFont({ src: '../public/Nexa-Heavy.ttf' })


export default function Home() {
  return (
    <div className={myFont.className}>
        <Main>
          <Suspense fallback="loading ....">
            <Art/>
          </Suspense>
        </Main>
    </div>
  );
}
