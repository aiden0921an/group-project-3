async function fetchPosts(searchQuery = "") {
    try {
      const endpoint = searchQuery ? `/api/post/search?q=${searchQuery}` : "/api/post";
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.payload;
    } catch (err) {
      console.error("Error fetching posts:", err);
      throw err;
    }
  }
  
  export default fetchPosts;