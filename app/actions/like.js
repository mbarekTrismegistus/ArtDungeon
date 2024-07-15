"use server"

import prisma from "@/prisma/client";




export async function Like(userId, artId){


    let res = await prisma.like.create({
        data: {
            artId: artId,
            userId: userId
        }
    })
    return res


}

export async function unLike(userId, artId){
    
    let like = await prisma.like.findFirst({
        where: {
            userId: userId,
            artId: artId
        }
    })
    if(like){
        let res = await prisma.like.delete({
            where: {
                id: like.id
            }
        })
        return res
    }



}