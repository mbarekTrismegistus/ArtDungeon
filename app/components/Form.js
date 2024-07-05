"use client"


import { Suspense } from "react";
import AddArt from "../actions/addArt"
import { SubmitButton } from "./submitButton"
import { useFormState } from "react-dom";

const initialState = {
    message: "",
}

export default function FormArt(props) {

    const [state, formAction] = useFormState(AddArt, initialState)

    return (
        <div>
            <form action={formAction}>
                <label>Title</label>
                <input name='title'/>
                <SubmitButton/>
            </form>
            <p aria-live="polite">
                {state?.message}
            </p>
            <div className="flex">
                <Suspense fallback="Loading ...">
                    {props.dataArt}
                </Suspense>
            </div>
        </div>
    )
}
