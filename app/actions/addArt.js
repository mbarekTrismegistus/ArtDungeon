"use server";

import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { imgbbUploader } from "imgbb-uploader";


 
export default async function AddArt(prevState,formData) {

  let media = formData.get("media").split(",")

  if(media[0] === ""){
    return {
      noMedia: true,
      message: "C'mon add some images of ur beautiful art"
    }
  }

  try {
    let res = await prisma.art.create({
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        media: media,
        user_id: Number(formData.get("userId"))
      }
    })
    if(res){
      revalidatePath("/")
      return {
        ...prevState,
        message: `Your Art : ${res.title} Added !`,
        discErrorMessage: "A Description is Required",
        noDescription: false,
        titleErrorMessage: "A Title is Required",
        noTitle: false
      }
    }
  } 
  catch (error) {
    return {
      ...prevState,
      message: `error happened!${error}`
    }
  }


}

export async function uploadMedia(data){

  let res = await Promise.all(

    data.map( async (file) => {
      
      let base = file.substr(file.indexOf(',') + 1);
    
      const options = {
        apiKey: process.env.IMGBB_API_KEY,
      
        base64string: base
      };

      try {
        let res = await imgbbUploader(options)
        return res.url
      } catch (error) {
        console.log(error)
        return "error happened try again please"
      }
      
 
    })
  )

  return res
}