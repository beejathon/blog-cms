import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link to='/'>
            <Navbar.Brand>Blog CMS</Navbar.Brand>
          </Link>
          <Link to='/new-post'>
            <Navbar.Text>New Post</Navbar.Text>
          </Link>
          <Link to='/drafts'>
            <Navbar.Text>Drafts</Navbar.Text>
          </Link>
          <Navbar.Collapse className="justify-content-end">
            <Link to='/signin'>
              <Navbar.Text>Sign In</Navbar.Text>
            </Link>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}