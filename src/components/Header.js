import React from "react";
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/useAuthProvider";

export const Header = () => {
  const { 
    user,
    setUser,
    setToken
  } = useAuth();

  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  }

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Stack direction="horizontal" gap={3}>
            <Link to='/'>
              <Navbar.Brand>Blog CMS</Navbar.Brand>
            </Link>
            <Link to='/new-post'>
              <Navbar.Text>New Post</Navbar.Text>
            </Link>
            <Link to='/drafts'>
              <Navbar.Text>Drafts</Navbar.Text>
            </Link>
          </Stack>
          <Navbar.Collapse className="justify-content-end">
            { user ? (
              <Navbar.Text> 
                <span className="sign-out-btn" onClick={signOut}>Sign Out</span>
              </Navbar.Text> 
            ) : (
              null
            )}
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}