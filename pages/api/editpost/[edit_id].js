import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const editPost = async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db('stream_db');


        const { edit_id } = req.query;
        const { title, content } = req.body;
        const post = await db.collection('stream_db').updateOne({
            _id: ObjectId(edit_id),
        }, {
            $set: {
                title: title,
                content: content,
            }

        });

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}
export default editPost;