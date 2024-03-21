import React from "react";
import { Link } from "react-router-dom";

function Head(props) {
  return (
    <div className="bg-black text-white w-screen py-4 flex flex-wrap gap-10 font-semibold justify-end">
      <Link to="/" className="ml-4">
        <button className="home-btn px-4 py-1 rounded-md transition-all ease-in-out duration-500 hover:bg-white hover:text-black  ">Home</button>
      </Link>
      {props.user === null ? (
        <button className="post-btn px-4 py-1 rounded-md transition-all ease-in-out duration-500 hover:bg-white hover:text-black  " disabled>
          Post
        </button>
      ) : (
        <Link to="write-the-article">
          <button className="post-btn px-4 py-1 rounded-md transition-all ease-in-out duration-500 hover:bg-white hover:text-black" onClick={props.postBlog}>
            Post
          </button>
        </Link>
      )}
    <Link to='account'>  <button onClick={props.toggleLoginPanel} className="login-btn px-4 py-1 rounded-md transition-all ease-in-out duration-500 hover:bg-white hover:text-black">
        {props.user === null ? "Log In" : "Account"}
      </button></Link>
    </div>
  );
}

export default Head;
