import clientPromise from "../../lib/mongodb";

export default async (req, res)=>{
    try{
        const client = await clientPromise;
        const db = client.db('stream_db');
        const {title, content}=req.body;
        const post = await db.collection('stream_db').insertOne(
            {
                title,
                content,
            }
        );
        res.json(post);
    }catch(e){
        console.error(e);
        throw new Error(e).message;
    }
};