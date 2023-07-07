import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const PostCard = ({ post }) => {
  return (
    <>
      <Card>
        <Card.Header>{post.title}</Card.Header>
        <Card.Body>
          <Card.Text>
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
          <Link to={`/blog-cms/${post._id}`}>
            <Button>Edit Post</Button>
          </Link>
        </Card.Footer>
      </Card>
    </>
  )
}