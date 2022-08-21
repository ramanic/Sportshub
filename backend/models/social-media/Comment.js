const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
