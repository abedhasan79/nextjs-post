import { useState } from "react";
import Layout from "../componenets/layout";

type Props = {
  posts: [Post]
}
type Post = {
  _id: String;
  title: String;
  content: String;
}

export async function getServerSideProps() {
  try {
    let response = await fetch('http://localhost:3000/api/getposts');
    let posts = await response.json();



    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) }
    };
  } catch (e) {
    console.error(e);
  }
}

export default function Posts(props: Props) {
  const [posts, setPosts] = useState<[Post]>(props.posts);
  const handleDeletePosts = async (postId: string) => {
    try {
      let response = await fetch("http://localhost:3000/api/deletepost/" + postId, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "content-Type": "application/json",
        },
      });
      response = await response.json();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Layout>
      <div>
        <h1>...........My Posts............</h1>
        <ul>
          {
            posts.map((post, index) => {
              return (
                <li key={index}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <a href={`/posts/${post._id}`}>edit post</a>
                  <button onClick={()=>handleDeletePosts(post._id as string)}>Delete</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </Layout>
  )
}
