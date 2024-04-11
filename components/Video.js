import React from 'react';
import Link from 'next/link';
import Register from './Signup';

const Video = () => {
  return (
    <section className="relative w-full h-screen">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover absolute inset-0"
        src="/images/bg.mp4"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="text-white text-center">
          <h1 className="text-6xl font-bold mb-4">Welcome to <span className='text-orange-600'> Apex </span>Blog</h1>
          <p className="text-xl mb-8"> 
          <Link href="/posts" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            > view posts
          </Link>
          </p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
        <Register />
      </div>
      </div>
    </section>
  );
};

export default Video;
