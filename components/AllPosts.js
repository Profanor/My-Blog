"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // Default view mode is grid
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
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

  const handleEditPost = async (postId, updatedPostData) => {
    try {
    const baseUrl = window.location.protocol + '//' + window.location.host;
    const apiUrl = `${baseUrl}/api/posts/${postId}`;
  
      const res = await fetch(apiUrl, {  
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPostData),
      });

      if (!res.ok) {
        throw new Error(`Failed to edit posts`)
      }
      const updatedPost = await res.json();
      return updatedPost;
    } catch (error) {
      console.error('Error editing post:', error);
      throw error;
    }   
  };

  const handleDeletePost = async (postId) => {
      const baseUrl = window.location.protocol + '//' + window.location.host;
      const apiUrl = `${baseUrl}/api/posts?id=${postId}`;

      const confirmed = confirm('Are you sure?');
      if(confirmed) {
      const res = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Post deleted successfully.');
        router.refresh();
      }
    }
  }

  // Function to handle changes in the search input field
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter posts based on the search query
  const filteredPosts = posts.length > 0 ? posts.filter(post =>
  post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  post.content.toLowerCase().includes(searchQuery.toLowerCase())
) : [];


  return (
    <div className="min-h-screen grid grid-rows-3 gap-4 ml-2 p-14">
      <div className="bg-indigo-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <div className="flex justify-center mt-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="px-4 py-2 bg-white rounded-md mr-2 text-black"
          />
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
            <div className="border-2 border-white p-4">
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
              {searchQuery !== "" ? (
                // Use filteredPosts when there's a search query
                filteredPosts.map(post => (
                  <div key={post._id} className="p-4 border rounded-md cursor-pointer bg-white shadow-md hover:shadow-lg" onClick={() => handlePostClick(post._id)}>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="mt-2">{post.content}</p>
                  </div>
                ))
              ) : (
                // Display all posts when there's no search query
                posts.posts.map(post => (
                  <div key={post._id} className="p-4 border rounded-md cursor-pointer bg-post mt-2 w-full h-auto object-cover shadow-md hover:shadow-lg" onClick={() => handlePostClick(post._id)}>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="mt-2">{post.content}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllPostsPage;
