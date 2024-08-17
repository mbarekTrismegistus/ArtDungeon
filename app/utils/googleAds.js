"use client"


import React, { useEffect } from 'react'

import { Adsense } from "@ctrl/react-adsense";
import Script from 'next/script';

export default function GoogleAds() {
  return (
      <>
        <Adsense
          client="ca-pub-1802898703606614"
          slot="2935048543"
          style={{ display: "block" }}
          format="auto"
        />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1802898703606614"
        crossorigin="anonymous"></Script>
      </>
   
  );
}

