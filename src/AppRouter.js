import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import UserDashboard from "./components/UserDashboard";
import ImageEditor from "./components/ImageEditor";
import FinalResult from "./components/FinalResult";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/edit" element={<UserDashboard />} />
        <Route path="/test" element={<ImageEditor />} />
        <Route path="/final" element={<FinalResult />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
