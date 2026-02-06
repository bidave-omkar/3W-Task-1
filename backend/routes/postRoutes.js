const express = require("express");
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* ===== MULTER CONFIG ===== */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/* ===== CREATE POST ===== */
router.post(
  "/",
  protect,
  upload.single("media"),
  async (req, res) => {
    const { text } = req.body;

    if (!text && !req.file) {
      return res
        .status(400)
        .json({ message: "Text or image/video required" });
    }

    const user = await User.findById(req.user).select("email");

    const post = await Post.create({
      user: req.user,
      username: user.email,
      text,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json(post);
  }
);

/* ===== GET FEED ===== */
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
