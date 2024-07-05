"use server";

import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";


 
export default async function AddArt(prevState,formData) {

  if ((formData.get("title") === "")) {
    return { message: "Failed to create todo" };
  }


  try {
    let res = await prisma.art.create({
      data: {
        title: formData.get("title")
      }
    })
    if(res){
      revalidatePath("/")
      return {
        message: `Your Art : ${res.title} Added !`
      }
    }
  } 
  catch (error) {
    return {
      message: `error happened!${error}`
    }
  }


}

