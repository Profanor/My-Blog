import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';


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
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
        <div className="text-white text-center mb-8">
          <h1 className="text-6xl font-bold mb-4">
            Welcome to <span className='text-orange-600'>Apex</span> Blog
          </h1>
          <p className="text-xl mb-8">
            <Link href="/posts" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
                View Posts
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Video;
