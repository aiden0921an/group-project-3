import React, { useState, useEffect } from "react";
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

export default function HomePage({ posts }) {
  const { id } = useParams();
  const [ allPosts, setAllPosts ] = useState()
  
  useEffect(() => {
    const post = posts?.find(post => post._id === id);
    setAllPosts(post)
  },[])
  
  
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
