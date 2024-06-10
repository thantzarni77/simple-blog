import { useLoaderData } from "react-router-dom";
import PostItem from "../components/PostItem";

const Posts = () => {
  const posts = useLoaderData();
  return (
    <div>
      <PostItem posts={posts} />
    </div>
  );
};

export default Posts;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/posts");
  if (!response.ok) {
  } else {
    const posts = await response.json();
    return posts.posts;
  }
};
