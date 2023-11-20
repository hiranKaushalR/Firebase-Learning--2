import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";

function Article() {
  const { id } = useParams(); // Access the blog ID from the URL parameter
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    // Function to fetch the specific article content based on the ID
    const fetchArticle = async () => {
      try {
        const blogRef = doc(db, "Blogs", id);
        const docSnapshot = await getDoc(blogRef);

        if (docSnapshot.exists()) {
          // Set the article data if the document exists
          setArticleData(docSnapshot.data());
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchArticle(); // Fetch article data when the component mounts
  }, [id]); // Re-fetch article data whenever the ID changes

  return (
    <div>
      {articleData ? (
        <div className="article--div">
          <h2 className="article--header">{articleData.topic}</h2>
          <p className="article--para">{articleData.article}</p>
          {/* Add other fields of the article as needed */}
        </div>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
  );
}

export default Article;
