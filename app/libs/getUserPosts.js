export default async function getUserPosts(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    if(!res.ok) throw new Error("failed")

    return res.json()
}
