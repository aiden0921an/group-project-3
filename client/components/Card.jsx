import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Card = ({ post }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={post.imageUrl} alt={post.title} className="card-image" />
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>Category: {post.category}</p>
      <p>Price: ${post.price}</p>
    </div>
  );
};

export default Card;
