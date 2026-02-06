const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String // file path like /uploads/abc.jpg
    },
    likes: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
      },
    ],
    comments: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
