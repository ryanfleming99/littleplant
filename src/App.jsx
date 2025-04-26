// src/App.jsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage"; // Import the new page
import "./styles/Global.css";

// Basic loading component (or use your existing one)
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "var(--bg-color)",
      color: "var(--text-color)",
      fontSize: "1.5rem",
    }}
  >
    Loading...
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
          <Route path="/portfolio" element={<PortfolioPage />} />{" "}
          {/* Add Portfolio Route */}
          {/* Add more routes as needed */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
