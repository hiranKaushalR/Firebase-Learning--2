import React, { useState, useEffect } from "react";
import { db } from "../Config/Firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Blogs (props) {
  const [blogList, setBlogList] = useState([]);

  const blogStoreRef = collection(db, "Blogs");

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

  return (
    <div>
      <div>
        {blogList.length > 0 ? (
          blogList.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.topic}</h3>
              <p>{blog.article}</p>
              <p>
                Uploaded by <b>{blog.Uploader}</b> on <b>{blog.Date}</b>
              </p>
              <button onClick={props.deleteBlog}>Delete</button>
              <hr />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Blogs;
