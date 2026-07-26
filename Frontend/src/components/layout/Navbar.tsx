import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // Local UI-only state (mobile menu open/closed) -- doesn't need to live
  // anywhere else, so plain useState in this component is the right call.
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-brand">Contact Us</span>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          &#9776;
        </button>

        <div className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
          <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)} end>
            Home
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/queries" className={linkClass} onClick={() => setMenuOpen(false)}>
            Queries
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
