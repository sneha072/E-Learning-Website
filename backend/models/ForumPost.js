// models/ForumPost.js
import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  message: String,
  user: String, // Just a name or email for now
  createdAt: { type: Date, default: Date.now }
});

const forumPostSchema = new mongoose.Schema({
  title: String,
  message: String,
  user: String,
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ForumPost', forumPostSchema);
