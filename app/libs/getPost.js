import prisma from "@/prisma/client"

export default async function getPost() {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(5000);

    let res = await prisma.art.findUnique({
        where: {
            id: 54
        }
    })

  return res
}
