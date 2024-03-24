import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CommentForm from '@/components/Comment';

const PostPage = () => {
    const router = useRouter();
    const { postId } = router.query;
    console.log("Received postId:", postId);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}`);
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
            <h1>{post.title}</h1>
            {post.image && (
                <div className="mt-2">
                    <Image
                        src={`data:${post.image.contentType};base64,${Buffer.from(post.image.data).toString("base64")}`}
                        alt="Image"
                        width={600}
                        height={250}
                    />
                </div>
            )}
            <p>{post.content}</p>
            <div className="mt-4">
                <CommentForm postId={postId} />
            </div>
        </div>
    );
};

export default PostPage;
