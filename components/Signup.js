"use client"
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send registration data to server
      const response = await axios.post('/api/register', { username, password });
      if (response.status === 201) {
        // Registration successful
        setMessage('Registration successful');
        // Redirect user to login page
        window.location.href = '/login';
      }
    } catch (error) {
      // Handle registration error
      setMessage('Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Register;
