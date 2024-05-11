"use client"
import { useParams } from 'next/navigation'; 
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CommentForm from '@/components/Comment';

const PostPage = () => {
    const { postId } = useParams(); 
    console.log("Received postId:", postId);

    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`/api/post/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const postData = await response.json();
                setPost(postData.post); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError('Failed to fetch post');
                setLoading(false);
            }
        };
        if (postId) {
            fetchPostData();
        } 
    }, [postId]); 

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
              router.push('/posts');
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

      const handleGoBack = async () => {
        router.push('/posts');
      };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!post) {
        return <p>No post found.</p>;
    }

    return (
        <div>
            <h1 className="mt-20 text-center text-2xl font-semibold">{post.title}</h1>
            {post.image && (
                <div className="mt-4 flex justify-center">
                    <Image
                        src={`data:${post.image.contentType};base64,${Buffer.from(post.image.data).toString("base64")}`}
                        alt="Image"
                        width={600}
                        height={250}
                    />
                </div>
            )}
            <p className="mt-10 text-center">{post.content}</p>
              <div className="flex mt-4 justify-center">
                <button onClick={() => handleEditPost(post._id)} className="px-4 py-2 bg-indigo-800 text-white rounded-md mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeletePost(post._id)} className="px-4 py-2 bg-red-800 text-white rounded-md">
                  Delete
                </button>
              </div>
              <div className="mt-4 flex justify-center">
              <button onClick={() => handleGoBack(post._id)} className="mt-4 px-4 py-2 bg-indigo-800 text-white rounded-md">
                Back to Posts
              </button>
              </div>
              <div className="mt-8 flex justify-center">
                <CommentForm onSubmit={handleCommentSubmit} />
              </div>
        </div>
    );
};

export default PostPage;
