"use server";

import { revalidatePath } from "next/cache";
import { imgbbUploader } from "imgbb-uploader";
import { db } from "../db";
import { art } from "@/drizzle/schema";
import { redirect } from "next/navigation";


 
export default async function AddArt(prevState,formData) {

  let media = formData.get("media").split(",")

  // if(media[0] === ""){
  //   return {
  //     noMedia: true,
  //     message: "C'mon add some images of ur beautiful art"
  //   }
  // }
  // console.log(formData)
  try {
    let res = await db.insert(art).values({
      title: formData.get("title"),
      description: formData.get("description"),
      media: media,
      userId: Number(formData.get("userId"))
    }).returning()
    if(res){
      return {
        ...prevState,
        message: `Your Art : ${res[0].title} Added !`,
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