import React, { useContext, useEffect, useState } from "react";

const Context = React.createContext(null);

//custom provider
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const uri = process.env.REACT_APP_API_URI;
    fetch(`${uri}/posts`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    })
    .then(data => data.json())
    .then(data => setPosts(data))
    .catch(err => console.log(err));
  }, [])

  return (
    <Context.Provider value={{posts, setPosts}}>
      {children}
    </Context.Provider>
  )
}

export const usePosts = () => useContext(Context);