import React from "react";
import { Link } from "react-router-dom";

function Head(props) {
  return (
    <div>
      <Link to="..">
        <button className="home-btn">Home</button>
      </Link>
      {props.user === null ? (
        <button className="post-btn" disabled>
          Post
        </button>
      ) : (
        <Link to="/write-the-article">
          <button className="post-btn" onClick={props.postBlog}>
            Post
          </button>
        </Link>
      )}
      <button onClick={props.toggleLoginPanel} className="login-btn">
        {props.user === null ? "Log In" : "Account"}
      </button>
      <Link to="/chat">
        <button className="login-btn">Chat</button>
      </Link>
    </div>
  );
}

export default Head;
