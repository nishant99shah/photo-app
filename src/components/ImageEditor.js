// import React, {useRef, useState} from "react";
// import html2canvas from "html2canvas";
// import circle from "../img/circle.png";

// const ImageEditor = () => {
//   const containerRef = useRef(null);
//   const [shareUrl, setShareUrl] = useState("");
//   const elementRef = useRef(null);

//   const handleSaveClick = () => {
//     if (containerRef.current) {
//       html2canvas(containerRef.current).then((canvas) => {
//         const image = canvas.toDataURL("image/png");

//         // Create a link element to download the image
//         const link = document.createElement("a");
//         link.href = image;
//         link.download = "image.png";
//         link.click();
//       });
//     }
//   };

//   const captureImage = () => {
//     // html2canvas(elementRef.current).then((canvas) => {
//     //   const imageDataUrl = canvas.toDataURL();
//     //   const shareUrl = `${
//     //     window.location.origin
//     //   }/image?data=${encodeURIComponent(imageDataUrl)}`;
//     //   setShareUrl(shareUrl);
//     //   console.log(shareUrl);
//     // });
//     const imageElement = imageRef.current;
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');

//     // Set the canvas size to match the image dimensions
//     const width = imageElement.width;
//     const height = imageElement.height;
//     canvas.width = width;
//     canvas.height = height;

//     // Draw the image onto the canvas
//     context.drawImage(imageElement, 0, 0);

//     // Convert the canvas to a data URL
//     const dataUrl = canvas.toDataURL('image/png');
//     const shareUrl = `${window.location.origin}/image?data=${encodeURIComponent(dataUrl)}`;
//     setShareUrl(shareUrl);
//   };
//   return (
//     <>
//       <div style={{width: "40%"}} ref={containerRef}>
//         {/* Your HTML elements to be saved as an image */}
//         <h1>Hello, World!</h1>
//         <p>This is a sample text.</p>
//         <img src={circle} alt="Sample Image" />
//       </div>
//       <button onClick={handleSaveClick}>Save as PNG</button>
//       <div>
//         <h1>Image Capture</h1>
//         <div ref={elementRef}>
//           {/* Place your image or content here */}
//           <img src={circle} alt="Your Image" onLoad={captureImage} />
//         </div>
//         {shareUrl && (
//           <div>
//             <p>Share this URL with others:</p>
//             <a href={shareUrl} target="_blank" rel="noopener noreferrer">
//               Open Image
//             </a>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ImageEditor;

import React, {useEffect, useRef, useState} from "react";
import html2canvas from "html2canvas";
import {Image} from "cloudinary-react";
import Axios from "axios";
// import {Cloudinary} from "@cloudinary/base";

import imaage from "../img/cardBg.png";
import {cloudinaryCloudName} from "../App";
import {uploadImageToCloudinary} from "../cloudinaryUtils";

const ImageCapture = () => {
  const divRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [pubId, setPubId] = useState("");
  // const ShareImage = () => {

  // const handleCaptureAndUpload = async () => {
  //   try {
  //     const canvas = await html2canvas(divRef.current);
  //     const dataUrl = canvas.toDataURL('image/png');
  //     const response = await fetch(dataUrl);
  //     const blob = await response.blob();

  //     // Upload the image to Cloudinary
  //     const formData = new FormData();
  //     formData.append('file', blob);
  //     formData.append('upload_preset', 'new_assignment');

  //     const cloudinaryResponse = await fetch(
  //       'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
  //       {
  //         method: 'POST',
  //         body: formData,
  //       }
  //     );

  //     // Handle the Cloudinary response
  //     const cloudinaryData = await cloudinaryResponse.json();
  //     console.log('Cloudinary response:', cloudinaryData);
  //   } catch (error) {
  //     console.error('Error capturing and uploading image:', error);
  //   }
  // }

  const handleSubmit = async () => {
    // Convert the div element to image using html2canvas
    // if (divRef.current) {
    // console.log(divRef.current, "aisuhfihaihiahsdiojaosjfojaod");
    // let venson;
    // html2canvas(divRef.current).then((canvas) => {
    //   const image = canvas.toDataURL("image/png");
    //   venson = image;
    //   console.log(venson, "first");
    //   setImageUrl(venson);
    //   console.log(imageUrl, "asdasfec");
    // });
    // console.log(venson, "venson down");

    const canvas = await html2canvas(divRef.current);

    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL("image/png");
    // console.log(dataUrl, "urllll");

    // try {
    //   const base64ImageData = dataUrl;
    //   const publicUrl = await uploadImageToCloudinary(base64ImageData);
    //   console.log("Image uploaded to Cloudinary. Public URL:", publicUrl);
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    // }

    // const canvas = await html2canvas(document.getElementById("myDiv"));
    // // Convert the canvas to a Blob object
    // const blob = await new Promise((resolve) => {
    //   canvas.toBlob(resolve, "image/png");
    // });
    // // Upload the image to Cloudinary
    // const formData = new FormData();
    // formData.append("file", blob);
    // const response = await fetch(
    //   `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );
    // const data = await response.json();
    // const publicId = data.public_id;
    // // Generate the share URL based on the public ID
    // const shareUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${publicId}`;
    // setImageUrl(shareUrl);
    // Convert the div element to image using html2canvas
    // Convert the div element to image using html2canvas
    // const canvas = await html2canvas(divRef.current);
    // // Convert the canvas to a Blob object
    // const blob = await new Promise((resolve) => {
    //   canvas.toBlob(resolve, "image/png");
    // });
    // console.log(blob, "blob");
    // Create a FormData object
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
    const pubId = data.public_id;
    console.log(pubId, "free public id", dataUrl);
    // Axios.post(
    //   `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
    //   formData
    // ).then((response) => {
    //   setPubId(response.data.public_id);
    // });
    const shareUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${pubId}`;
    setImageUrl(shareUrl);
    // const uploadResponse = await fetch(
    //   `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // ).then((response) => console.log(response.json()));
    // Get the public URL of the uploaded image
    // const publicUrl = uploadResponse.secure_url;
    // setImageUrl(publicUrl);
  };

  return (
    // <div>
    //   <div ref={divRef}>
    //     {/* Your content to capture as an image */}
    //   </div>
    //   <button onClick={handleCaptureAndUpload}>Submit</button>
    //   <Image cloudName={cloudinaryCloudName} publicId="YOUR_IMAGE_PUBLIC_ID" />
    // </div>
    <div>
      <div id="myDiv" ref={divRef}>
        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>

        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>
        <p>Content to be converted to image</p>
      </div>
      <input
        type="file"
        onChange={(event) => setImageSelected(event.target.files[0])}
      />
      <button onClick={handleSubmit}>Generate Share URL</button>

      {imageUrl && (
        <div style={{height: 700, width: 700, backgroundColor: "blue"}}>
          <Image publicId={imageUrl} width="600" height="600" />
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            Open Share URL
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageCapture;
