import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try{
        const client = await clientPromise;
        const db = client.db("stream_db");
        const posts = await db.collection("stream_db").find({}).toArray();

        res.json(posts);
    }catch(e){
        console.error(e);
        throw new Error(e).message;
    }
}