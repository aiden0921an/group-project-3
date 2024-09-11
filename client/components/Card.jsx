import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSharedContext } from "../components/Bookmark";
import { useCart } from "../utils/CartProvider";
import "../App.css";

const Card = ({ post }) => {
  const navigate = useNavigate();
  const { bookmarkedItems, addBookmark, removeBookmark } = useSharedContext();
  const { addToCart } = useCart();

  const isBookmarked = bookmarkedItems.some(
    (bookmarkedPost) => bookmarkedPost._id === post._id
  );

  const handleCardClick = () => {
    navigate(`/post/${post._id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (isBookmarked) {
      removeBookmark(post._id);
    } else {
      addBookmark(post);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents the event from bubbling up to the card click
    addToCart(post); // Add the item to the cart
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={post.imageUrl} alt={post.title} className="card-image" />
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {<p>Category: {post.category.name}</p>}
      <p>Price: ${post.price}</p>
      {post.location && (
        <div className="card-location">
          <h4>Location:</h4>
          <p>
            {post.location.city}, {post.location.state} {post.location.zip}
          </p>
        </div>
      )}
      <div className="button-container">
        <button onClick={handleBookmarkClick}>
          {isBookmarked ? "Remove Bookmark" : "Bookmark"}
        </button>
        {/* <button onClick={handleAddToCart}>Add to Cart</button> */}
      </div>
    </div>
  );
};

export default Card;
