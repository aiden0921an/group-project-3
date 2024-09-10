import React from "react";
import { useNavigate } from "react-router-dom";
import { useSharedContext } from "../components/Bookmark";
import "../App.css";
import { useState } from "react";

const Card = ({ post }) => {
  const navigate = useNavigate();
  const { bookmarkedItems, addBookmark, removeBookmark } = useSharedContext();

  const [price, setPrice] = useState(post.price);

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

  const handleBuyNowClick = () => {
    if (
      window.SquarePayments &&
      typeof window.SquarePayments.openPaymentForm === "function"
    ) {
      window.SquarePayments.openPaymentForm(price);
    } else {
      console.error("SquarePayments is not initialized.");
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img
        src={`http://localhost:3001${post.imageUrl}`}
        alt={post.title}
        className="card-image"
      />

      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {/* <p>Category: {post.category.name}</p> */}
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
        <button onClick={handleBuyNowClick}>Buy Now</button>
      </div>
    </div>
  );
};

export default Card;
