"use server"

import "server-only"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.AUTH_SECRET)

const cookie = {
    name: "session",
    options: {
        httpOnly: true,
        secure: true,
    },
    duration: 24 * 60 * 60 * 1000
}

export async function encrypt(payload){
    return new SignJWT(payload).setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key)
}

export async function decrypt(session){
    const { payload } = await jwtVerify(session, key, {
        algorithms: ['HS256']
    })

    return payload
}

export async function createSession(user){

    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({user, expires})

    cookies().set(cookie.name, session, {...cookie.options, expires})
    redirect("/")

}

export async function deleteSession(){
    cookies().delete(cookie.name)
    redirect("/")
}

export async function getSession(){
    const session = cookies().get("session")?.value
    if(!session) return null
    return await decrypt(session)
}