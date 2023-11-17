import { useState } from "react";
import Login from "./Components/Login";
import Blogs from "./Components/Blogs";
import BlogInput from "./Components/BlogInput";
import { auth, googleAuth } from "./Config/Firebase";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";
import { db } from "./Config/Firebase";
import "./App.css";
import "animate.css";

function App(props) {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [togglePost, setTogglePost] = useState(true);
  const [user, setUser] = useState(null);

  // For Article Input Field
  const [blogTopic, setBlogTopic] = useState("");
  const [blogBody, setBlogBody] = useState("");

  const blogStoreRef = collection(db, "Blogs");

  // Get Date
  const calender = new Date();

  const year = calender.getFullYear();
  const month = calender.getMonth() + 1;
  const date = calender.getDate();

  let day = `${year}/${month}/${date}`;

  //

  function toggleLoginPanel() {
    setShowLoginPanel(!showLoginPanel);
    setTogglePost(true);
  }

  function postBlog() {
    setTogglePost(!togglePost);
    setShowLoginPanel(false);
  }

  async function publishBlog() {
    try {
      const newBlogRef = doc(blogStoreRef);

      await setDoc(newBlogRef, {
        Uploader: user.displayName,
        Date: day,
        topic: blogTopic,
        article: blogBody,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteBlog () {
    try {
      await deleteDoc (doc (db, 'Blogs', id))
    } catch (err) {
      console.error (err)
    }
  }

  console.log(new Date().getDate());
  console.log(new Date().getFullYear());

  return (
    <div>
      <div style={{ position: "fixed", width: "100%", textAlign: "right" }}>

        {user !== null ? <button className="post-btn" onClick={postBlog}>
          {togglePost ? "Post" : "Cancel"}
        </button> : <button className="post-btn" disabled>Post</button>}
        <button onClick={toggleLoginPanel} className="login-btn">
          {user === null ? "Log In" : "Account"}
        </button>
        {showLoginPanel ? (
          <Login
            user={user}
            setUser={setUser}
            setShowLoginPanel={setShowLoginPanel}
          />
        ) : (
          " "
        )}
      </div>
      <div style={{ height: "50px" }}></div>
      {togglePost ? (
        ""
      ) : (
        <BlogInput
          setBlogBody={setBlogBody}
          setBlogTopic={setBlogTopic}
          publishBlog={publishBlog}
        />
      )}
      <div>
        <Blogs deleteBlog={deleteBlog}/>
      </div>
    </div>
  );
}

export default App;
