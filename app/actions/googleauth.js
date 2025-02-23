"use server"

import { users } from "@/drizzle/schema";
import { db } from "../db";
import { createSession } from "../libs/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";



export default async function handleGoogleAuth(jwt){


    let data = jwtDecode(jwt.credential)
    let username = data.name


    async function generateUU(un){
        let userExist = await db.query.users.findFirst({
            where: eq(users.username, username)
        })
        if(userExist){
            var a = Math.floor((Math.random() * 10) + 1);
            username = un + String(a)
            await generateUU(username)
        }
        else{
            return username
        }
    }


    let emailExist = await db.query.users.findFirst({
        where: eq(users.email, data.email)
    })

    if(emailExist){
        await createSession(emailExist)
        redirect("/")
    }
    else{
        res = await db.insert(users).values({
            email: data.email,
            username: await generateUU(data.name),
            image: data.image
        }).returning()

        const user = res[0]
        await createSession(user)
        redirect("/")
    }
    
}



