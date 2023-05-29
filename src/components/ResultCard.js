import React from "react";
import {useSearchParams} from "react-router-dom";
import {Image} from "cloudinary-react";
import {cloudinaryCloudName} from "../App";

const ResultCard = () => {
  const [searchParams] = useSearchParams();
  let imageUrl = searchParams.get("imgkey");

  return (
    <div className="card-result">
      <Image
        cloudName={cloudinaryCloudName}
        publicId={imageUrl}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default ResultCard;
