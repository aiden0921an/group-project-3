import React from 'react';
import { useParams } from 'react-router-dom';

const ItemPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(post => post._id === id);
  
  if (!post) {
    return <div>Item not found</div>;
  }

  return (
    <div className="item-page">
      <img src={post.imageUrl} alt={post.title} className="item-image" />
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>Category: {post.category}</p>
      <p>Price: ${post.price}</p>
    </div>
  );
};

export default ItemPage;
