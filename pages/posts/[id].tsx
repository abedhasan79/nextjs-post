import React, { useState } from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";

import Layout from "../../componenets/layout";

type pageParams = {
    id: String;
};

type pageProps = {
    post: Post;
}

type Post = {
    _id: string;
    title: string;
    content: string;
}

type ResponseFromServer = {
    _id: string;
    title: string;
    content: string;
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext<pageParams>): Promise<
    GetStaticPropsResult<pageProps>
> {
    try {
        let response = await fetch(
            "http://localhost:3000/api/getpost/" + params?.id
        );

        let responseFromServer: ResponseFromServer = await response.json();

        return {
            
            props: {
                post: {
                    _id: responseFromServer._id,
                    title: responseFromServer.title,
                    content: responseFromServer.content,
                },
            },
        };
    } catch (e) {
        console.log("error ", e);
        return {
            props: {
                post: {
                    _id: "  ",
                    title: "  ",
                    content: "  ",
                },
            },
        }
    }
}
export async function getStaticPaths() {
    let posts = await fetch("http://localhost:3000/api/getposts");

    let postFromServer: [Post] = await posts.json();
    return {
        paths: postFromServer.map((post) => {
            return {
                params: {
                    id: post._id,
                },
            };
        }),
        fallback: false, 
    };
}
export default function editPost({
    post: { _id, title, content },
}: pageProps) {

    const [postTitle, setPostTitle] = useState(title);
    const [postContent, setPostContent] = useState(content);

    const handleEditPost = async (e: any) => {
        e.preventDefault();

        try{let response = await fetch("http://localhost:3000/api/editpost/" + _id, {
            method: "POST",
            body: JSON.stringify({
                title: postTitle,
                content: postContent,
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        setPostTitle(postTitle);
        setPostContent(postContent);}catch(e){
            console.log(e);
        }
    }
    return (
        <Layout>
            <div>
                <form onSubmit={handleEditPost}>
                    <input type="text" 
                        onChange={(e) => setPostTitle(e.target.value)}
                        value={postTitle ? postTitle : ""}
                    
                    />
                    <textarea name="" id="" cols={30} rows={10}
                        onChange={(e) => setPostContent(e.target.value)}
                        value={postContent ? postContent : ""}
                    />
                    <button type="submit"> edit Post</button>
                </form>
            </div>
        </Layout>
    );
}