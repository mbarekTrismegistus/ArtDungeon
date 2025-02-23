"use client"

import { Avatar, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import CommentList from './commentList'
import { Button } from '@/components/ui/button'
import { FaReply } from 'react-icons/fa6'
import { SubmitButton } from './submitButton'
import commentAction from '../actions/comments'
import { useFormState } from "react-dom";
import { Separator } from '@/components/ui/separator'
import { deleteComment } from '../actions/comments'
import { GoTrash } from "react-icons/go";

export default function Comment(props) {

    const initialState = {
      message: ""
    }

    let childComment = props.cg[props.comment.id]
    let [isHidden, setHidden] = useState(true)
    let [isReplyHidden, setReplyHidden] = useState(true)
    const [state, formAction] = useFormState(commentAction, initialState)

  return (
      <div className="flex flex-col gap-4 py-5" key={props.comment.id}>
        <div className='flex gap-4'>
          <Avatar src={props.comment.user.image} size="md"/>
          <div className='flex flex-col'>
            <div className='flex gap-4 items-center pb-5'>
              <div>
                  <p className="font-bold">{props.comment.user.username}</p>
                  {props.comment.content}
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <p onClick={() => setReplyHidden((prev) => {
                return prev ? false : true
              })} className='text-gray-500 hover:text-teal-500 text-sm cursor-pointer'>Show Replies {childComment?.length > 0 ? childComment?.length : "0"}</p>
              {props.userId ? 
                <>
                  <Separator orientation="vertical" className="bg-gray-500"/>
                  <div className='flex items-center gap-3 cursor-pointer text-gray-500 hover:text-teal-500' onClick={() => setHidden((prev) => {
                      return prev ? false : true
                    })}>
                    <FaReply className=''/>
                    <p className='text-sm'>Reply</p>
                  </div>
                  <Separator orientation="vertical" className="bg-gray-500"/>
                  <div className='text-gray-500 hover:text-red-500 cursor-pointer flex items-center gap-3' onClick={() => {
                    deleteComment(props.comment.id,props.comment.artId)
                  }}>
                    <GoTrash />
                    <p className='text-sm'>Delete </p>
                  </div>
                </>
                :
                null
              }
            </div>
            <form className={isHidden ? "hidden" : "flex"} action={formAction}>
              <Input variant='underlined' name='content' color='primary' className='pt-3'/>
              <input type='hidden' name='parentId' defaultValue={props.comment.id}/>
              <input type="hidden" name="artId" value={props.comment.artId}/>
              <SubmitButton>Reply</SubmitButton>
            </form>
          </div>
        </div>
        {childComment ? 
        <div className={isReplyHidden ? "hidden" : "flex flex-col ms-7"}>
            <CommentList userId={props.userId} cg={props.cg} comments={childComment}/>
        </div>
        :
        null
        }
    </div>
  )
}
