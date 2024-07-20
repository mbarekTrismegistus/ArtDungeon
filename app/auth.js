import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "./db"
import { eq } from "drizzle-orm"
import { users } from "@/drizzle/schema"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [Google],
  callbacks: {
    async signIn({user, account}){
        
        let isRegistred = await db.query.users.findFirst({
          where: eq(users.email, user.email)
        })
        

        if(!isRegistred){
            let res = await db.insert(users).values({
              email: user.email,
              image: user.image,
              username: user.name,
            }).returning()
            console.log(res)
            if(res){
                user.id = res[0].id
                return user
            }
        }
        else{
            user.id = isRegistred.id
            return user
        }

    },

    async jwt({user,session,token,trigger}) {
      if(trigger === "update"){
        token = session
      }
      if(user){
        return {
          ...token,
          id: user.id
        
        }
      }
      return token

    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id        
      }
      return session
    },
  }
})