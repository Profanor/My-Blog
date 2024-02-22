"use client";
import { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, comment });
    // Reset form fields
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Your Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:border-indigo-500"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
