import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BlogInput(props) {
  const [canSubmit, setCanSubmit] = useState(false);

  const wordsInBlogBody = props.blogBody.trim().split(/\s+/);
  const wordsInBlogTopic = props.blogTopic.trim().split(/\s+/);
  let wordCountInBlogBody = wordsInBlogBody.filter(
    (word) => word !== ""
  ).length;
  let wordCountInBlogTopic = wordsInBlogTopic.filter(
    (word) => word !== ""
  ).length;

  useEffect(() => {
    if (
      props.fileUpload !== null &&
      props.blogTag !== "" &&
      wordCountInBlogBody >= 250 &&
      wordCountInBlogTopic <= 15
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [props.fileUpload, props.blogTag, wordCountInBlogBody, wordCountInBlogTopic]);

  console.log("can submit ", canSubmit);

  return (
    <div className="blog-input--div">
      <h3>Write Your Article</h3>
      <form className="blog-input--form">
        <input
          type="text"
          required="required"
          placeholder="Topic Of Article"
          className="blog-input--topic"
          maxLength={100}
          onChange={(event) => props.setBlogTopic(event.target.value)}
        />{" "}
        <p
          style={
            wordCountInBlogTopic > 15 ? { color: "red" } : { color: "blue" }
          }
        >{`${wordCountInBlogTopic}/15 Words`}</p>
        <select
          name="Choose a tag"
          onChange={(event) => props.setBlogTag(event.target.value)}
        >
          <option value="" disabled selected hidden>
            Select an Option
          </option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="History">History</option>
          <option value="Fantacy">Fantacy</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Fashion">Fashion</option>
          <option value="Business">Business</option>
          <option value="Fitness">Fitness</option>
          <option value="Finance">Finance</option>
          <option value="Beauty">Beauty</option>
          <option value="Parenting">Parenting</option>
          <option value="Education">Education</option>
          <option value="Photography">Photography</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Relationships">Relationships</option>
          <option value="Career">Career</option>
          <option value="Personal Development">Personal Development</option>
          <option value="Environment & Sustainability">
            Environment & Sustainability
          </option>
          <option value="other">Other</option>
        </select>
        <textarea
          className="blog-input--textarea"
          cols="70"
          rows="10"
          placeholder="Write your article here (Should Contain more than 250 words)"
          onChange={(event) => props.setBlogBody(event.target.value)}
        ></textarea>
        {wordCountInBlogBody >= 250 ? (
          <p
            style={
              wordCountInBlogBody >= 250 ? { color: "blue" } : { color: "red" }
            }
          >{`${wordCountInBlogBody} words in this article`}</p>
        ) : (
          <p
            style={
              wordCountInBlogBody >= 250 ? { color: "blue" } : { color: "red" }
            }
          >
            {`You need more ${
              250 - wordCountInBlogBody
            } words to Sumbit this post`}
          </p>
        )}
        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          type="file"
          id="thumbnail"
          onChange={(event) => props.setFileUpload(event.target.files[0])}
        />
        {!canSubmit ? <button type="button" disabled>Publish</button>:props.user ? (
          <Link to="..">
            <button
              type="button"
              className="publish-btn"
              onClick={props.publishBlog}
            >
              Publish
            </button>
          </Link>
        ) : (
          <button disabled>You need to Log in First</button>
        )}
      </form>
    </div>
  );
}

export default BlogInput;
