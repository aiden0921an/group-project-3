// pages/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';
import fetchPosts from '../utils/fetchPosts';

export default function SearchPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const fetchedPosts = await fetchPosts(searchQuery);
        setPosts(fetchedPosts);
      } catch (err) {
        setError(`Error fetching search results: ${err.message}`);
      }
    };

    getSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="posts-container">
        {error && <div>{error}</div>}
        {posts.length === 0 && !error ? (
          <div>No results found</div>
        ) : (
          posts.map((post) => (
            <Card key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}

