import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/post");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.payload);
      } catch (err) {
        setError(`Error fetching posts: ${err.message}`);
        console.error("Error fetching posts:", err);
      }
    }

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Posts</h1>
      <div>
        {posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Category: {post.category}</p>
            <p>Price: ${post.price}</p>
            <p>
              {/* Location: {post.location.street}, {post.location.city},{" "}
              {post.location.state} {post.location.zip} */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
