import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useAuth } from "../hooks/useAuthProvider";
import { usePosts } from "../hooks/usePosts";
import { usePost } from "../hooks/usePost";
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from "react-bootstrap/esm/Stack";
import Icon from '@mdi/react';
import { mdiFileImageOutline } from '@mdi/js';
import axios from 'axios';

export const EditPost = () => {
  const { token } = useAuth();
  const post = usePost(useParams());
  const { posts } = usePosts();
  const { setPosts } = usePosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState();
  const navigate = useNavigate();

  const onTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const onContentChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  }

  const onFileSelect = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }
  }

  const uploadFile = async () => {
    const body = {
      image: file,
    }
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      } 
    }
    try {
      const uri = process.env.REACT_APP_API_URI;
      const res = await axios.post(
        `${uri}/posts/upload`,
        body,
        config
      )
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    try {
      let body = {
        title: title,
        content: content,
        image: image,
        imageId: imageId
      } 
      if (file) {
        const upload = await uploadFile();
        if (upload) {
          body.image = upload.url;
          body.imageId = upload.public_id;
        } else {
          throw new Error('Image upload failed');
        }
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-HTTP-Method-Override': 'PUT'
        } 
      }
      const uri = process.env.REACT_APP_API_URI;
      const res = await axios.post(
        `${uri}/posts/${post._id}`, 
        body,
        config
      )
      if (res.status === 200) {
        updatePosts(res.data.post_updated)
      } else if (res.status === 401) {
        console.log('You must be logged in to do that!');
      } else {
        console.log('Something went wrong.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updatePosts = (data) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === data._id) {
        return data;
      } else {
        return post;
      }
    })
    setPosts(updatedPosts);
    navigate('/')
  }

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
      setImageId(post.imageId);
    }
  }, [post])

  if (!post) return 'Loading...'

  return (
    <>
      <Container as="main">
        <Stack gap={3}>
          <h2 className="h4">Edit Post</h2>
          <Form>
            <Form.Group className="mb-3" controlId="controlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                onChange={(e) => onTitleChange(e)} 
                type="text" 
                value={title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="controlInput2">
              <Form.Label>Content</Form.Label>
              <Form.Control 
                onChange={(e) => onContentChange(e)} 
                as="textarea" 
                rows={10} 
                value={content}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Post Thumbnail</Form.Label>
              <Form.Control 
                onChange={(e) => onFileSelect(e)} 
                type="file" 
                accept="image/png, image/jpeg, image/jpg, image/gif"  
              />
              <Form.Text>
                {image ? (
                  <img className="img-preview" src={image} alt="" />
                ) : (
                  <Icon path={mdiFileImageOutline} size={4} />
                )}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>
              Update Post
            </Button>
          </Form>
        </Stack>
      </Container>
    </>
  )
}