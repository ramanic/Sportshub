const express = require("express");
var router = express.Router();
const auth = require("../../middleware/auth");
const { JsonResponse, JsonResponseWithMSG } = require("../../utils/JsonResponse");
const { MulterUpload, CloudinaryUpload } = require("../../utils/ImageManager");
const Post = require("../../models/social-media/Post");
const Comment = require("../../models/social-media/Comment");
const User = require("../../models/common/User");

const fs = require("fs");
const { addNotification } = require("../../utils/Notification");
const { checkPreference } = require("../../utils/PreferenceManager");
router.post("/add", [auth.authUser, MulterUpload.array("images")], async (req, res) => {
  let { caption, tags, category } = req.body;

  if (tags) {
    tags = JSON.parse(tags);
  }
  // if (!caption) {
  //   res.status(400).json(JsonResponse(false, "Caption is required"));
  // }
  let files = req.files;

  try {
    let post = await Post.create({
      caption,
      tags,
      category,
      author: req.user.user_id,
    });
    images = [];
    for (const file of files) {
      const { path } = file;
      try {
        imagePath = await CloudinaryUpload(path);
        if (imagePath) {
          images.push(imagePath.url);
        }
        fs.unlinkSync(path);
      } catch (error) {
        console.log(error);
      }
    }
    post.images = images;
    await post.save().then((post) => post.populate("author"));
    res.status(200).json(JsonResponse(true, post));
  } catch (error) {
    res.status(500).json(JsonResponse(false, error.message));
  }
});

