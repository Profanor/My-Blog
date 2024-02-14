"use client";

import { useState, useEffect } from 'react';
// import postsData from './posts.json';

const Page = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      // Make a fetch request to your backend API endpoint
      const response = await fetch('https://api/users');
      // Parse the response as JSON
      const data = await response.json();
      // Update the state with the fetched posts
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // useEffect hook to fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {/* Map through the posts array and render each post */}
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;