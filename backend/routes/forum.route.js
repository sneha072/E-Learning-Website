// routes/forum.route.js
import express from 'express';
import ForumPost from '../models/ForumPost.js';

const router = express.Router();

// Create a new post
router.post('/create', async (req, res) => {
  const { title, message, user } = req.body;

  try {
    const newPost = new ForumPost({ title, message, user });
    await newPost.save();
    res.json({ success: true, message: "Post created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create post", error });
  }
});

// Get all posts (including replies)
router.get('/', async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .sort({ createdAt: -1 })
      .lean(); // Optional: makes queries faster by skipping mongoose document overhead
    res.json(posts);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch posts", error });
  }
});

// Add a reply to a post
router.post('/:id/reply', async (req, res) => {
  const { message, user } = req.body;

  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    post.replies.push({ message, user });
    await post.save();
    res.json({ success: true, message: "Reply added" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add reply", error });
  }
});

export default router;
