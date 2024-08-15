"use client"

import { useFormState } from "react-dom";
import { SubmitButton } from "../components/submitButton";
import { logIn } from "../actions/auth";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GoogleLogin } from "@react-oauth/google";
import handleGoogleAuth from "../actions/googleauth";



export default function Login() {

    const initialState = {

    }

    const [state, formAction] = useFormState(logIn, initialState)

  return (
    <div className="pt-[80px] md:max-w-[50%] max-w-[90%] mx-auto">
        <form action={formAction}>
            <Input name="username" className="my-5"/>
            <Input name="password" className="my-5"/>
            <Separator className="mt-10"/>
            <GoogleLogin onSuccess={(c) => {
              handleGoogleAuth(c)
            }}
            type="icon"
            theme="outline"
            shape="pill"/>
            <SubmitButton>Login</SubmitButton>
        </form>
    </div>
  )
}
