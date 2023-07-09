import { useEffect, useState } from "react";

export const usePost = ({ postid }) => {
  const [post, setPost] = useState();

  useEffect(() => {
    const uri = process.env.REACT_APP_API_URI;
    async function fetchData() {
      fetch(`${uri}/posts/${postid}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
      })
      .then(res => res.json())
      .then(res => setPost(res))
      .catch(err => console.log(err))
    }
    
    fetchData();
  }, [postid])

  return post;
}