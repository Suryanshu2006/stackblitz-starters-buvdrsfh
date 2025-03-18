const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  message: { type: String, required: true }, 
  commentedAt: { type: Date, default: Date.now } 
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 5 
  },
  content: {
    type: String,
    required: true,
    minlength: 50 
  },
  author: String, 
  tags: [String], 
  category: {
    type: String,
    default: "General" 
  },
  likes: [String], 
  createdAt: {
    type: Date,
    default: Date.now 
  },
  updatedAt: Date,
  comments: [commentSchema] 
});


blogPostSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
