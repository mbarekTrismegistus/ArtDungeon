"use server"


import { revalidatePath } from "next/cache";
import { db } from "../db";
import { comment } from "@/drizzle/schema";
import { getSession } from "../libs/session";
import { eq } from "drizzle-orm";

export default async function commentAction(prevState, formData){
    
    let session = await getSession()

    let res = await db.insert(comment).values({
        content: formData.get("content"),
        userId: session.user.id,
        artId: Number(formData.get("artId")),
        parrentId: Number(formData.get("parentId")) || null
    })

    if(res){
        revalidatePath(`/arts/${formData.get("artId")}`)
        return {
            ...prevState,
            message: "done"
        }
    }

}

export async function deleteComment(id, artId){
    let res = await db.delete(comment).where(eq(comment.id, id))

    if(res){
        revalidatePath(`/arts/${artId}`)
        return {
            message: "done"
        }
    }
}