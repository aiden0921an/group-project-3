import React, { useState, useEffect } from "react";
import Card from '../components/Card';

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
      <div className="posts-container">
        {posts.map((post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
