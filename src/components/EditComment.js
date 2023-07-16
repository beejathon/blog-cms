import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useAuth } from "../hooks/useAuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from "react-bootstrap/esm/Stack";
import axios from 'axios';
import { useComment } from "../hooks/useComment";
import { useComments } from "../hooks/useComments";

export const EditComment = () => {
  const { token } = useAuth();
  const { postid } = useParams();
  const { commentid } = useParams();
  const { comments } = useComments();
  const { setComments } = useComments();
  const comment = useComment({postid, commentid});
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const onTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        comment: text,    
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-HTTP-Method-Override': 'PUT'
        } 
      }
      const uri = process.env.REACT_APP_API_URI;
      const res = await axios.post(
        `${uri}/posts/${postid}/comments/${commentid}`, 
        body,
        config
      )
      updateComments(res.data.comment);
    } catch (err) {
      console.log(err)
    }
  }

  const updateComments = (data) => {
    const updatedComments = comments.map((element) => {
      if (element._id === data._id) {
        return data;
      } else {
        return element;
      }
    })
    setComments(updatedComments);
    navigate(`/${postid}/comments`)
  }

  useEffect(() => {
    if (comment) {
      setText(comment.comment)
    }
  }, [comment])

  if (!comment) return 'Loading...'

  return (
    <>
      <Container as="main">
        <Stack gap={3}>
          <h2 className="h4">Edit Comment</h2>
          <Form>
            {`Author: ${comment.commenter.userName}`}
            <Form.Group className="mb-3" controlId="controlInput2">
              <Form.Label>Comment:</Form.Label>
              <Form.Control 
                onChange={(e) => onTextChange(e)} 
                as="textarea" 
                rows={5} 
                value={text}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Update Comment
            </Button>
          </Form>
        </Stack>
      </Container>
    </>
  )
}