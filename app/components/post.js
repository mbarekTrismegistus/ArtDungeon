import prisma from "@/prisma/client";


export default async function Art() {
    
    
    let data = await prisma.art.findUnique({
        where: {
            id: 54
        }
    });
    
    return (

        <div className="flex flex-wrap gap-7">
            {data.description}
        </div>
    )
}
