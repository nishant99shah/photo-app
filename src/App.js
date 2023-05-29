import React from "react";
import "./App.css";
import "./Card.css";
import AppRouter from "./AppRouter";
import {CloudinaryContext} from "cloudinary-react";

export const cloudinaryCloudName = "ddnieduzj";
export const cloudinaryApiKey = "241211574719549";
export const cloudinaryApiSecret = "8IyeYDx4FKIxYEOqUVs6_ldHhM0";

function App() {
  return (
    <CloudinaryContext
      cloudName={cloudinaryCloudName}
      apiKey={cloudinaryApiKey}
      apiSecret={cloudinaryApiSecret}
    >
      <AppRouter />
    </CloudinaryContext>
  );
}

export default App;
