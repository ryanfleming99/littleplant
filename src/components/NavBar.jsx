// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  // Add state later for active link highlighting or scrolled background if needed
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Little Plant
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {/* Add more links (e.g., Portfolio, Contact) here */}
      </ul>
    </nav>
  );
};

export default NavBar;
