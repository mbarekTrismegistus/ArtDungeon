import Art from "@/app/components/art"
import { Suspense } from "react"
import { auth } from "@/app/auth";
import { db } from "@/app/db";
import { and, count, desc, eq, sql } from "drizzle-orm";
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
                orderBy: [desc(comment.commentedAt)],
                
            },
            user: true
        }
    })

    let likeNumber = await db.select({count: count()}).from(like).where(eq(like.artId, Number(params.id)))
    let countComment = await db.select({count: count()}).from(comment).where(eq(comment.artId, Number(params.id))) 
    console.log(countComment)

    let isLiked = session ? await db.select().from(like).where(and(
        eq(like.artId, Number(params.id)),
        eq(like.userId, session.user.id)
    ))
    :
    false


    return (
        <div className="mt-[80px]">
            <Suspense fallback=" loading...">
                <Art data={data} likeCount={likeNumber[0].count} commentCount={countComment[0].count} isLiked={isLiked.length === 0 ? false : true} userId={session ? session.user.id : undefined}/>
            </Suspense>
        </div>
    )
}