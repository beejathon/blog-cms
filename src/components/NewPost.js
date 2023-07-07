import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useAuth } from "../hooks/useAuthProvider";
import { SignIn } from "./SignIn";

export const NewPost = () => {
  const { user } = useAuth();

  if (!user) return <SignIn />

  return (
    <>
      <Container as="main">
        New Post
      </Container>
    </>
  )
}