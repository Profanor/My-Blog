"use client";

import React, { useState, useEffect } from "react";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // Default view mode is grid
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const switchToListView = () => {
    setViewMode("list");
  };

  const switchToGridView = () => {
    setViewMode("grid");
  };

  const handlePostClick = (postId) => {
    const clickedPost = posts.posts.find(post => post._id === postId);
    setSelectedPost(clickedPost);
  };

  const handleEditPost = (postId) => {
    // Handle edit functionality for the selected post
    console.log(`Edit post with ID: ${postId}`);
  };

  const handleDeletePost = (postId) => {
    // Handle delete functionality for the selected post
    console.log(`Delete post with ID: ${postId}`);
  };

  return (
    <div className="h-screen grid grid-rows-3 gap-4 ml-2 p-14">
      <div className="bg-indigo-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <div className="flex justify-center mt-2">
          <button onClick={switchToListView} className="px-4 py-2 bg-indigo-800 text-white rounded-md mr-2">
            List
          </button>
          <button onClick={switchToGridView} className="px-4 py-2 bg-indigo-800 text-white rounded-md">
            Grid
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {selectedPost ? (
            <div>
              <h2 className="text-2xl font-semibold">{selectedPost.title}</h2>
              <p>{selectedPost.content}</p>
              <div className="flex mt-4">
                <button onClick={() => handleEditPost(selectedPost._id)} className="px-4 py-2 bg-indigo-800 text-white rounded-md mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeletePost(selectedPost._id)} className="px-4 py-2 bg-red-800 text-white rounded-md">
                  Delete
                </button>
              </div>
              <button onClick={() => setSelectedPost(null)} className="mt-4 px-4 py-2 bg-indigo-800 text-white rounded-md">
                Back to Posts
              </button>
            </div>
          ) : (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-3" : "grid-cols-1"} gap-4`}>
              {posts.posts.map(post => (
                <div key={post._id} className="bg-black-200 p-4 border rounded-md cursor-pointer" onClick={() => handlePostClick(post._id)}>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="mt-2">{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllPostsPage;
