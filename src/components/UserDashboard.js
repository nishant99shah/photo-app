/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useRef, useState} from "react";
import AvatarEditor from "react-avatar-editor";
import CameraSvg from "./svg";
import cardImage from "../img/cardBg.png";
import circleImage from "../img/circle.png";
import Homesvg from "./Homesvg";
import Savesvg from "./Savesvg";
import ImgEditSvg from "./ImgEditSvg";
import ShareSvg from "./ShareSvg";
import html2canvas from "html2canvas";
import {ImageUploader} from "cloudinary-react";
import {cloudinaryApiKey, cloudinaryCloudName} from "../App";
import {useNavigate} from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const fileInputRef = useRef();
  const containerRef = useRef(null);
  const uploaderRef = useRef();
  const [photo, setPhoto] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [editor, setEditor] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [editText, setEditText] = useState("");
  const [saveTrigger, setSaveTrigger] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [extraBtns, setExtraBtns] = useState(true);
  const [hideEdit, setHideEdit] = useState(true);
  const [finalBtns, setFinalBtns] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [activateShare, setActivateShare] = useState(true);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (window.URL && window.URL.createObjectURL) {
      // Generate a temporary URL for the selected file
      const url = window.URL.createObjectURL(file);
      setImageUrl(url);
      setExtraBtns(false);
    } else {
      // Handle unsupported createObjectURL
      console.error("createObjectURL is not supported in this browser.");
    }

    // Check if the selected file is an image
    if (file && file.type.startsWith("image/")) {
      // Generate a temporary URL for the selected image
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      // Handle unsupported file type
      console.error("Unsupported file type. Please select an image.");
    }
  };

  const handlePhotoUpload = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(URL.createObjectURL(selectedPhoto));
  };

  const handleZoomChange = (value) => {
    setZoom(value);
  };

  const handleRotationChange = (value) => {
    setRotation(value);
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL("image/jpeg");
      // Do something with the canvas image, such as saving it or uploading it to a server
      setCroppedImage(canvas);
    }
    setShowControls(false);
    setSaveTrigger(true);
    setFinalBtns(true);
  };

  const handleSubmit = async () => {
    const canvas = await html2canvas(containerRef.current);

    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL("image/png");
    const formData = new FormData();
    formData.append("file", dataUrl);
    formData.append("upload_preset", "newrandom");
    // Upload the image to Cloudinary using fetch
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setActivateShare(false);
    const pubId = data.public_id;
    setPublicId(pubId);
    console.log(publicId, "free public id");
  };

  const handleControls = () => {
    setHideEdit(false);
    setShowControls(true);
  };

  const handlePngDownload = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        // Create a link element to download the image
        const link = document.createElement("a");
        link.href = image;
        link.download = "image.png";
        link.click();
      });
    }
  };

  const handleSaveClick = () => {
    if (uploaderRef.current) {
      uploaderRef.current.upload();
    }
  };

  const handleShare = () => {
    const shareUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${publicId}`;
    const myCardShare = `${window.location.origin}/final?imgkey=${publicId}`;
    if (myCardShare) {
      navigator.clipboard
        .writeText(myCardShare)
        .then(() => {
          console.log("Share URL copied to clipboard:", myCardShare);
        })
        .catch((error) => {
          console.error("Error copying share URL to clipboard:", error);
        });
    }
    setImageUrl(shareUrl);
    console.log(shareUrl);
  };

  return (
    <div className="main-card">
      <p className="card-title">Edit Greeting</p>
      <div className="card-head" ref={containerRef}>
        {imageUrl ? (
          <>
            <AvatarEditor
              image={imageUrl}
              // ref={fileInputRef}
              ref={(ref) => setEditor(ref)}
              border={0}
              borderRadius={50}
              color={[255, 255, 255, 0.6]} // RGBA
              // scale={1.2}
              // rotate={0}
              scale={zoom}
              rotate={rotation}
              style={{
                height: "33%",
                width: "53%",
                borderRadius: "50%",
                zIndex: 2,
                position: "relative",
                top: 135,
                left: 70,
              }}
            />
          </>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{display: "none"}}
              onChange={handleFileSelect}
            />
            {/* <div onClick={handleButtonClick}> */}
            <img
              src={circleImage}
              alt="pop"
              onClick={() => fileInputRef.current.click()}
              className="circle-img"
            />
            <span
              onClick={() => fileInputRef.current.click()}
              className="add-text"
            >
              <CameraSvg /> add photo
            </span>
          </>
        )}

        <img src={cardImage} alt="pop" className="card-main" />
        <input
          type="text"
          value={editText}
          onChange={() => setEditText()}
          placeholder="- edit text"
          className="editText"
        />
      </div>
      {extraBtns && (
        <>
          <div className="btn-div">
            <button className="btn-css" onClick={() => navigate("/")}>
              <Homesvg /> home
            </button>
            <button className="btn-css" onClick={handleSave}>
              <Savesvg /> save
            </button>
          </div>
        </>
      )}

      {imageUrl && hideEdit && (
        <button className="btn-css" onClick={handleControls}>
          <ImgEditSvg /> edit photo
        </button>
      )}
      {showControls && (
        <div className="controls">
          <div className="elements">
            <label>Zoom:</label>
            <input
              type="range"
              min={0.1}
              max={2}
              step={0.1}
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
            />
          </div>
          <div className="elements">
            <label>Rotation:</label>
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(e) => handleRotationChange(parseFloat(e.target.value))}
            />
          </div>
          <button className="btn-css " onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      {finalBtns && (
        <>
          <button className="btn-css" onClick={() => navigate("/")}>
            <Homesvg /> home
          </button>
          <button className="btn-css" onClick={handlePngDownload}>
            <Savesvg /> download
          </button>
          <button
            className="btn-css"
            disabled={activateShare}
            onClick={handleShare}
          >
            <ShareSvg /> share
          </button>
        </>
      )}
    </div>

    // </div>
  );
};

export default UserDashboard;
