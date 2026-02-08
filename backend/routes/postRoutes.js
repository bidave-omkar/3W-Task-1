const express = require("express");
const path = require("path");
const Post = require("../models/Post");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");   
const cloudinary = require("../config/cloudinary");

const router = express.Router();

/* ================= CREATE POST ================= */
router.post(
  "/",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      const { text } = req.body;

      if (!text && !req.file) {
        return res.status(400).json({ message: "Post cannot be empty" });
      }

      let imageUrl = null;

      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "social_posts" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });

        imageUrl = uploadResult.secure_url;
      }

      const post = await Post.create({
        user: req.user.id,
        username: req.user.email,
        text,
        image: imageUrl,
      });

      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= GET POSTS ================= */
router.get("/", protect, async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

/* ===== LIKE / UNLIKE ===== */
router.post("/:id/like", protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.user).select("email");

  const liked = post.likes.find(
    (l) => l.userId.toString() === req.user
  );

  if (liked) {
    post.likes = post.likes.filter(
      (l) => l.userId.toString() !== req.user
    );
  } else {
    post.likes.push({
      userId: req.user,
      username: user.email,
    });
  }

  await post.save();
  res.json(post);
});

/* ===== COMMENT ===== */
router.post("/:id/comment", protect, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Comment required" });

  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.user).select("email");

  post.comments.push({
    userId: req.user,
    username: user.email,
    text,
  });

  await post.save();
  res.json(post);
});

module.exports = router;
