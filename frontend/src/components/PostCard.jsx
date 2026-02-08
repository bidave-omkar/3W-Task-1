// frontend\src\components\PostCard.jsx
import React, { useState } from "react";
import "../styles/post.css";

const PostCard = ({ post, setPosts }) => {
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState({
    likes: false,
    comments: false,
  });

  const token = localStorage.getItem("token");

  /* LIKE / UNLIKE */
  const likePost = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/posts/${post._id}/like`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedPost = await res.json();

    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  /* ADD COMMENT */
  const addComment = async () => {
    if (!comment.trim()) return;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: comment }),
      }
    );

    const updatedPost = await res.json();

    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );

    setComment("");
    setExpanded((e) => ({ ...e, comments: true }));
  };

  return (
    <div className="post-card linkedin">
      {/* HEADER */}
      <div className="post-header">
        <div className="avatar">
          {post.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="post-user">{post.username}</div>
          <div className="post-time">
            {new Date(post.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {post.text && <p className="post-text">{post.text}</p>}
      {post.image && (
        <img src={post.image} alt="Post media" />
      )}

      {/* ACTIONS */}
      <div className="post-actions clean">
        <button onClick={likePost} className="action-btn">
          ❤️ <span>{post.likes.length}</span>
        </button>

        <button
          onClick={() =>
            setExpanded((e) => ({ ...e, likes: !e.likes }))
          }
          className="action-btn link"
        >
          (View Likes)
        </button>

        <button
          onClick={() =>
            setExpanded((e) => ({ ...e, comments: !e.comments }))
          }
          className="action-btn"
        >
          💬 <span>{post.comments.length}</span>
        </button>
      </div>

      {/* LIKES LIST */}
      {expanded.likes && (
        <div className="likes-list">
          <div className="section-title">Liked by</div>

          {post.likes.length === 0 ? (
            <div className="empty-text">No likes yet</div>
          ) : (
            post.likes.map((like) => (
              <div key={like.userId} className="user-row">
                {like.username}
              </div>
            ))
          )}
        </div>
      )}

      {/* COMMENTS LIST */}
      {expanded.comments && (
        <div className="comments-list">
          <div className="section-title">Comments</div>

          {post.comments.length === 0 ? (
            <div className="empty-text">No comments yet</div>
          ) : (
            post.comments.map((c, i) => (
              <div key={i} className="comment-row">
                <div className="comment-user">{c.username}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            ))
          )}
        </div>
      )}

      {/* COMMENT INPUT */}
      <div className="comment-box">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>Post</button>
      </div>
    </div>
  );
};

export default PostCard;
