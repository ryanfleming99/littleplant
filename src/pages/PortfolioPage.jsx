// src/pages/PortfolioPage.jsx
import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import PortfolioCard from "../components/PortfolioCard";
import HomepageScene from "../components/3d/HomepageScene"; // Reuse homepage scene for background
import "../styles/Pages.css"; // General page styles
import "../styles/PortfolioPage.css"; // Portfolio specific styles
import gsap from "gsap";

// --- Company Data ---
const companiesData = [
  {
    id: "snapsell",
    name: "SnapSell.io",
    // Replace with your actual image path in the public folder
    image:
      "https://res.cloudinary.com/ryry/image/upload/v1744190955/Snapsell/SnapSell_Compressed_flbsjf.webp",
    description:
      "An innovative platform revolutionizing visual commerce and social selling experiences.",
    url: "https://snapsell.io", // Make sure URL starts with https://
  },
  {
    id: "munchies",
    name: "MunchiesOnDemand",
    image:
      "https://res.cloudinary.com/ryry/image/upload/v1724673257/munchiesondemand.webp", // Replace with your actual image path
    description:
      "Satisfying cravings instantly with curated snack and convenience delivery services.",
    // Link to .com, but mention both domains if needed in description or title
    url: "https://munchiesondemand.com",
  },
  {
    id: "pdj",
    name: "Public Design Jobs",
    image:
      "https://res.cloudinary.com/ryry/image/upload/v1740405313/publicdesignjobs_kdeoj9.webp", // Replace with your actual image path
    description:
      "Connecting top design talent with impactful opportunities in the public and civic sectors.",
    url: "https://publicdesignjobs.co.uk",
  },
  // Add more companies here as needed
];
// --- ---

const PortfolioPage = () => {
  const titleRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    // Animate Title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { duration: 1, opacity: 1, y: 0, ease: "power3.out", delay: 0.3 }
    );

    // Animate Grid Cards (staggered entry)
    gsap.fromTo(
      gridRef.current.children, // Target children (the cards)
      { opacity: 0, y: 20, scale: 0.98 },
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power3.out",
        stagger: 0.2, // Delay between each card animation
        delay: 0.6, // Start after title animation
      }
    );
  }, []);

  return (
    <div className="page-container portfolio-page-layout">
      {" "}
      {/* Use general + specific layout class */}
      {/* Optional: Reuse background scene */}
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }} // Same as homepage camera maybe?
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      >
        <Suspense fallback={null}>
          <HomepageScene />
        </Suspense>
      </Canvas>
      {/* Page Content */}
      <div className="portfolio-content">
        <h1 ref={titleRef} className="portfolio-title">
          Our Ventures
        </h1>
        {/* Optional intro paragraph */}
        {/* <p className="portfolio-intro">Explore the growing ecosystem nurtured by Little Plant.</p> */}

        <div ref={gridRef} className="portfolio-grid">
          {companiesData.map((company) => (
            <PortfolioCard
              key={company.id}
              name={company.name}
              image={company.image}
              description={company.description}
              url={company.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
