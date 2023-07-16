import { useEffect, useState } from "react";

export const useComment = ({ postid, commentid }) => {
  const [comment, setComment] = useState();

  useEffect(() => {
    const uri = process.env.REACT_APP_API_URI;
    async function fetchData() {
      fetch(`${uri}/posts/${postid}/comments/${commentid}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
      })
      .then(res => res.json())
      .then(res => setComment(res))
      .catch(err => console.log(err))
    }
    
    fetchData();
  }, [postid, commentid])

  return comment;
}