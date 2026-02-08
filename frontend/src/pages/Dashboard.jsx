// frontend\src\pages\Dashboard.jsx
import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      {/* ===== TOP HEADER ===== */}
      <header className="top-header">
        <div className="header-title">Social Feed</div>

        <div className="account-wrapper">
          <div
            className="avatar"
            onClick={() => setShowLogout((p) => !p)}
          >
            Me
          </div>

          {showLogout && (
            <div className="logout-dropdown" onClick={logout}>
              Logout
            </div>
          )}
        </div>
      </header >

      {/* ===== FEED ===== */}
      < main className="feed-container" >
        <CreatePost setPosts={setPosts} />

        <div className="feed">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              setPosts={setPosts}
            />
          ))}
        </div>
      </main >
    </>
  );
};

export default Dashboard;
