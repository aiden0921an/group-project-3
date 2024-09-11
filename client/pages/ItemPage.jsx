import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquarePayment from "../components/SquarePayment";

const ItemPage = ({ posts }) => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState();
  const [isPaymentVisible, setPaymentVisible] = useState(false);
  const [price, setPrice] = useState();

  useEffect(() => {
    const post = posts?.find((post) => post._id === id);
    setCurrentPost(post);
  }, []);

  const handleBuyNowClick = () => {
    setPaymentVisible(true);
  };

  if (!currentPost) return <></>;
  return (
    <div className="item-page">
      {currentPost.imageUrl !== undefined && (
        <img
          src={currentPost.imageUrl}
          alt={currentPost.title}
          className="item-image"
        />
      )}
      <h2>{currentPost.title}</h2>
      <p>{currentPost.description}</p>
      {<p>Category: {currentPost.category.name}</p>}
      <p>Price: ${currentPost.price}</p>
      <div className="button-container">
        <button onClick={handleBuyNowClick}>Buy Now</button>
      </div>
      {isPaymentVisible && <SquarePayment price={price} />}
    </div>
  );
};

export default ItemPage;
