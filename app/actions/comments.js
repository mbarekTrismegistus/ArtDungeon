"use server"

import prisma from "@/prisma/client";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export default async function comment(prevState, formData){
    
    let session = await auth()

    let res = await prisma.comment.create({
        data: {
            content: formData.get("content"),
            userId: session.user.id,
            artId: Number(formData.get("artId"))
        }
    })

    if(res){
        revalidatePath(`/arts/${formData.get("artId")}`)
        return {
            ...prevState,
            message: "done"
        }
    }

}