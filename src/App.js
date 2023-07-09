import React from "react";
import { PostsProvider } from "./hooks/usePosts";
import { CommmentsProvider } from "./hooks/useComments";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { NewPost } from "./components/NewPost";
import { Drafts } from "./components/Drafts";
import { Post } from "./components/Post";
import { SignIn } from "./components/SignIn";
import { useAuth } from "./hooks/useAuthProvider";

export const App = () => {
  const { user } = useAuth();

  return (
    <div className="App">
      <PostsProvider>
        <CommmentsProvider>
          <Header />
          <Routes>
            <Route path="/" element={ user ? <Home /> : <SignIn /> } />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/:postid" element={<Post />} />
          </Routes>
        </CommmentsProvider>
      </PostsProvider>
    </div>
  );
}

export default App;
