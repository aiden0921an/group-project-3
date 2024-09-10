import React from 'react';
import '../App.css';

const Item = ({ post }) => {
  if (!post) {
    return <div>Item not found</div>;
  }

  return (
    <div className="item">
      <img src={post.imageUrl} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>Category: {post.category}</p>
      <p>Price: ${post.price}</p>
    </div>
  );
};

export default Item;