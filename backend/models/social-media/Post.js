const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, default: null },
    images: [
      {
        type: String,
      },
    ],
    tags: [{ type: String }],
    category: { type: String, default: 'Uncategorized' },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
