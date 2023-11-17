import React from "react";

function BlogInput(props) {
  return (
    <div className="blog-input--div">
      <h3>Write Your Article</h3>
      <form className="blog-input--form">
        <input
          type="text"
          placeholder="Topic Of Article"
          className="blog-input--topic"
          onChange={(event) => props.setBlogTopic (event.target.value)}
        />{" "}
        <textarea
          className="blog-input--textarea"
          cols="70"
          rows="10"
          placeholder="Write your article here"
          onChange={(event) => props.setBlogBody(event.target.value)}
        ></textarea>
        <button type="button" className="publish-btn" onClick={props.publishBlog}>
          Publish
        </button>
      </form>
    </div>
  );
}

export default BlogInput;
