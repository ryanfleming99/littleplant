// src/pages/HomePage.jsx
import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import HomepageScene from "../components/3d/HomepageScene"; // Corrected import
import "../styles/Pages.css";
import gsap from "gsap"; // Import GSAP
import { Link } from "react-router-dom"; // Import Link for button

const HomePage = () => {
  const contentRef = useRef();

  useEffect(() => {
    // Animate content on load using GSAP
    gsap.to(contentRef.current, {
      duration: 1.5, // Animation duration
      opacity: 1,
      y: 0, // Move to final position (from translateY(20px) in CSS)
      ease: "power3.out", // Easing function
      delay: 0.5, // Start after a short delay
    });
  }, []);

  return (
    <div className="page-container">
      {/* Canvas takes full background */}
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }} // Adjusted camera
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        // Removed shadows prop, handle lighting/shadows within the scene
      >
        <Suspense fallback={null}>
          <HomepageScene />
        </Suspense>
      </Canvas>

      {/* Overlay content - use content-container */}
      <div ref={contentRef} className="content-container">
        <h1>Cultivating Digital Growth.</h1>
        <p>
          Little Plant is the foundation for a thriving ecosystem of innovative
          companies, nurturing ideas from seed to impactful reality through
          strategic insight and creative execution.
        </p>
        <Link to="/about" className="cta-button">
          Discover Our Roots
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
