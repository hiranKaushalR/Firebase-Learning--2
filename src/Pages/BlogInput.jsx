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
  }, [
    props.fileUpload,
    props.blogTag,
    wordCountInBlogBody,
    wordCountInBlogTopic,
  ]);

  return (
    <div className="flex justify-center items-center flex-col">
      <h3 className="text-3xl">Write Your Article</h3>
      <form className="w-full flex justify-center items-center flex-col my-6">
        <input
          type="text"
          required="required"
          placeholder="Topic Of Article"
          className="border-black border-2 max-w-[550px] w-full px-2 py-2 rounded-lg"
          maxLength={100}
          onChange={(event) => props.setBlogTopic(event.target.value)}
        />{" "}
        <p
          className={`${
            wordCountInBlogTopic > 15 ? "text-red-600" : "text-blue-700"
          } font-[500] pb-5`}
        >{`${wordCountInBlogTopic}/15 Words`}</p>
        <select
          name="Choose a tag"
          onChange={(event) => props.setBlogTag(event.target.value)}
          className="border-black border-2 px-2 py-1 rounded-md mb-6 w-full max-w-[500px]"
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
          className={`border-black border-2 p-2 rounded-lg`}
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
            className={`${
              wordCountInBlogBody >= 250 ? "text-blue-700" : "text-red-600"
            } font-[500] pb-5`}
          >
            {`You need more ${
              250 - wordCountInBlogBody
            } words to Sumbit this post`}
          </p>
        )}
        <label htmlFor="thumbnail" className="">Thumbnail</label>
        <input
          type="file"
          id="thumbnail"
          onChange={(event) => props.setFileUpload(event.target.files[0])}
          className=""
        />
        <div className="my-5">
        {!canSubmit ? (
          <button type="button" className="bg-red-500 blur-[.6px] text-white px-8 py-2 text-lg font-semibold rounded-lg" disabled>
            Please fill the forms correctly
          </button>
        ) : props.user ? (
          <Link to="..">
            <button
              type="button"
              className="bg-blue-500 text-white px-8 py-2 text-lg font-semibold rounded-lg"
              onClick={props.publishBlog}
            >
              Publish
            </button>
          </Link>
        ) : (
          <button disabled className="bg-red-500 blur-[.6px] text-white px-8 py-2 text-lg font-semibold rounded-lg">You need to Log in First</button>
        )}
        </div>
      </form>
    </div>
  );
}

export default BlogInput;
