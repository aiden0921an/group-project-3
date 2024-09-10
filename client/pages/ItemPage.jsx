import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemPage = ({ posts }) => {
  const { id } = useParams();
  const [ currentPost, setCurrentPost ] = useState()

  useEffect(() => {
    const post = posts?.find(post => post._id === id);
    setCurrentPost(post)
  },[])

  if( !currentPost ) return <></>
  return (
    <div className="item-page">
      { currentPost.imageUrl !== undefined && (
        <img src={currentPost.imageUrl} alt={currentPost.title} className="item-image" />
      )}
      <h2>{currentPost.title}</h2>
      <p>{currentPost.description}</p>
      {/* <p>Category: {currentPost.category}</p> */}
      <p>Price: ${currentPost.price}</p>
    </div>
  );
};

export default ItemPage;
