// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./component/Home";
import { useSelector } from "react-redux";
const App = () => {
  return (
    <>
      <div className="flex ">
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
