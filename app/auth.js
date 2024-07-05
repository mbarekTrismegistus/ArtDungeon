import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/prisma/client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({user, account}){
        let isRegistred = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })
        if(!isRegistred){
            let res = await prisma.user.create({
                data: {
                    email: user.email,
                    image: user.image,
                    username: user.name,
                }
            })
            if(res){
                return user
            }
        }
        else{
            return user
        }
    }
  }
})