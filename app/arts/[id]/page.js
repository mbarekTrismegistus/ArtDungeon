import Art from "@/app/components/art"
import { Suspense } from "react"
import prisma from "@/prisma/client";
import { auth } from "@/app/auth";

export default async function page({params}) {

    let session = await auth()


    let data = await prisma.art.findUnique({
        where: {
            id: Number(params.id)
        }
    });
    

    let isLiked = session ? await prisma.like.findFirst({
        where: {
            artId: Number(params.id),
            userId: session.user.id
        }
    })
    :
    false

    return (
        <div className="mt-[80px]">
            <Suspense fallback=" loading...">
                <Art data={data} isLiked={isLiked} userId={session ? session.user.id : undefined}/>
            </Suspense>
        </div>
    )
}