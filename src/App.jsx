// src/App.jsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import "./styles/Global.css";

// Basic loading component
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0d0d1a", // Match bg color
      color: "#fff",
      fontSize: "1.5rem",
    }}
  >
    Loading Experience...
  </div>
);

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Add routes for other pages here */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
