import ArtCard from "./card";
import { db } from "../db";


export default async function Arts() {
    
    
    let data = await db.query.art.findMany()
    
    return (

        <div className="flex flex-wrap gap-7">
            {data.map((e) => {
                return(
                    <ArtCard art={e} key={e.id}/>
                )
            })}
        </div>
    )
}
