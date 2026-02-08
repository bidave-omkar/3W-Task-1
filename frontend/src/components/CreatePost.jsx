// frontend\src\components\CreatePost.jsx
import React, { useState } from "react";
import "../styles/post.css";

const CreatePost = ({ setPosts }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submitPost = async () => {
    if (!text && !image) {
      alert("Text or image required");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const data = await res.json();
    setPosts((prev) => [data, ...prev]);

    setText("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="create-post">
      <textarea
        placeholder="what's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {preview && <img src={preview} className="preview" />}

      <div className="create-actions">
        <label className="media-btn">
          <input type="file" accept="image/*" hidden onChange={handleImage} />
          📸 Image
        </label>

        <button className="post-btn" onClick={submitPost}>
          Post
        </button>
      </div>
    </div>
  );

};

export default CreatePost;
