import React, { useContext, useEffect, useState } from "react";

const Context = React.createContext(null)

export const CommmentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(null);
  
  useEffect(() => {
    const uri = process.env.REACT_APP_API_URI;
    async function fetchComments() {
      try {
        const res = await fetch(`${uri}/posts/${postId}/comments`, {
          method: 'GET',
          mode: 'cors',
          cache: 'default',
        })
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchComments();
  }, [postId])

  return (
    <Context.Provider
      value={{
        comments,
        setComments,
        setPostId
      }}>
      {children}
    </Context.Provider>
  )
}

export const useComments = () => useContext(Context);