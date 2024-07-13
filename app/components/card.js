"use client"


import React from 'react'
import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'

export default function ArtCard(props) {
  return (
    <Card className='grow show' isFooterBlurred isHoverable={true}>
        <CardHeader className='p-3 pb-10 absolute z-10 card-header'>
          <p className='text-lg text-white font-bold'>{props.art.title}</p>
        </CardHeader>
        <Image height={"100%"} removeWrapper className="z-0 w-full h-[270px] object-cover" src={props.art.media[0]}/>
        <CardFooter className="card-footer absolute bg-black/50 bottom-0 border-t-1 border-zinc-500/50 z-10 justify-between">
          <div>
            <p className="text-white text-tiny">{props.art.description}</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
      </CardFooter>
    </Card>
  )
}
