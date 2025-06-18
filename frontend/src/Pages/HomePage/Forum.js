import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/forum');
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!title || !message) return;

    try {
      await axios.post('/api/forum/create', {
        title,
        message,
        user: 'Anonymous',
      });
      setSuccessMessage('Post submitted successfully!');
      setTitle('');
      setMessage('');
      fetchPosts();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* Forum Header Section */}
      <section className="py-16 bg-gradient-to-l from-white to-green-300 text-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold">Discussion Forum</h3>
          <p className="mt-4 text-lg">Ask questions, share ideas, and connect with other learners!</p>
        </div>
      </section>

      {/* Forum Content Section: Form + Posts Side-by-Side */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          
          {/* New Post Form */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">Create a New Post</h3>
            <form onSubmit={handlePost} className="space-y-4 bg-green-50 p-6 rounded-xl shadow-md">
              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Post
              </button>
              {successMessage && (
                <p className="text-green-600 font-medium mt-2">{successMessage}</p>
              )}
            </form>
          </div>

          {/* Forum Posts */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">Recent Discussions</h3>
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold text-green-600">{post.title}</h4>
                    <p className="mt-2 text-gray-700">{post.message}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Posted by {post.user} on {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No posts yet. Be the first to start a discussion!</p>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Forum;
