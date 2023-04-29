import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const deletePost = async (req, res) => {
    try{
        const client = await clientPromise;
        const db =  client.db('stream_db');
    
        
        const {delete_id} = req.query;
        const post = await db.collection('stream_db').deleteOne({
            _id: ObjectId(delete_id),
        });
    
        res.json(post);
    }catch(e){
        console.error(e);
        throw new Error(e).message;
    }
}
export default deletePost;