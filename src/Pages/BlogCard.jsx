import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Blogs(props) {
  const [error, setError] = useState(null);

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }
  return (
    <div className="flex justify-between items-center flex-wrap gap-5">
      {props.blogList.length > 0 ? (
        props.blogList.map((blog) => (
          <Link to={`/article/${blog.id}`} className="blog-card-link">
            <br />
            <div
              key={blog.id}
              className="w-[300px] h-[450px] bg-blue-200 rounded-md relative"
            >
              <div className="blog-card-thumnail-div">
                <img
                  src={
                    blog.thumbnail === ""
                      ? "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                      : blog.thumbnail
                  }
                  alt="image thumbnail"
                  className="w-full h-[200px] object-cover rounded-md"
                />
                <div className="absolute bottom-[255px] left-1">
                  <p className="bg-purple-900 text-xs rounded-md font-semibold text-white px-2 py-1 ">
                    {blog.tag}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-start flex-col h-[250px]">
                <p className="font-bold ">{blog.topic}</p>
                <p className="text-justify text-sm px-2">{`${blog.summary}...`}</p>
                <div className="blog-card-details px-2">
                  <p className="user-details ">{blog.Uploader}</p>
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
