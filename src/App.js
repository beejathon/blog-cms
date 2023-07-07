import React from "react";
import { PostsProvider } from "./hooks/usePosts";
import { CommmentsProvider } from "./hooks/useComments";
import { 
  Routes, 
  Route,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { NewPost } from "./components/NewPost";
import { Drafts } from "./components/Drafts";
import { Post } from "./components/Post";
import { SignIn } from "./components/SignIn";

export const App = () => {
  return (
    <div className="App">
     <PostsProvider>
        <CommmentsProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/:postid" element={<Post />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </CommmentsProvider>
      </PostsProvider>
    </div>
  );
}

export default App;
