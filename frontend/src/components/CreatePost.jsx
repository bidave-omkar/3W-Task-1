import React, { useState } from "react";
import "../styles/post.css";

const CreatePost = ({ setPosts }) => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submitPost = async () => {
    if (!text && !media) {
      alert("Text or image/video required");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("text", text);
    if (media) formData.append("media", media);

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    setPosts((prev) => [data, ...prev]);

    setText("");
    setMedia(null);
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
          <input type="file" accept="image/*" hidden onChange={handleMedia} />
          📸 Media
        </label>

        <button className="post-btn" onClick={submitPost}>
          Post
        </button>
      </div>
    </div>
  );

};

export default CreatePost;
