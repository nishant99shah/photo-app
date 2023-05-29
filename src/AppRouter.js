import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Card from "./components/Card";
import Form from "./components/Form";
import CardEdit from "./components/CardEdit";
import FinalCard from "./components/FinalCard";
import ResultCard from "./components/ResultCard";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/card" element={<Card />} />
        <Route path="/cardedit" element={<CardEdit />} />
        <Route path="/finalcard" element={<FinalCard />} />
        <Route path="/share" element={<ResultCard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
