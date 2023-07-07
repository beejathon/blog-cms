import React from "react";
import Container from "react-bootstrap/esm/Container";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "./PostCard";

export const Home = () => {
  const posts = usePosts();

  if (!posts) return 'Loading...'

  return (
    <>
      <Container>
        All Posts
        {posts.map((post) => {
          return (
            <>
              <PostCard post={post} />
            </>
          )
        })}    
      </Container>
    </>
  )
}