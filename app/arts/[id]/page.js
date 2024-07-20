import Art from "@/app/components/art"
import { Suspense } from "react"
import { auth } from "@/app/auth";
import { db } from "@/app/db";
import { and, asc, eq } from "drizzle-orm";
import { art, comment, like } from "@/drizzle/schema";

export default async function page({params}) {

    let session = await auth()


    let data = await db.query.art.findFirst({
        where: eq(art.id, Number(params.id)),
        with: {
            comment: {
                with: {
                    user: true
                },
                orderBy: [asc(comment.commentedAt)]
            },
            user: true
        }
    })


    let isLiked = session ? await db.select().from(like).where(and(
        eq(like.artId, Number(params.id)),
        eq(like.userId, session.user.id)
    ))
    :
    false


    return (
        <div className="mt-[80px]">
            <Suspense fallback=" loading...">
                <Art data={data} isLiked={isLiked.length === 0 ? false : true} userId={session ? session.user.id : undefined}/>
            </Suspense>
        </div>
    )
}