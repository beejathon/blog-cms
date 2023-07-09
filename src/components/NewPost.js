import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useAuth } from "../hooks/useAuthProvider";
import { SignIn } from "./SignIn";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from "react-bootstrap/esm/Stack";
import Icon from '@mdi/react';
import { mdiFileImageOutline } from '@mdi/js';
import axios from 'axios';
import { usePosts } from "../hooks/usePosts";

export const NewPost = () => {
  const { user } = useAuth();
  const { token } = useAuth();
  const { setPosts } = usePosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState();
  const [image, setImage] = useState();
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

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const upload = await uploadFile();
      if (!upload) {
        throw new Error('Image upload failed')
      }
      const body = {
        title: title,
        content: content,
        image: upload.url,
        imageId: upload.public_id
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      }
      const uri = process.env.REACT_APP_API_URI;
      const res = await axios.post(
        `${uri}/posts/`, 
        body,
        config
      )
      if (res.status === 200) {
        updatePosts(res.data.post)
      } else if (res.status === 401) {
        console.log('You must be logged in to do that!');
      } else {
        console.log('Something went wrong.')
      }
    } catch (err) {
      console.log(err)
    }
    setTitle('');
    setContent('');
    setFile(null);
    setImage(null);
    navigate('/');
  }

  const updatePosts = (data) => {
    console.log(data)
    setPosts((prev) => {
      if (prev.length === 0 ) {
        return [data]
      } else {
        const newPosts = [
          ...prev,
          data
        ]
        return newPosts
      }
    })
  }

  if (!user) return <SignIn />

  return (
    <>
      <Container as="main">
        <Stack gap={3}>
          <h2 className="h4">New Post</h2>
          <Form>
            <Form.Group className="mb-3" controlId="controlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={(e) => onTitleChange(e)} type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="controlInput2">
              <Form.Label>Content</Form.Label>
              <Form.Control onChange={(e) => onContentChange(e)} as="textarea" rows={10} />
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
                  <Icon path={mdiFileImageOutline} size={1} />
                )}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Stack>
      </Container>
    </>
  )
}