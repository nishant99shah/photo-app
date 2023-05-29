import React, {useEffect, useState} from "react";
import AvatarEditor from "react-avatar-editor";
import {useNavigate} from "react-router";
import ImgEditSvg from "../svgs/ImgEditSvg";

const CardEdit = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(180);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    setEditName(localStorage.getItem("username"));
    setImage(localStorage.getItem("image"));
  }, []);

  const handleZoomChange = (value) => {
    setZoom(value);
  };

  const handleRotationChange = (value) => {
    setRotation(value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL("image/png");
      setImage(canvas);
      localStorage.setItem("image", canvas);
    }

    localStorage.setItem("username", editName);
    navigate("/finalcard");
    setEditMode(false);
  };

  return (
    <div className="card" id="card-container">
      <h2>Edit Greeting</h2>
      <div className="image-container">
        {image && (
          <AvatarEditor
            ref={(ref) => setEditor(ref)}
            borderRadius={150}
            image={image}
            width={250}
            height={250}
            border={5}
            color={[255, 255, 255, 0.6]}
            scale={zoom}
            rotate={rotation - 180}
            style={{
              height: "41%",
              width: "55%",
              borderRadius: "50%",
              zIndex: -1,
              position: "absolute",
              top: 140,
              left: 87,
            }}
          />
        )}
      </div>
      <div className="card-name">
        {editMode ? (
          <input
            className="edit-name"
            placeholder="- Edit Name"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        ) : (
          <p style={{margin: "auto", color: "white"}}>- {editName}</p>
        )}
      </div>
      {editMode ? (
        <div className="controls">
          <div className="elements">
            <div className="ctr">
              <div className="ctr-child">
                <button
                  className="btn-controls weight"
                  onClick={() =>
                    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1))
                  }
                >
                  -
                </button>
                <input
                  type="range"
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={zoom}
                  className="slider"
                  onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                />
                <button
                  className="btn-controls weight"
                  onClick={() => setZoom((prevZoom) => prevZoom + 0.1)}
                >
                  +
                </button>
              </div>
              <label>zoom</label>
            </div>
            <div className="ctr">
              <div className="ctr-child">
                <button
                  className="btn-controls rotate"
                  onClick={() =>
                    setRotation((prevRotation) => prevRotation - 90)
                  }
                >
                  ⟲
                </button>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={1}
                  className="slider"
                  value={rotation}
                  onChange={(e) =>
                    handleRotationChange(parseFloat(e.target.value))
                  }
                />
                <button
                  className="btn-controls rotate"
                  onClick={() =>
                    setRotation((prevRotation) => prevRotation + 90)
                  }
                >
                  ⟳
                </button>
              </div>
              <label>rotate</label>
            </div>
          </div>

          <div className="btn-div">
            <button
              className="btn-css"
              style={{width: "25%", justifyContent: "center"}}
              onClick={handleSave}
            >
              submit
            </button>
          </div>
        </div>
      ) : (
        <div className="all-button">
          <button onClick={() => setEditMode(true)} className="btn-css">
            <ImgEditSvg />
            edit photo
          </button>
        </div>
      )}
    </div>
  );
};

export default CardEdit;
