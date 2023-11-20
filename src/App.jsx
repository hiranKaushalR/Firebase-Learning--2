import { useState, useEffect } from "react";
import Login from "./Components/Login";
import Blogs from "./Pages/BlogCard";
import BlogInput from "./Pages/BlogInput";
import Head from "./Components/Head";
import Article from "./Pages/Article";
import NoPage from "./Pages/NoPage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, googleStorage } from "./Config/Firebase";
import { Routes, Route, Link } from "react-router-dom";
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
  const [blogSummary, setBlogSummary] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

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
    console.log (togglePost)
  }

  async function publishBlog() {
    if (!fileUpload) return;
    const fileFolderRef = ref(googleStorage, `Thumbnails/${fileUpload.name}`);

    try {
      const newBlogRef = doc(blogStoreRef);
      await uploadBytes(fileFolderRef, fileUpload);
      const url = await getDownloadURL(fileFolderRef);
      setTogglePost(true);
      setBlogTopic("");
      setBlogBody("");
      setBlogSummary("");

      await setDoc(newBlogRef, {
        Uploader: user.displayName,
        Date: day,
        topic: blogTopic,
        article: blogBody,
        summary: blogSummary,
        thumbnail: url,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteBlog(id) {
    try {
      const deleteBlog = blogList.find((blog) => blog.id === id);
      if (user !== null && deleteBlog.Uploader === user.displayName) {
        await deleteDoc(doc(db, "Blogs", id));
      } else {
        alert("You do not have permission to delete this blog.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div style={{ position: "fixed", width: "100%", textAlign: "right" }}>
        
        <Head
          user={user}
          postBlog={postBlog}
          togglePost={togglePost}
          toggleLoginPanel={toggleLoginPanel}
        />

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
      ) : ''}
      <div>
        <Routes>
          <Route
            path="/write-the-article"
            element={
              <BlogInput
                setBlogBody={setBlogBody}
                setBlogTopic={setBlogTopic}
                setBlogSummary={setBlogSummary}
                publishBlog={publishBlog}
                setFileUpload={setFileUpload}
              />
            }
          />
          <Route
            index
            element={<Blogs deleteBlog={deleteBlog} blogList={blogList} />}
          />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
