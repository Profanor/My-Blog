import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const EditPostPage = () => {
    const { id } = useParams(); 
    console.log("Received postId:", id);

    const router = useRouter();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`/api/post/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const postData = await response.json();
                setPost(postData.post);
                setTitle(postData.post.title);
                setContent(postData.post.content);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError('Failed to fetch post');
                setLoading(false);
            }
        };

        if (id) {
            fetchPostData();
        }
    }, [id]);

    const handleEditPost = async () => {
        try {
            const res = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newTitle: title, newContent: content }),
            });

            if (!res.ok) {
                throw new Error('Failed to edit post');
            }

            router.push(`/post/${id}`);
        } catch (error) {
            console.error('Error editing post:', error);
            setError('Failed to edit post');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleEditPost(); }}>
                <div>
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditPostPage;
