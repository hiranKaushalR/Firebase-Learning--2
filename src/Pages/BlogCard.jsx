import React from "react";
import { Link } from "react-router-dom";

function Blogs(props) {
  return (
    <div className="blog-card--div">
      {props.blogList.length > 0 ? (
        props.blogList.map((blog) => (
          <div key={blog.id} className="blog-card-child--div">
            <img
              src={
                blog.thumbnail === ""
                  ? "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                  : blog.thumbnail
              }
              alt="image thumbnail"
            />
            <h3>{blog.topic}</h3>
            <p>
              {`${blog.summary}`}{" "}
              <Link to={`/article/${blog.id}`}>
                {"   "}
                <span>...Read more</span>
              </Link>
            </p>
            <p>
              Uploaded by <b>{blog.Uploader}</b> on <b>{blog.Date}</b>
            </p>
            <button onClick={() => props.deleteBlog(blog.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Blogs;
