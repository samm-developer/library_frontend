import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src="/images/logo.png" alt="The King's Library Logo" className="navbar-logo" />
          Library<span>MS</span>
        </Link>

        {/* Hamburger Menu Toggle */}
        <button
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* Navigation Links and Action Buttons wrapper */}
        <div className={`nav-menu-wrapper ${isOpen ? "active" : ""}`}>
          <div className="nav-menu">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/books"
              className={`nav-link ${isActive("/books") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Books
            </Link>
            <Link
              to="/seats"
              className={`nav-link ${isActive("/seats") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Seats
            </Link>
            <Link
              to="/gallery"
              className={`nav-link ${isActive("/gallery") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link
              to="/careers"
              className={`nav-link ${isActive("/careers") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Careers
            </Link>
            <Link
              to="/enquiries"
              className={`nav-link ${isActive("/enquiries") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Enquiries
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${isActive("/contact") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </div>

          <div className="nav-actions">
            {!user && (
              <>
                <Link to="/login" className="btn-signin" onClick={closeMenu}>
                  Student Sign In
                </Link>
                <Link to="/register" className="btn-register" onClick={closeMenu}>
                  Register
                </Link>
              </>
            )}
            {user && user.role === "student" && (
              <>
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <span className="user-greeting">Hi, {user.name.split(" ")[0]}</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <Link
                  to="/admin"
                  className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  Admin
                </Link>
                <span className="user-greeting">Admin</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
