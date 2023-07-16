import React, { useEffect } from "react";
import { Container, Stack } from "react-bootstrap";
import { useComments } from "../hooks/useComments";
import { useParams } from "react-router-dom";
import { CommentCard } from "./CommentCard";

export const CommentList = () => {
  const id = useParams();
  const { setPostId } = useComments();
  const { comments } = useComments();

  useEffect(() => {
    if (id) {
      setPostId(id.postid)
    }
  }, [])

  if (!comments || !Array.isArray(comments)) return 'Loading'

  return (
    <>
      <Container>
        <Stack gap={3}>
          <h3 className="h4">Comments</h3>
          { comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <>
                  <CommentCard key={comment._id} postid={id.postid} comment={comment} />
                </>
              )
            })
          ) : (
            <>No comments</>
          )
          }
        </Stack>
      </Container>
    </>
  )
}