"use client"


import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'

export default function ArtCard() {
  return (
    <Card className='grow show' isFooterBlurred isHoverable={true}>
        <CardHeader className='p-3 pb-10 absolute z-10 card-header'>
          <p className='text-lg text-white font-bold'>Title</p>
        </CardHeader>
        <Image isBlurred height={"100%"} removeWrapper className="z-0 w-full show max-h-[300px] object-cover" src={`https://picsum.photos/${Math.round(Math.random() * 500)}/${Math.round(Math.random() * 500)}`}/>
        <CardFooter className="card-footer absolute bg-black/50 bottom-0 border-t-1 border-zinc-500/50 z-10 justify-between">
          <div>
            <p className="text-white text-tiny">Available soon.</p>
            <p className="text-white text-tiny">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
      </CardFooter>
    </Card>
  )
}
