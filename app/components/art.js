"use client"

import { Button, Image, Tooltip } from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Heart } from "react-bootstrap-icons";
import { useState } from "react";
import { Like, unLike } from "../actions/like";


export default function Art(props) {



    let data = props.data
    const [isLiked, setIsLiked] = useState(props.isLiked)
    const [liking, setIsliking] = useState(false)
    
    return (

        <div className="container mx-auto flex flex-col ">
            <Carousel className="max-w-[70vw] relative self-center">
                <CarouselContent>
                    {data.media.map((p) => (
                        <CarouselItem key={data.media.indexOf(p)}>
                            <div className="flex justify-center p-1">
                                <Image src={p} className="mx-auto max-h-[50vh] max-w-[60vw]"/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="flex items-center max-w-[90vw] mx-auto">
                <div className="w-[100vw]">
                    <h1 className="text-5xl font-bold py-5">{data.title}</h1>
                    {data.description}
                </div>
                <div className="w-[20%]">
                    {props.userId ?
                        <Button variant={`${isLiked ? "shadow" : "flat"}`} isDisabled={liking} color="primary" radius="full" isIconOnly className="flex items-center justify-center ms-auto" onClick={
                            async () => {
                                if(!isLiked){
                                    setIsliking(true)
                                    let res = await Like(props.userId, data.id)
                                    if(res){
                                        setIsLiked(true)
                                        setIsliking(false)
                                    }
                                }
                                else{
                                    setIsliking(true)
                                    let res = await unLike(props.userId, data.id)
                                    if(res){
                                        setIsLiked(false)
                                        setIsliking(false)
                                    }
                                }
                            }
                        }>
                            <Heart size={25}/>
                        </Button>
                    :
                    <Tooltip color="primary" content="Login First :)">
                        <Button variant="flat" color="primary" radius="full" isIconOnly className="flex items-center justify-center ms-auto">
                            <Heart size={25}/>
                        </Button>
                    </Tooltip>
                    }
                </div>
            </div>
        </div>
    )
}
