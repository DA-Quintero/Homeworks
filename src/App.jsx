
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Playlist from "./pages/Playlist";
import Browser from "./pages/Browser";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/music">Reproductor</Link> |{" "}
        <Link to="/history/inicio">Historial</Link>
      </nav>
      <Routes>
        <Route path="/music" element={<Playlist />} />
        <Route path="/history/:page" element={<Browser />} />
      </Routes>
    </Router>
  );
}

export default App;