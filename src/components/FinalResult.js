import {Image} from "cloudinary-react";
import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

const FinalResult = () => {
  const [searchParams] = useSearchParams();
  let imageUrl = searchParams.get("imgkey");
  //   console.log(searchParams.get("imgkey"));
  //   useEffect(() => {
  //     // const urlParams = new URLSearchParams(window.location.search);
  //     // const myParam = urlParams.get("imgkey");

  //     // console.log("myParam:", myParam);

  //     // Do something with the retrieved parameter
  //   }, []);
  return (
    <div>
      <Image publicId={imageUrl} width="600" height="600" />
    </div>
  );
};

export default FinalResult;
