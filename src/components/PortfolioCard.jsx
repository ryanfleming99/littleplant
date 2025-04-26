// src/components/PortfolioCard.jsx
import React from "react";
import "../styles/PortfolioCard.css"; // Import card-specific styles

const PortfolioCard = ({ name, image, description, url }) => {
  return (
    // Link wrapping the entire card
    <a
      href={url}
      target="_blank" // Open in new tab
      rel="noopener noreferrer" // Security best practice for target="_blank"
      className="portfolio-card-link"
    >
      <div className="portfolio-card">
        <div className="card-image-container">
          <img src={image} alt={`${name} logo`} className="card-image" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{name}</h3>
          <p className="card-description">{description}</p>
          <span className="card-link-indicator">Visit Site →</span>
        </div>
      </div>
    </a>
  );
};

export default PortfolioCard;
