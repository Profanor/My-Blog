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
  
  const handleGoBack = () => {
    router.push('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Title and content cannot be empty');
      return;
    }

    const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
      formData.append('image', image);
      }
      
      try {
        const response = await fetch('/api/posts', {  
          method: 'POST',
          body: formData,
        }); 

      if (response.ok) {
        setPostCreated(true);
        setTimeout(() => {
          router.push('/posts');
          setTitle(''); 
          setContent(''); 
          setImage(null);
    }, 2000);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
      alert('Failed to create post. Please try again later.');
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
        {image && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Preview:</label>
            <img src={URL.createObjectURL(image)} alt="Image Preview" className="mt-1 w-full h-auto" />
          </div>
        )}

        <button 
          type="submit" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
          Create Post
        </button>
        <button 
          type="button"
          onClick={handleGoBack}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ml-60">
          Go Back
        </button>
      </form>
    </div>
  );
};

export default NewPostPage;
