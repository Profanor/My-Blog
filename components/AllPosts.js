"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CommentForm from './Comment';
import SearchBar from './SearchBar'; 
import ScrollToTopButton from './Scroll/ScrollToTopButton';

const AllPostsPage = () => {
  const [postsData, setPostsData] = useState({ posts: [], imageSources: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        const { posts } = data;
        const imageSources = {};
        await Promise.all(
          posts.map(async (post) => {
            if (post.image) {
              const base64Image = `data:${post.image.contentType};base64,${Buffer.from(post.image.data).toString("base64")}`;
              imageSources[post._id] = base64Image;
            }
          })
        );
        setPostsData({ posts, imageSources });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const switchToListView = () => {
    setViewMode("list");
  };

  const switchToGridView = () => {
    setViewMode("grid");
  };

  const handlePostClick = (postId) => {
    const clickedPost = postsData.posts.find(post => post._id === postId);
    setSelectedPost(clickedPost);
    setShowCommentForm(true);
  };

  // const handlePostClick = (postId) => {
  //   router.push(`/posts/${postId}`);
  // };

  
  const handleEditPost = async (postId, updatedPostData) => {
    try {
        const baseUrl = window.location.protocol + '//' + window.location.host;
        const apiUrl = `${baseUrl}/api/post/${postId}`;
        const res = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        });

        if (!res.ok) {
            const errorMessage = `Failed to edit post: ${res.statusText}`;
            throw new Error(errorMessage);
        }

        const updatedPost = JSON.parse(responseData);
        return updatedPost;
    } catch (error) {
        throw error;
    }
};

const handleDeletePost = async (postId) => {
  const baseUrl = window.location.protocol + '//' + window.location.host;
  const apiUrl = `${baseUrl}/api/post?id=${postId}`;
  const confirmed = confirm('Are you sure?');
  
  if (confirmed) {
      const res = await fetch(apiUrl, {
          method: 'DELETE',
      });

      if (res.ok) {
          alert('Post deleted successfully.');
          router.push('/');
      } else {
          alert('Failed to delete post.');
      }
  }
};

  const handleCommentSubmit = async (commentData) => {
    try {
      const apiUrl = '/api/comments';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      setSelectedPost(null);
      setShowCommentForm(false);
    } catch (error) {
      alert('Failed to submit comment. Please try again later.');
    }
  };

  // Filter posts based on the search query
  const filteredPosts = postsData.posts ? postsData.posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen grid grid-rows-3 gap-8 ml-2 p-10 ">
      <div className="bg-indigo-600 text-white py-6 px-8 text-center">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          switchToListView={switchToListView}
          switchToGridView={switchToGridView}
        />
      </div>
      <ScrollToTopButton />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {selectedPost && showCommentForm ? (
            <div className="border-2 border-white border-gray-200 rounded-md p-6">
              {selectedPost.image && (
                <div className="mt-2">
                  <Image
                    src={`data:${selectedPost.image.contentType};base64,${Buffer.from(selectedPost.image.data).toString("base64")}`}
                    alt="Image"
                    width={600}
                    height={250}
                  />
                </div>
              )}
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
              <div className="mt-4">
                <CommentForm onSubmit={handleCommentSubmit} />
              </div>
            </div>
          ) : (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-3" : "grid-cols-2"} gap-4`} style={{ height: viewMode === "list" ? "300px" : "auto" }}>
              {filteredPosts.map(post => (
                <div key={post._id} className=" p-4 border rounded-md cursor-pointer shadow-md hover:shadow-lg" onClick={() => handlePostClick(post._id)}>
                  {post.image && (
                    <div className="mt-2">
                      <Image
                        src={postsData.imageSources[post._id]}
                        alt="Image"
                        width={600}
                        height={250}
                      />
                    </div>
                  )}
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