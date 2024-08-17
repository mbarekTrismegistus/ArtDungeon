import Art from "@/app/components/art"
import { Suspense } from "react"
import { db } from "@/app/db";
import { and, count, desc, eq } from "drizzle-orm";
import { art, comment, like } from "@/drizzle/schema";
import { getSession } from "@/app/libs/session";


export const revalidate = 0

export default async function page({params}) {

    let session = await getSession()


    let data = await db.query.art.findFirst({
        where: eq(art.id, Number(params.id)),
        with: {
            comment: {
                with: {
                    user: true,
                },
                orderBy: [desc(comment.commentedAt)],
                
            },
            user: true
        }
    })
    
    let Commentgroup = {}
    data.comment.forEach((c) => {
        Commentgroup[c.parrentId] ||= []
        Commentgroup[c.parrentId].push(c)
    })



    let likeNumber = await db.select({count: count()}).from(like).where(eq(like.artId, Number(params.id)))
    let countComment = await db.select({count: count()}).from(comment).where(eq(comment.artId, Number(params.id))) 

    let isLiked = session ? await db.select().from(like).where(and(
        eq(like.artId, Number(params.id)),
        eq(like.userId, session.user.id)
    ))
    :
    false


    return (
        
        <div className="mt-[80px]">
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1802898703606614"
            crossorigin="anonymous"></script>
            <Suspense fallback=" loading...">
                <Art data={data} comments={Commentgroup} likeCount={likeNumber[0].count} commentCount={countComment[0].count} isLiked={isLiked.length === 0 ? false : true} userId={session ? session.user.id : undefined}/>
            </Suspense>
        </div>
    )
}