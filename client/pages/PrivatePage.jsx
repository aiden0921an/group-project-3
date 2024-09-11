import React from "react";
import { useCart } from '../utils/CartProvider';
import Card from "../components/Card";

const PrivatePage = () => {
  const { cartItems, removeFromCart } = useCart();

  const handleRemoveFromCart = (postId) => {
      removeFromCart(postId);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
      <div>
          <h1>My Shopping Cart</h1>
          <h2>Total: ${total.toFixed(2)}</h2>
          <div className="cart-items">
              {cartItems.map((post) => (
                  <div key={post._id}>
                      <Card post={post} />
                      <button onClick={() => handleRemoveFromCart(post._id)}>Remove from Cart</button>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default PrivatePage;