router.get("/all", auth.authUserPublic, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // execute query with page and limit values
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({ path: "author", select: "name username profile.photo" })
      .populate({ path: "likes", select: "name username profile.photo" })
      .populate("comments")
      .populate("saves")
      .populate({
        path: "comments",
        populate: { path: "author", select: "name username profile.photo" },
      })
      .sort("-createdAt")
      .exec();

    // get total documents in the Posts collection
    const count = await Post.countDocuments();

    // return response with posts, total pages, and current page
    let finalPost = posts;
    if (req.user) {
      let user = await User.findOne({ _id: req.user.user_id });
      let preferePost = posts.filter((post) => {
        return checkPreference(post.tags, user.profile.preferences);
      });
      let notPreference = posts.filter((post) => {
        return !checkPreference(post.tags, user.profile.preferences);
      });
      finalPost = preferePost.concat(notPreference);
    }
    res.json(
      JsonResponse(true, {
        posts: finalPost,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});
router.get("/friends", auth.authUser, async (req, res) => {
  try {
    // execute query with page and limit values
    let posts = await Post.find()
      .populate({ path: "author", select: "name username profile.photo _id" })
      .populate({ path: "likes", select: "name username profile.photo" })
      .populate("comments")
      .populate("saves")
      .populate({
        path: "comments",
        populate: { path: "author", select: "name username profile.photo" },
      })
      .sort("-createdAt")
      .exec();

    let user = await User.findOne({ _id: req.user.user_id });
    let friends = user.profile.friends
      .filter((friend) => {
        return friend.status === "accepted";
      })
      .map((friend) => friend.user.toString());
    console.log(friends);
    posts = posts.filter((post) => {
      console.log(post.author._id);
      console.log(friends.includes(post.author._id));
      return friends.includes(post.author._id.toString());
    });

    // get total documents in the Posts collection
    // return response with posts, total pages, and current page
    res.json(
      JsonResponse(true, {
        posts,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});
router.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let post = await Post.findOne({ _id: id })
      .populate({ path: "author", select: "name username profile.photo" })
      .populate({ path: "likes", select: "name username profile.photo" })
      .populate({ path: "saves", select: "name username profile.photo" })
      .populate("comments")
      .populate({
        path: "comments",
        populate: { path: "author", select: "name username profile.photo" },
      });
    if (post) {
      res.json(JsonResponse(true, post));
    } else {
      res.json(JsonResponse(false, "Post not found"));
    }
  } catch {
    res.json(JsonResponse(false, "Post not found"));
  }
});
router.post("/delete/:id", auth.authUser, async (req, res) => {
  const { id } = req.params;
  let post = await Post.findOne({ _id: id });
  if (post) {
    let user = await User.findOne({ _id: req.user.user_id });

    if (post.author == req.user.user_id || user.role === "admin") {
      await post.remove();
      await Comment.deleteMany({ post: id });
      res.json(JsonResponse(true, "Post deleted"));
    } else {
      res.json(JsonResponse(false, "You are not authorized to delete this post"));
    }
  } else {
    res.json(JsonResponse(false, "Post not found"));
  }
});

router.post("/like/:id", auth.authUser, async (req, res) => {
  const { id } = req.params;
  let user = await User.findOne({ _id: req.user.user_id });

  try {
    let post = await Post.findOne({ _id: id });

    if (post) {
      let likes = post.likes;

      if (likes.includes(req.user.user_id)) {
        post.likes.pull(req.user.user_id);
        await post.save();
        let post2 = await Post.findOne({ _id: id })
          .populate({ path: "author", select: "name username profile.photo" })
          .populate({ path: "likes", select: "name username profile.photo" })
          .populate("saves")
          .populate("comments")
          .populate({
            path: "comments",
            populate: { path: "author", select: "name username profile.photo" },
          });
        res.json(JsonResponseWithMSG(true, "Post Unliked", post2));
      } else {
        post.likes.push(req.user.user_id);
        await post.save();
        let post2 = await Post.findOne({ _id: id })
          .populate({ path: "author", select: "name username profile.photo" })
          .populate({ path: "likes", select: "name username profile.photo" })
          .populate("saves")
          .populate("comments")
          .populate({
            path: "comments",
            populate: { path: "author", select: "name username profile.photo" },
          });
        addNotification(post.author._id, ` ${user.name} liked your post.`, "like", id);
        res.json(JsonResponseWithMSG(true, "Post Liked", post2));
      }
    } else {
      res.json(JsonResponse(false, "Post not found"));
    }
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});
router.post("/save/:id", auth.authUser, async (req, res) => {
  const { id } = req.params;
  try {
    let post = await Post.findOne({ _id: id });
    if (post) {
      let user = await User.findOne({ _id: req.user.user_id });
      if (user.profile.saved.posts.includes(id)) {
        user.profile.saved.posts.pull(id);
        await user.save();
        post.saves.pull(req.user.user_id);
        await post.save();
        post = await Post.findOne({ _id: id })
          .populate({ path: "author", select: "name username profile.photo" })
          .populate({ path: "likes", select: "name username profile.photo" })
          .populate("saves")
          .populate("comments")
          .populate({
            path: "comments",
            populate: { path: "author", select: "name username profile.photo" },
          });

        res.json(JsonResponseWithMSG(true, "Post Unsaved", post));
      } else {
        user.profile.saved.posts.push(id);
        await user.save();
        user = await User.findOne({
          _id: req.user.user_id,
        });
        post.saves.push(req.user.user_id);
        await post.save();
        post = await Post.findOne({ _id: id })
          .populate({ path: "author", select: "name username profile.photo" })
          .populate({ path: "likes", select: "name username profile.photo" })
          .populate("saves")
          .populate("comments")
          .populate({
            path: "comments",
            populate: { path: "author", select: "name username profile.photo" },
          });
        res.json(JsonResponseWithMSG(true, "Post Saved", post));
      }
    } else {
      res.json(JsonResponse(false, "Post not found"));
    }
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

router.post("/comment/:id", auth.authUser, async (req, res) => {
  const { id } = req.params;
  let { comment } = req.body;

  try {
    let post = await Post.findOne({ _id: id });
    let user = await User.findOne({ _id: req.user.user_id });

    if (post) {
      let newComment = await Comment.create({
        comment,
        author: req.user.user_id,
        post: id,
      });

      post.comments.push(newComment._id);

      await post.save();
      post = await Post.findOne({ _id: id })
        .populate({ path: "author", select: "name username profile.photo" })
        .populate({ path: "likes", select: "name username profile.photo" })
        .populate("saves")
        .populate("comments")
        .populate({
          path: "comments",
          populate: { path: "author", select: "name username profile.photo" },
        });

      await addNotification(
        post.author._id,
        ` ${user.name} commented on your post.`,
        "comment",
        id
      );

      res.json(JsonResponseWithMSG(true, "Comment successfully posted.", post));
    } else {
      res.json(JsonResponse(false, "Post not found"));
    }
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

router.post("/comment/:id/delete", auth.authUser, async (req, res) => {
  const { id } = req.params;

  let comment = await Comment.findOne({ _id: id });
  let user = await User.findOne({ _id: req.user.user_id });
  if (comment) {
    if (comment.author == req.user.user_id || user.role === "admin") {
      let postId = comment.post;
      await comment.remove();
      let post = await Post.findOne({ _id: postId });
      post.comments.pull(id);
      await post.save();
      post = await Post.findOne({ _id: postId })
        .populate({ path: "author", select: "name username profile.photo" })
        .populate({ path: "likes", select: "name username profile.photo" })
        .populate("saves")
        .populate("comments")
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: "name username profile.photo",
          },
        });
      res.json(JsonResponseWithMSG(true, "Comment deleted", post));
    } else {
      res.json(JsonResponse(false, "You are not authorized to delete this post"));
    }
  } else {
    res.json(JsonResponse(false, "Comment not found."));
  }
});

module.exports = router;
