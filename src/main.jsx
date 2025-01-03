import React from "react";
import { createRoot } from "react-dom/client"; // Nouvelle API
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Search from "./components/Search";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // Crée une racine React

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Page d'accueil */}
        <Route path="/search" element={<Search />} />{" "}
      </Routes>
    </Router>
  </React.StrictMode>
);
