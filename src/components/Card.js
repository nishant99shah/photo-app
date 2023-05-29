import React, {useRef, useState} from "react";
import {useNavigate} from "react-router";
import circle from "../images/circle.png";
import Homesvg from "../svgs/Homesvg";
import Savesvg from "../svgs/Savesvg";
import CameraSvg from "../svgs/CameraSvg";

const Card = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [editName, setEditName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const home = () => {
    navigate("/");
    localStorage.clear();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImageUrl(base64String);
      localStorage.setItem("image", base64String);
    };
    reader.readAsDataURL(file);
  };
  const handleSave = () => {
    localStorage.setItem("username", editName);
    navigate("/cardedit");
  };

  return (
    <div className="card">
      <h2>Edit Greeting</h2>
      <div className="image-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          ref={fileInputRef}
          style={{display: "none"}}
        />

        {!imageUrl ? (
          <>
            <img
              src={circle}
              alt="Card"
              className="circle"
              onClick={() => fileInputRef.current.click()}
            />
            <span onClick={() => fileInputRef.current.click()}>
              <CameraSvg /> Add Photo
            </span>
          </>
        ) : (
          <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
        )}
      </div>
      <div className="card-name">
        <input
          className="edit-name"
          placeholder="- Edit Name"
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </div>
      <div className="all-button">
        <button onClick={home} className="btn-css">
          <Homesvg /> home
        </button>
        <button onClick={handleSave} className="btn-css">
          <Savesvg /> save
        </button>
      </div>
    </div>
  );
};

export default Card;
