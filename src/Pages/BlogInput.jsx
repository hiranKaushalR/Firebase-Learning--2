import React from "react";

function BlogInput(props) {
  return (
    <div className="blog-input--div">
      <h3>Write Your Article</h3>
      <form className="blog-input--form">
        <input
          type="text"
          required='required'
          placeholder="Topic Of Article"
          className="blog-input--topic"
          onChange={(event) => props.setBlogTopic(event.target.value)}
        />{" "}
        <textarea
          className="blog-input--textarea"
          cols="70"
          rows="10"
          placeholder="Write your article here"
          onChange={(event) => props.setBlogBody(event.target.value)}
        ></textarea>
        <textarea
          placeholder="Summery (Should contain 100-250 characters)"
          minLength={100}
          maxLength={350}
          className="blog-input--textarea"
          onChange={(event) => props.setBlogSummary(event.target.value)}
          cols="70"
          rows="5"
        ></textarea>
        <label htmlFor="thumbnail">Thumbnail</label>
        <input type="file" id="thumbnail" onChange={(event) => props.setFileUpload (event.target.files[0])} />
        <button
          type="button"
          className="publish-btn"
          onClick={props.publishBlog}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default BlogInput;
