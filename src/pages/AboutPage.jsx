// src/pages/AboutPage.jsx
import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
// Import the component containing the Abstract City code
// Make sure the path and name are correct if you renamed the file/component
import AbstractCityScene from "../components/3d/AbstractCityScene";
import "../styles/Pages.css"; // Import page styles
import gsap from "gsap"; // Import GSAP for animations

const AboutPage = () => {
  const contentRef = useRef(); // Ref for the content container for GSAP

  useEffect(() => {
    // Animate content fading in and sliding up slightly on load
    gsap.to(contentRef.current, {
      duration: 1.5, // Animation duration
      opacity: 1, // Fade in
      y: 0, // Move to final position (from translateY(20px) which might be default)
      ease: "power3.out", // Smooth easing
      delay: 0.5, // Start animation after a brief delay
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Use page-container for overall structure
    <div className="page-container" style={{ justifyContent: "center" }}>
      {/* Setup the Canvas for the 3D scene */}
      <Canvas
        // Updated camera position/FOV for city view (higher up, further back)
        camera={{ position: [0, 15, 25], fov: 50 }}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }} // Position canvas behind content
        shadows // Enable shadows if lights/objects cast them
      >
        <Suspense fallback={null}>
          {" "}
          {/* Display nothing while 3D scene loads */}
          {/* Render the 3D City Scene component */}
          <AbstractCityScene />
        </Suspense>
      </Canvas>

      {/* Content overlay container */}
      <div
        ref={contentRef} // Assign the ref for GSAP targeting
        className="content-container"
        // Example inline styles to center the text and adjust background
        style={{
          maxWidth: "600px", // Limit content width
          textAlign: "center", // Center the text within the container
          marginLeft: "auto", // Auto margins help center the block element
          marginRight: "auto",
          backgroundColor: "rgba(13, 13, 26, 0.7)", // Slightly more opaque background for readability
          backdropFilter: "blur(5px)", // Apply a blur effect to the background behind the text
          padding: "2rem 2.5rem", // Adjust padding as needed
          borderRadius: "8px", // Optional: rounded corners
          opacity: 0, // Start hidden for GSAP animation
          transform: "translateY(20px)", // Start slightly lower for GSAP animation
        }}
      >
        {/* Page heading */}
        <h2>Building the Future</h2>

        {/* Page paragraphs */}
        <p>
          Little Plant provides the bedrock and interconnected network upon
          which innovative ventures thrive. We cultivate growth, synergy, and
          long-term success within our diverse portfolio.
        </p>
        <p>
          Our focus is on sustainable development, fostering ventures that excel
          in their industries while contributing positively to the broader
          ecosystem. Collaboration and vision are at our core.
        </p>
        {/* Add more content paragraphs or calls-to-action as needed */}
        {/* <button className="cta-button">Join Us</button> */}
      </div>
    </div>
  );
};

export default AboutPage;
