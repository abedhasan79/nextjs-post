import clientPromise from "../../../lib/mongodb";

import { ObjectId } from "mongodb";

const getPost = async (req, res) => {
    try{
        const client = await clientPromise;
        const db =  client.db('stream_db');
    
        
        const {get_id} = req.query;
        const post = await db.collection('stream_db').findOne({
            _id: ObjectId(get_id),
        });
    
        res.json(post);
    }catch(e){
        console.error(e);
        throw new Error(e).message;
    }
}


export default getPost;