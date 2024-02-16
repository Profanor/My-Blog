"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postCreated, setPostCreated] = useState(false); // State to track if post was created successfully
  const [image, setImage] = useState(null);

  const router = useRouter();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation (e.g., check if title and content are not empty)
    if (!title.trim() || !content.trim()) {
      alert('Title and content cannot be empty');
      return;
    }

    const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
      formData.append('image', image, image.name);
      }
      
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setPostCreated(true); // Set state to indicate post was created successfully
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
      {postCreated && ( // Display success message if post was created successfully
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
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
          <input 
            type="file" 
            id="image" 
            onChange={handleImageChange} 
            accept="image/*" 
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
