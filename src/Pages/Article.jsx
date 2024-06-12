import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { trash, backArrow } from "../Assets";

function Article(props) {
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const blogRef = doc(db, "Blogs", id);
        const docSnapshot = await getDoc(blogRef);

        if (docSnapshot.exists()) {
          setArticleData(docSnapshot.data());
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchArticle();
  }, [id]);

  console.log(articleData);
  console.log(id);

  return (
    <div>
      {articleData ? (
        <div className="article--div max-w-[1080px] px-2 mx-auto text-justify">
          <h2 className="article--header text-2xl font-bold text-center my-4">
            {articleData.topic}
          </h2>
          <p
            className="article--para text-[18px] "
            style={{ whiteSpace: "pre-wrap" }}
          >
            {articleData.article}
          </p>
          <p className="font-bold italic underline mt-4 cursor-default">
            Wriiten by {articleData.Uploader} on {articleData.Date}
          </p>
          <p></p>
          {props.user !== null &&
          articleData.Uploader === props.user.displayName ? (
            <Link to="..">
              <button
                onClick={() => props.deleteBlog(id)}
                className=" text-white flex justify-center items-center px-2 py-2 gap-6"
              >
                <p className="text-xl font-bold">Delete Article</p>
                <img src={trash} alt="" className="w-8" />
              </button>
            </Link>
          ) : (
            <Link to="..">
            <button
              className="bg-blue-600 text-white flex justify-center items-center px-2 py-1 gap-6 rounded-md my-6 mx-auto"
            >
              <img src={backArrow} alt="" className="w-8" />
              <p className="text-lg font-semibold capitalize pr-2">Go back to home page</p>
              
            </button>
            </Link>
          )}
        </div>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
  );
}

export default Article;
