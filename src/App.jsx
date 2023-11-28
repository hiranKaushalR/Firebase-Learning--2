import { useState, useEffect } from "react";
import Login from "./Components/Login";
import BlogCard from "./Pages/BlogCard";
import BlogInput from "./Pages/BlogInput";
import Head from "./Components/Head";
import Article from "./Pages/Article";
import Chat from "./Pages/Chat";
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
import { Routes, Route } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./App.css";
import "animate.css";

function App(props) {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [togglePost, setTogglePost] = useState(true);
  const [user, setUser] = useState(null);
  const [blogList, setBlogList] = useState([]);

  // For Article Input Field
  const [blogTopic, setBlogTopic] = useState("");
  const [blogTag, setBlogTag] = useState("");
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

  useEffect(() => {
    const words = blogBody.split(" ");
    const summary = words.slice(0, 30).join(" ");
    setBlogSummary(summary);
    setBlogSummary(summary);
  }, [blogBody]);

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

      await setDoc(newBlogRef, {
        Uploader: user.displayName,
        Date: day,
        topic: blogTopic,
        article: blogBody,
        summary: blogSummary,
        thumbnail: url,
        tag: blogTag,
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
        alert("You do not have permission to delete this blog");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div style={{ width: "100%", textAlign: "right" }}>
        <Head
          user={user}
          postBlog={postBlog}
          togglePost={togglePost}
          toggleLoginPanel={toggleLoginPanel}
        />
      </div>

      <div style={{ height: "50px" }}></div>
      {togglePost ? "" : ""}
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
                setBlogTag={setBlogTag}
                blogBody={blogBody}
                blogTopic={blogTopic}
                blogTag={blogTag}
                fileUpload={fileUpload}
                user={user}
              />
            }
          />
          <Route
            index
            element={<BlogCard deleteBlog={deleteBlog} blogList={blogList} />}
          />
          <Route
            path="/article/:id"
            element={
              <Article
                deleteBlog={deleteBlog}
                blogList={blogList}
                user={user}
              />
            }
          />
          <Route path="/chat" element={<Chat user={user} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
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
  );
}

export default App;
