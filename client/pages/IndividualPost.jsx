
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import React, { useState, useEffect } from 'react';


export default function IndividualPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      async function fetchPost() {
        try {
          const response = await fetch(`/api/post/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setPost(data.payload);
        } catch (err) {
          setError(`Error fetching post: ${err.message}`);
          console.error("Error fetching post:", err);
        }
      }
  
      fetchPost();
    }, [id]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!post) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="post-page">
        <h1>{post.title}</h1>
        <img src={post.imageUrl} alt={post.title} className="post-image" />
        <p>{post.description}</p>
        <p>Category: {post.category}</p>
        <p>Price: ${post.price}</p>
        <p>Location: {`${post.location.street}, ${post.location.city}, ${post.location.state} ${post.location.zip}`}</p>
        <p>Sold by: {post.user.username}</p>
      </div>
    );
  }