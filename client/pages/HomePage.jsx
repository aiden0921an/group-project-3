import React, { useState, useEffect } from "react";
import Card from '../components/Card';

export default function HomePage({ posts }) {
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