import prisma from "@/prisma/client";
import ArtCard from "./card";


export default async function Art() {
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(5000);
    
    let data = await prisma.art.findMany();
    
    return (

        <div className="flex flex-wrap gap-7">
            {data.map((e) => {
                return(
                    <ArtCard art={e}/>
                )
            })}
        </div>
    )
}
