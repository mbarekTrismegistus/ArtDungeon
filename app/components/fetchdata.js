import prisma from "@/prisma/client";


export default async function Art() {
    
    let data = await prisma.art.findMany();
    
    return (

        <div>
            {data.map((e) => {
                return(
                    <div>
                        {e.title}
                    </div>
                )
            })}
        </div>
    )
}
