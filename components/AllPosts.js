"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchBar from './SearchBar';
import ScrollToTopButton from './Scroll/ScrollToTopButton';

const AllPostsPage = () => {
  const [postsData, setPostsData] = useState({ posts: [], imageSources: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

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
    router.push(`/posts/${postId}`);
  };

  // Filter posts based on the search query
  const filteredPosts = postsData.posts ? postsData.posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen grid grid-rows-3 gap-8 ml-2 p-10">
      <div className="bg-dark text-white py-6 px-8 text-center shadow-md hover:shadow-lg transition duration-300">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          switchToListView={switchToListView}
          switchToGridView={switchToGridView}
        />
        <div className='flex justify-between'>
          <Image src="/images/pikachu.png" alt="image" className='mt-4' width={200} height={200} />
          <div className="w-8"></div>
          <Image src="/images/pika1.png" alt="image" className='' width={200} height={200} />
          <ScrollToTopButton />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={`grid ${viewMode === "grid" ? "grid-cols-5" : "grid-cols-2"} gap-4`} style={{ height: viewMode === "list" ? "200px" : "auto" }}>
          {filteredPosts.map(post => (
            <div
              key={post._id}
              className={`post-cont border-0 flex flex-col w-full h-auto transition-transform duration-300 ${viewMode === "grid" ? "hover:shadow-lg transform hover:scale-110 cursor-pointer" : "cursor-default"}`}
              onClick={viewMode === "grid" ? () => handlePostClick(post._id) : undefined}
            >
              {post.image && (
                <div className="h-auto">
                  <Image
                    src={postsData.imageSources[post._id]}
                    alt="Image"
                    width={300}
                    height={300}
                    layout="responsive"
                    objectFit="cover"
                    className="img-cont w-full h-full"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold overflow-hidden p-3">{post.title}</h2>
              <p className="mt-2 overflow-hidden p-3">Read More</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPostsPage;
