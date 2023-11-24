import React from "react";
import { Link } from "react-router-dom";

function Blogs(props) {
  return (
    <div className="blog-card--div">
      {props.blogList.length > 0 ? (
        props.blogList.map((blog) => (
          <Link to={`/article/${blog.id}`} className="blog-card-link">
            <br />
            <div key={blog.id} className="blog-card-child--div">
              <div className="blog-card-thumnail-div">
                <img
                  src={
                    blog.thumbnail === ""
                      ? "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                      : blog.thumbnail
                  }
                  alt="image thumbnail"
                  className="blog-card-thumbnail"
                />
                <p className="blog-card-tag">{blog.tag}</p>
              </div>
              <div className="blog-card-text-container">
                <p className="blog-card-topic">{blog.topic}</p>
                <p className="blog-card-summery">{`${blog.summary}..... `}</p>
                <div className="blog-card-details">
                  <p className="user-details">{blog.Uploader}</p>
                  <p className="date-details">{blog.Date}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Blogs;
