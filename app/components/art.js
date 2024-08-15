"use client"

import { Avatar, Button, Image, Textarea, Tooltip } from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react";
import { Like, unLike } from "../actions/like";
import { PiHeart } from "react-icons/pi";
import commentAction from "../actions/comments";
import { useFormState } from "react-dom";
import { FaRegComment } from "react-icons/fa6";
import { SubmitButton } from "./submitButton";
import CommentList from "./commentList";

export default function Art(props) {

    const initialState = {
        message: ""
    }

    let data = props.data
    const [isLiked, setIsLiked] = useState(props.isLiked)
    const [liking, setIsliking] = useState(false)
    const [state, formAction] = useFormState(commentAction, initialState)


    
    
    return (

        <div className="flex flex-col">
            <Carousel className="max-w-[70vw] mb-10 relative self-center">
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
            <div className="relative bg-light dark:bg-zinc-950">
                <div className='white absolute top-0 h-[1px] w-full bg-gradient-to-r from-zinc-800 from-10% via-teal-400 via-20% to-zinc-900 to-40% opacity-75'></div>
                
                <div className="px-10 pt-5">
                    <div className="flex mt-5">
                        <Avatar src={data.user.image} isBordered isFocusable className="w-20 h-20 me-4" color="primary"/>
                        <div>
                            <h1 className="text-4xl font-extrabold">{data.title}</h1>
                            <h1 className="my-2">By <span className="font-bold">{data.user.username}</span></h1>
                            <div className="flex gap-4">
                                <div className="flex items-center pt-5">
                        
                                    {props.userId ?
                                        <Button variant={`${isLiked ? "shadow" : "flat"}`} isDisabled={liking} color="primary" radius="full" isIconOnly className="flex items-center justify-center" onClick={
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
                                            <PiHeart size={25}/>
                                        </Button>
                                    :
                                    <Tooltip color="primary" content="Login First :)">
                                        <Button variant="flat" color="primary" radius="full" isIconOnly className="flex items-center justify-center ms-auto">
                                            <PiHeart size={25}/>
                                        </Button>
                                    </Tooltip>
                        
                                }
                                <p className="ms-4">{props.likeCount} likes</p>
                                </div>
                                <div className="flex items-center pt-5">
                                    <FaRegComment size={25}/>
                                <p className="ms-4">{props.commentCount} comments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
            <div className="pt-[70px] px-10  bg-light dark:bg-zinc-950">
                <h1 className="font-bold text-2xl">Comments</h1>
                <form action={formAction}>
                    <Textarea
                        isDisabled={props.userId ? false : true}
                        name="content"
                        color="primary"
                        variant="underlined"
                        label="Comment"
                        placeholder={props.userId ? "Entre your comment" : "login first"}
                        className="col-span-12 md:col-span-6 mb-6 mt-5"
                        endContent={props.userId && <SubmitButton>Comment</SubmitButton>}
                    />
                    <input type="hidden" name="artId" value={data.id}/>
                </form>
                <div>
                    {props.comments[null]?.length > 0 ?
                        <CommentList userId={props.userId} cg={props.comments} comments={props.comments[null]}/>
                    :
                    <p className="text-2xl font-bold text-center p-5 pb-[50px]">No Comment Yet</p>
                    }
                </div>
            </div>
        </div>
    )
}
