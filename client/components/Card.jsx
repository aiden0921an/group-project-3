import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

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
      <p>Category: {post.category.name}</p>
      <p>Price: ${post.price}</p>
      {post.location && (
        <div className="card-location">
          <h4>Location:</h4>
          <p>
            {post.location.city}, {post.location.state} {post.location.zip}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
