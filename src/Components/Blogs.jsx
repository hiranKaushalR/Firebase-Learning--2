import React from "react";

function Blogs (props) {

  return (
    <div>
      <div>
        {props.blogList.length > 0 ? (
          props.blogList.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.topic}</h3>
              <p>{blog.article}</p>
              <p>
                Uploaded by <b>{blog.Uploader}</b> on <b>{blog.Date}</b>
              </p>
              <button onClick={() => props.deleteBlog (blog.id)}>Delete</button>
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
