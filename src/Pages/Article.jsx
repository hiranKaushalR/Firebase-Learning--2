import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";

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
        <div className="article--div">
          <h2 className="article--header">{articleData.topic}</h2>
          <p className="article--para">{articleData.article}</p>
          <p>{articleData.Uploader}</p>
          <p>{articleData.Date}</p>
          {props.user !== null &&
          articleData.Uploader === props.user.displayName ? (
            <Link to='..'>
            <button
              onClick={() => props.deleteBlog(id)}
              className="delete-article--btn"
            >
              Delete Article
            </button>
            </Link>
          ) : (
            <button className="delete-article-disabled-btn" onClick={() => props.deleteBlog (id)}>Delete Article</button>
          )}

        </div>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
  );
}

export default Article;
