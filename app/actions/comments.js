import prisma from "@/prisma/client";

export default async function comment(prevState, formData){
    let res = await prisma.comment.create({
        data: {
            content: formData.get("content")
        }
    })

    return {
        ...prevState,
        message: "done"
    }
}