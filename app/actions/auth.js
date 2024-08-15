"use server"

import { users } from "@/drizzle/schema";
import { db } from "../db";
import { createSession } from "../libs/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";


export async function signUp(state, formData){

    let res


    let emailExist = await db.query.users.findFirst({
        where: eq(users.email, formData.get("email"))
    })



    let userExist = await db.query.users.findFirst({
        where: eq(users.username, formData.get("username"))
    })

    if(emailExist){
        return{
            errors: {
                email: "email already exist"
            }
        }
    }
    if(userExist){
        return{
            errors: {
                username: "username already exist"
            }
        }
    }

    if(!emailExist && !userExist){
        res = await db.insert(users).values({
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password"),
        }).returning()

        const user = res[0]
        await createSession(user)
    }
    else{
        return {
            "error": "user already exists"
        }
    }

}


export async function logIn(state, formData){

    let userExist = await db.query.users.findFirst({
        where: eq(users.username, formData.get("username"))
    })

    if(userExist){
        await createSession(userExist)
        redirect("/")
    }
    else{
        return {
            error: "Username or password are incorrect :("
        }
    }

}