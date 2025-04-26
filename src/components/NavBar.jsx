// src/components/NavBar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom"; // Use NavLink for active styling
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Little Plant
      </Link>
      <ul className="nav-links">
        <li>
          {/* Use NavLink for active class */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Portfolio {/* Add Portfolio Link */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
