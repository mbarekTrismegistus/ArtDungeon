// import prisma from "@/prisma/client"

// export default async function getPost() {

//     function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }
//     await sleep(5000);

//     let res = await prisma.art.findUnique({
//         where: {
//             id: 54
//         }
//     })

//   return res
// }


export default async function GetUsers() {

    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    if(!res.ok){
        throw new Error("failed")
    }

    return res.json()
}

