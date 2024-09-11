import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

function normalizeCategoryName(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

export default function CategoryPage({ posts }) {
  const { categoryName } = useParams();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const categoryPosts = posts.filter(
      post => normalizeCategoryName(post.category.name) === categoryName
    );
    setFilteredPosts(categoryPosts);
  }, [categoryName, posts]);

  if (filteredPosts.length === 0) {
    return <div>No posts found in this category.</div>;
  }

  return (
    <div>
      <h1>{categoryName.replace(/-/g, ' ')}</h1>
      <div className="posts-container">
        {filteredPosts.map(post => (
          <Card key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}