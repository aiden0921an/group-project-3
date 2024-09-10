
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSharedContext } from "../components/Bookmark";
import '../App.css';


const Card = ({ post }) => {
  const navigate = useNavigate();
  const { bookmarkedItems, addBookmark, removeBookmark } = useSharedContext();

  const isBookmarked = bookmarkedItems.some(
    (bookmarkedPost) => bookmarkedPost._id === post._id
  );

  const handleCardClick = () => {
    navigate(`/post/${post._id}`);
  };
  console.log("Image URL:", post.imageUrl);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (isBookmarked) {
      removeBookmark(post._id);
    } else {
      addBookmark(post);
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
      <button onClick={handleBookmarkClick}>
        {isBookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
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
