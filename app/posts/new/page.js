"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postCreated, setPostCreated] = useState(false);
  const router = useRouter();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      console.error('Title and content cannot be empty');
      return;
    }

    try {
      const baseUrl = window.location.protocol + '//' + window.location.host;
      const apiUrl = `${baseUrl}/api/posts`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        console.log('Post created successfully!');
        setPostCreated(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        console.error('Error creating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h1>
      {postCreated && (
        <div className="mb-4 text-green-600 font-semibold">
          Post created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={handleTitleChange} 
            required 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <textarea 
            id="content" 
            value={content} 
            onChange={handleContentChange} 
            required 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200 text-gray-800"
          />
        </div>
        <button 
          type="submit" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default NewPostPage;
