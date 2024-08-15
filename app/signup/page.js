"use client"

import { signUp } from "../actions/auth"
import { useFormState } from "react-dom";
import { SubmitButton } from "../components/submitButton";

export default function SignUp() {

    const initialState = {

    }

    const [state, formAction] = useFormState(signUp, initialState)

    return (
        <form action={formAction} className="mt-[80px]">
            <input name="username"/>
            {state?.errors?.username && <p className="text-red">{state.errors.username}</p>}
            <input name="email"/>
            {state?.errors?.email && <p className="text-red">{state.errors.email}</p>}
            <input name="password"/>
            {state?.errors?.password && <p className="text-red">{state.errors.password}</p>}
            <SubmitButton/>
        </form>
    )
}
