"use client";

import { useState } from 'react';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Function to handle changes in the title input field
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle changes in the content input field
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // Function to handle form submission (creating a new post)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation (e.g., check if title and content are not empty)

    try {
      // Make a fetch request to your backend API endpoint to create the new post
      const response = await fetch('https://api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Redirect to the page showing all posts or display a success message
        // You can use router.push('/posts') for client-side navigation in Next.js
        console.log('Post created successfully!');
      } else {
        // Handle errors (e.g., display an error message)
        console.error('Error creating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" value={content} onChange={handleContentChange} required />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default NewPostPage;