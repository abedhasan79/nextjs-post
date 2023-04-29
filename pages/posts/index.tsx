import React, { useState } from "react";

import Layout from "../../componenets/layout";


export default function addPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleAddPost = async (e: any) => {
        e.preventDefault();

        try{
            let response =await fetch("http://localhost:3000/api/addpost", {
                method: "POST",
                body:JSON.stringify({
                    title,
                    content,
                }),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "content-Type": "application/json",
                },
            });

            response =await response.json();
            setTitle("");
            setContent("")

        }catch(e){
            console.log(e);
        }

    }
    return (
        <Layout>
            <div>
                <form onSubmit={handleAddPost}>
                    <input
                        type="text"
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <textarea
                        name="content"
                        placeholder="content of your post"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        cols={20}
                        rows={8}
                    />

                    <button type="submit">add post</button>
                </form>
            </div>
        </Layout>
    );

}
