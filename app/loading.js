import { Image } from '@nextui-org/react'
import React from 'react'

export default function Loading(props) {
  return (
    <div className='flex items-center justify-center h-[100vh]'>
        <Image src='/lainspin.gif' width={200} height={200}/>
    </div>
  )
}
