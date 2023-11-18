import { useState, useEffect } from "react";
import Login from "./Components/Login";
import Blogs from "./Components/Blogs";
import BlogInput from "./Components/BlogInput";
import { doc, setDoc, collection, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "./Config/Firebase";
import "./App.css";
import "animate.css";

function App(props) {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [togglePost, setTogglePost] = useState(true);
  const [user, setUser] = useState(null);
  const [blogList, setBlogList] = useState([]);

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

  useEffect(() => {
    const unsubscribe = onSnapshot(blogStoreRef, (snapshot) => {
      const blogsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogList(blogsData);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);


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
      setTogglePost(true);

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

  async function deleteBlog(id) {
    try {
      const deleteBlog = blogList.find(blog => blog.id === id);
      if (user !== null && deleteBlog.Uploader === user.displayName) {
        await deleteDoc(doc(db, "Blogs", id));
      } else {
        alert ("You do not have permission to delete this blog.");
      }
    } catch (err) {
      console.error(err);
    }
  }
  



  return (
    <div>
      <div style={{ position: "fixed", width: "100%", textAlign: "right" }}>
        {user !== null ? (
          <button className="post-btn" onClick={postBlog}>
            {togglePost ? "Post" : "Cancel"}
          </button>
        ) : (
          <button className="post-btn" disabled>
            Post
          </button>
        )}
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
        <Blogs deleteBlog={deleteBlog} blogList={blogList}/>
      </div>
    </div>
  );
}

export default App;
