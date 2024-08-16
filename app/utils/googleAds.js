"use client"


import React, { useEffect } from 'react'

export default function GoogleAds() {
    
    useEffect(() => {
        {window ? (adsbygoogle = window.adsbygoogle || []).push({}) : null}
    },[])
  return (
    <div>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1802898703606614"
        crossorigin="anonymous"></script>

        <ins class="adsbygoogle"
            data-ad-client="ca-pub-1802898703606614"
            data-ad-slot="1388364288"
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    </div>
  )
}
