"use client"


import { Button, Card, CardBody, CardHeader, Image, Input, Skeleton, Spinner, Textarea, image } from "@nextui-org/react";
import AddArt, { uploadMedia } from "../actions/addArt"
import { SubmitButton } from "./submitButton"
import { useFormState } from "react-dom";
import { useState } from "react";
import { Images, PlusCircle } from "react-bootstrap-icons";
import { TagInput } from "emblor";
import { useFormStatus } from 'react-dom'

const initialState = {
    noMedia: false,
    message: ""
}


export default function FormArt(props) {

    const [state, formAction] = useFormState(AddArt, initialState)
    const [fileUploading, setUploading] = useState(false)
    const [images, setImages] = useState([])
    const [curImage, setCurImage] = useState(0)
    const [validated, setValidated] = useState({})
    const [tags, setTags] = useState([]);
    const [activeTagIndex, setActiveTagIndex] = useState(null);
    const { pending } = useFormStatus();

    let session = props.session

    function validate(e){
            if(e.target.value === ""){
                setValidated((prev) => {
                    return {
                        ...prev,
                        [e.target.name]: {
                            isInvalid: true,
                            msg: `Please enter a ${[e.target.name]}`
                        }
                    }
                })
            }
            else{
                setValidated((prev) => {
                    return {
                        ...prev,
                        [e.target.name]: {
                            isInvalid: false,
                            msg: ""
                        }
                    }
                })
            }
        }
    
    function isValid(){
        if(validated.title?.isInvalid || validated.title?.isInvalid === undefined){
            setValidated((prev) => {
                return {
                    ...prev,
                    title: {
                        isInvalid: true,
                        msg: `Please enter a title`
                    }
                }
            })
            return false
        }
        else if(validated.description?.isInvalid || validated.title?.isInvalid === undefined){
            setValidated((prev) => {
                return {
                    ...prev,
                    description: {
                        isInvalid: true,
                        msg: `Please enter a description`
                    }
                }
            })
            return false
        }
        else {
            return true
        }
    }


    function getBase64(file, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }


    return (
        <div>
            <Card className="min-h-[400px] max-h-[500px] mb-[50px] mx-auto bg-gradient-to-r dark:from-zinc-950 dark:to-zinc-900 from-slate-50 to-slate-200 border-1 border-zinc-900">
                <span className='white absolute h-[1px] w-full bg-gradient-to-r from-zinc-800 from-10% via-zinc-400 via-30% to-zinc-800 to-50% dark:opacity-100'></span>
                <CardBody className="p-7">
                    <div className="flex gap-4">
                        <div className={`w-[33%] flex ${images.length == 0 ? state.noMedia ? "bg-zinc-950 justify-center border border-1 rounded-xl border-red-500" : "bg-zinc-950 justify-center border border-1 rounded-xl border-teal-500" : "flex-col"}`}>
                            {images.length == 0 ?
                            <div className="flex items-center justify-center">
                                <Button color={`${state.noMedia ? "danger" : "primary"}`} className={`${images.length == 0 ? "text-center mx-auto my-5" : "hidden"}`} size="lg" variant="flat" radius="full" isDisabled={fileUploading}>
                                    <label htmlFor="media" className="input-media flex items-center gap-4">Add Media
                                        {fileUploading ? 
                                            <Spinner/>
                                            :
                                            <Images size={30}/>
                                        }
                                    </label>
                                </Button>
                                <input type="file" id="media" name="media" className="hidden" multiple onChange={async(e) => {
                                    setUploading(true)
                                    let res = await Promise.all(
                                        [...e.target.files].map(async (f) => {
                                            let base = await getBase64(f)
                                            return base
                                        })
                                    )
                                    let urls = await uploadMedia(res)
                                    if(urls.length > 0){
                                        console.log(urls)
                                        setUploading(false)
                                        setImages([...images, ...urls])
                                    }
                                }}/>
                            </div>
                            :

                            <>
                                <Image src={images[curImage]} className="max-h-[300px] self-center mx-auto" classNames={{wrapper: "self-center"}} isBlurred/>
                                <div className="flex gap-2 my-4 flex-wrap items-center">
                                    {images?.map((e) => {
                                        return(
                                            <Image src={e} key={images.indexOf(e)} radius="sm" className="w-[60px] h-[60px]" onClick={() => setCurImage(images.indexOf(e))}/>
                                        )
                                    })}
                                    <Button color="primary" className={`${images.length == 0 ? "hidden" : "text-center my-5"}`} isIconOnly size="lg" variant="flat" radius="full" isDisabled={fileUploading}>
                                        <label htmlFor="media" className="input-media flex items-center">
                                            {fileUploading ? 
                                                <Spinner/>
                                            :
                                                <PlusCircle size={20}/>
                                            }
                                        </label>
                                    </Button>
                                    <input type="file" id="media" name="media" className="hidden" multiple onChange={async(e) => {
                                        setUploading(true)
                                        let res = await Promise.all(
                                            [...e.target.files].map(async (f) => {
                                                let base = await getBase64(f)
                                                return base
                                            })
                                        )
                                        let urls = await uploadMedia(res)
                                        if(urls.length > 0){
                                            setUploading(false)
                                            setImages([...images, ...urls])
                                        }
                                }}/>
                                </div>
                            </>
                                
                            }
                        </div>
                        <div className="flex-1 py-3">
                            <form action={(formadata) => {
                                let isvalide = isValid()
                                if(isvalide){
                                    formAction(formadata)
                                }
                            }}>
                                <Input name="title" isInvalid={validated.title?.isInvalid} errorMessage={validated.title?.msg}  onChange={validate} label="Title" className="mb-5" placeholder="Add a Title"/>
                                <Textarea name="description" isInvalid={validated.description?.isInvalid} errorMessage={validated.description?.msg} onChange={validate} label="Description" className="mb-5" placeholder="Describe Your Piece Art !"/>
                                <input type="hidden" name="media" value={images}/>
                                <input type="hidden" value={session.user.id} name="userId"/>
                                <TagInput 
                                    setTags = {(newTags) => {setTags(newTags)}}
                                    tags={tags}
                                    placeholder = "Add tags"
                                    activeTagIndex = {activeTagIndex}
                                    setActiveTagIndex = {setActiveTagIndex}
                                    shape = {
                                        "pill"
                                    }
                                    animation = {
                                        "fadeIn"
                                    }
                                    size={"lg"}
                                />
                                <Button color='primary' type="submit" radius='full' className='mt-5' isDisabled={pending}>
                                    Add
                                </Button>
                            </form>
                            <p>{state?.message}</p>
                        </div>
                    </div>
                    
                </CardBody>
            </Card>
        </div>
        
    )
}
