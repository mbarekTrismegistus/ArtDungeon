"use client"

import { signUp } from "../actions/auth"
import { useFormState } from "react-dom";
import { SubmitButton } from "../components/submitButton";
import { Label } from "@/components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import handleGoogleAuth from "../actions/googleauth";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useFormStatus } from 'react-dom'

export default function SignUp() {

    const initialState = {

    }

    const [state, formAction] = useFormState(signUp, initialState)
    const [isValid, setIsValid] = useState({
        errors:{
            username: {
                isUnValid: undefined,
                msg: undefined
            },
            email: {
                isUnValid: undefined,
                msg: undefined
            },
            password: {
                isUnValid: undefined,
                msg: undefined
            }
        }
    })
    const { pending } = useFormStatus();

    function validate(e){
        if(e.target.value == ""){
            setIsValid((prev) => {
                return {
                    errors: {
                        ...prev.errors,
                        [e.target.name]: {
                            isUnValid: true,
                            msg: `Enter your ${e.target.name}`
                        }
                    }
                }
            })
        }
        else{
            setIsValid((prev) => {
                return {
                    errors: {
                        ...prev.errors,
                        [e.target.name]: {
                            isUnValid: false,
                            msg: null
                        }
                    }
                }
            })
        }
    }
    return (
        <form action={(formData) => {
            if(isValid.errors.username.isUnValid == false && isValid.errors.email.isUnValid == false && isValid.errors.password.isUnValid == false){
                formAction(formData)
            }
            else if(!isValid.errors.username.isUnValid && isValid.errors.username.isUnValid === undefined){
                setIsValid((prev) => {
                    return {
                        errors: {
                            ...prev.errors,
                            username: {
                                isUnValid: true,
                                msg: "enter your username"
                            }
                        }
                    }
                })
            }
            else if(!isValid.errors.email.isUnValid && isValid.errors.email.isUnValid === undefined){
                setIsValid((prev) => {
                    return {
                        errors: {
                            ...prev.errors,
                            email: {
                                isUnValid: true,
                                msg: "Enter your email"
                            }
                        }
                    }
                })
            }
            else if(!isValid.errors.password.isUnValid && isValid.errors.password.isUnValid === undefined){
                setIsValid((prev) => {
                    return {
                        errors: {
                            ...prev.errors,
                            password: {
                                isUnValid: true,
                                msg: "Enter your password"
                            }
                        }
                    }
                })
            }

        }} className="mt-[80px] container mx-auto w-[50%]">
            <div className="my-3">
                <Input label={"username"} errorMessage={isValid.errors.username.msg} isInvalid={isValid.errors.username.isUnValid} name="username" onChange={validate}/>
                {state?.errors?.username && <p className="text-red-500">{state.errors.username}</p>}
            </div>
            <div className="my-3">
                <Input label="Email" name="email" errorMessage={isValid.errors.email.msg} isInvalid={isValid.errors.email.isUnValid} onChange={validate}/>
                {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
            </div>
            <div className="my-3">
                <Input label="Password" name="password" errorMessage={isValid.errors.password.msg} isInvalid={isValid.errors.password.isUnValid} onChange={validate}/>
                {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
            </div>
            <GoogleLogin onSuccess={(c) => {
              handleGoogleAuth(c)
            }}
            type="icon"
            theme="outline"
            shape="pill"/>
            <Button isDisabled={pending} type="submit" color="primary">Login</Button>
        </form>
    )
}
