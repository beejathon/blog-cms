import React from "react";
import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "./PostCard";

export const Home = () => {
  const { posts } = usePosts();

  if (!posts) return 'Loading...'

  return (
    <>
      <Container as="main">
        <Stack gap={4}>
          <h2 className="h4">All Posts</h2>
          {posts.slice(0).reverse().map((post) => {
            return (
              <>
                <PostCard key={post._id} post={post} />
              </>
            )
          })}
        </Stack>
      </Container>
    </>
  )
}