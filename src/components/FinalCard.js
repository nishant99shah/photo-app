import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import html2canvas from "html2canvas";
import Homesvg from "../svgs/Homesvg";
import Savesvg from "../svgs/Savesvg";
import ShareSvg from "../svgs/ShareSvg";
import {cloudinaryCloudName} from "../App";

const FinalCard = () => {
  const navigate = useNavigate();
  const [editName, setEditName] = useState("");
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [publicId, setPublicId] = useState("");

  useEffect(() => {
    const fetchData = () => {
      setEditName(localStorage.getItem("username"));
      setImage(localStorage.getItem("image"));
    };
    fetchData();

    if (image !== "" && editName !== "") {
      uploadDataToServer();
    }
  }, [image, editName]);

  const uploadDataToServer = async () => {
    const cardElement = document.getElementById("card-container");
    const canvas = await html2canvas(cardElement);

    const dataUrl = canvas.toDataURL("image/png");
    const formData = new FormData();
    formData.append("file", dataUrl);
    formData.append("upload_preset", "newrandom");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setPublicId(data.public_id);
  };

  const home = () => {
    navigate("/");
    localStorage.clear();
  };

  const handleDownload = () => {
    const cardElement = document.getElementById("card-container");

    html2canvas(cardElement)
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "card.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error generating canvas:", error);
      });
  };

  const handleCopyLink = () => {
    const myCardShare = `${window.location.origin}/share?imgkey=${publicId}`;
    if (myCardShare) {
      navigator.clipboard
        .writeText(myCardShare)
        .then(() => {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error copying share URL to clipboard:", error);
        });
    }
  };

  return (
    <div className="card" id="card-container">
      <h2>Edit Greeting</h2>
      <div className="image-container">
        {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      </div>
      <div className="card-name">
        <p style={{margin: "auto", color: "white"}}>- {editName}</p>
      </div>
      <div className="all-button">
        <button onClick={home} className="btn-css">
          <Homesvg />
          home
        </button>

        <button onClick={handleDownload} className="btn-css">
          <Savesvg />
          download
        </button>
        <button onClick={handleCopyLink} className="btn-css">
          <ShareSvg />
          share
        </button>
        {showPopup && <div className="popup">Link copied to clipboard</div>}
      </div>
    </div>
  );
};

export default FinalCard;
