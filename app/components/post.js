import prisma from "@/prisma/client";
import axios from "axios";


export default async function Art(props) {
    
    
    let data = (await axios.get(`https://dummyjson.com/users/${props.id}`)).data
    
    return (

        <div className="flex flex-wrap gap-7">
            {data.firstName}
        </div>
    )
}
