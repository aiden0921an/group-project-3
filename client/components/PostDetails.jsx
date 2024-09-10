import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemPage from './ItemPage';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        console.log("Fetched post:", response.data.payload); // Debug log
        setPost(response.data.payload);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
  
    fetchPost();
  }, [id]);

  return <ItemPage post={post} />;
};

export default PostDetails;
