"use server"


import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { comment } from "@/drizzle/schema";

export default async function commentAction(prevState, formData){
    
    let session = await auth()

    let res = await db.insert(comment).values({
        content: formData.get("content"),
        userId: session.user.id,
        artId: Number(formData.get("artId"))
    })

    if(res){
        revalidatePath(`/arts/${formData.get("artId")}`)
        return {
            ...prevState,
            message: "done"
        }
    }

}