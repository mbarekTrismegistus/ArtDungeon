"use client"

import { signUp } from "../actions/auth"
import { useFormState } from "react-dom";
import { SubmitButton } from "../components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import handleGoogleAuth from "../actions/googleauth";

export default function SignUp() {

    const initialState = {

    }

    const [state, formAction] = useFormState(signUp, initialState)

    return (
        <form action={formAction} className="mt-[80px] container mx-auto w-[50%]">
            <div className="my-3">
                <Label>Username</Label>
                <Input name="username"/>
                {state?.errors?.username && <p className="text-red-500">{state.errors.username}</p>}
            </div>
            <div className="my-3">
                <Label>Email</Label>
                <Input name="email"/>
                {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
            </div>
            <div className="my-3">
                <Label>Password</Label>
                <Input name="password"/>
                {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
            </div>
            <GoogleLogin onSuccess={(c) => {
              handleGoogleAuth(c)
            }}
            type="icon"
            theme="outline"
            shape="pill"/>
            <SubmitButton>Sign Up</SubmitButton>
        </form>
    )
}
