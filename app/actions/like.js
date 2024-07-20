"use server"

import { db } from "../db";
import { like } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";




export async function Like(userId, artId){


    let res = await db.insert(like).values({
        artId: artId,
        userId: userId
    })
    return res


}

export async function unLike(userId, artId){

    
    let isLike = await db.select().from(like).where(and(
        eq(like.artId, artId),
        eq(like.userId, userId)
    ))

    if(isLike){
        let res = await db.delete(like).where(
            eq(like.id, isLike[0].id)
        )
        return res
    }



}