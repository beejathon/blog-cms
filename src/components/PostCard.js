import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Stack } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../hooks/useAuthProvider";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";

export const PostCard = ({ post }) => {
  const { token } = useAuth();
  const { posts } = usePosts();
  const { setPosts } = usePosts();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const publishPost = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
      const uri = process.env.REACT_APP_API_URI;
      const res = await axios.post(
        `${uri}/posts/${post._id}/publish`,
        null, 
        config
      )
      if (res.status === 200) {
        updatePublishedPosts();
      } else if (res.status === 401) {
        console.log('Admin access needed')
      } else {
        console.log('Something went wrong.')
      }      
    } catch (err) {
      console.log(err)
    }
  }

  const unPublishPost = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
      const uri = process.env.REACT_APP_API_URI;
      const res = await axios.post(
        `${uri}/posts/${post._id}/unpublish`,
        null, 
        config
      )
      if (res.status === 200) {
        updatePublishedPosts();
      } else if (res.status === 401) {
        console.log('Admin access needed')
      } else {
        console.log('Something went wrong.')
      }      
    } catch (err) {
      console.log(err)
    }
  }

  const updatePublishedPosts = () => {
    const updatedPosts = posts.map((element) => {
      if (element._id === post._id) {
        element.published = !element.published;
        return element;
      } else {
        return element;
      }
    })
    setPosts(updatedPosts);
    navigate('/');
  }

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        } 
      }
      const uri = process.env.REACT_APP_API_URI;
      const res = await axios.delete(
        `${uri}/posts/${post._id}`, 
        config
      )
      if (res.status === 200) {
        updateDeletedPosts();
      } else if (res.status === 401) {
        console.log('Admin access needed')
      } else {
        console.log('Something went wrong.')
      }
    } catch (err) { 
      console.log(err);
    }
  }

  const updateDeletedPosts = () => {
    const updatedPosts = posts.filter((element) => element._id !== post._id)
    setPosts(updatedPosts);
    navigate('/');
  }

  return (
    <>
      <Card>
        <Card.Header>{post.title}</Card.Header>
        <Card.Body>
          <Card.Text as="div">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="fw-bold">Author: </span>
                {post.author.userName}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Date: </span>
                {post.date_formatted}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Published: </span>
                {post.published ? 'Yes' : 'No' }
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="fw-bold">Preview: </div>
                <div className="post-preview">{post.content}</div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Stack gap={4} direction="horizontal">
            <Link to={`/${post._id}`}>
              <Button variant="primary">Edit Post</Button>
            </Link>
            <Link to={`/${post._id}/comments`}>
              <Button variant="secondary">Edit Comments</Button>
            </Link>
            { post.published ? (
              <>
                <Button variant="warning" onClick={unPublishPost}>
                  Unpublish Post
                </Button>
              </>
            ):(
              <>
                <Button variant="success" onClick={publishPost}>
                  Publish Post
                </Button>
              </>
            )}
            <Button variant="danger" onClick={() => setModalShow(true)}>Delete Post</Button>
          </Stack>
        </Card.Footer>
      </Card>
      <ConfirmModal 
        show={modalShow} 
        onCancel={() => setModalShow(false)}
        onConfirm={deletePost}
        target='post'
      />
    </>
  )
}