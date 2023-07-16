import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Stack } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../hooks/useAuthProvider";
import { ConfirmModal } from "./ConfirmModal";
import { useComments } from "../hooks/useComments";

export const CommentCard = ({ postid, comment }) => {
  const { token } = useAuth();
  const { comments } = useComments();
  const { setComments } = useComments();
  const [modalShow, setModalShow] = useState(false);

  const deleteComment = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        } 
      }
      const uri = process.env.REACT_APP_API_URI;
      const res = await axios.delete(
        `${uri}/posts/${postid}/comments/${comment._id}`, 
        config
      )
      if (res.status === 200) {
        updateDeletedComments();
      } else if (res.status === 401) {
        console.log('Admin access needed')
      } else {
        console.log('Something went wrong.')
      }
    } catch (err) { 
      console.log(err);
    }
  }

  const updateDeletedComments = () => {
    const updatedComments = comments.filter((element) => element._id !== comment._id)
    setComments(updatedComments);
  }

  return (
    <>
      <Card>
        <Card.Header>
          Comment ID: {comment._id}
        </Card.Header>
        <Card.Body>
          <Card.Text as="div">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="fw-bold">Author: </span>
                {comment.commenter.userName}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Date: </span>
                {comment.date_formatted}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="fw-bold">Comment: </div>
                <div className="comment">{comment.comment}</div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Stack gap={4} direction="horizontal">
            <Link to={`/${postid}/comments/${comment._id}`}>
              <Button variant="primary">Edit Comment</Button>
            </Link>
            <Button variant="danger" onClick={() => setModalShow(true)}>Delete Comment</Button>
          </Stack>
        </Card.Footer>
      </Card>
      <ConfirmModal 
        show={modalShow} 
        onCancel={() => setModalShow(false)}
        onConfirm={deleteComment}
        target='comment'
      />
    </>
  )
}