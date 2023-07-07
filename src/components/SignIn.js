import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";
import { useAuth } from "../hooks/useAuthProvider";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const { setUser, setToken} = useAuth();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleSubmit = async () => {
    const uri = 'https://blog-boyz.up.railway.app/api';
    const data = {
      username: username,
      password: password,
    }
    fetch(`${uri}/users/login`, {
      method:'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.user.admin === true) {
        signUserIn(res);
      } else {
        showAlert();
      }
    })
    .catch(err => console.log(err))
  }

  const signUserIn = (res) => {
    localStorage.setItem('cms-user', JSON.stringify(res.user));
    localStorage.setItem('cms-token', res.token);
    setUser(res.user);
    setToken(res.token);
    setUsername('');
    setPassword('');
    navigate('/');
  }

  const showAlert = () => {
    setAlert(true);
  }

  return (
    <>
      <Container as="main">
        <Stack gap={3}>
          <h2 className="h4">Sign In</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={(e) => onChangeUsername(e)} type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => onChangePassword(e)} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          { alert ? (
            <>
              <Alert variant='danger'>
                Who do you think you are? I AM!
              </Alert>
            </>
          ) : (
            null
          )}
        </Stack>
      </Container>
    </>
  )
}