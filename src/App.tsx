import React from "react";
import Characters from "./Pages/Characters/Characters";
import Locations from "./Pages/Locations/Locations";
import Episodes from "./Pages/Episodes/Episodes";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
      </Routes>
    </div>
  );
}

export default App;
