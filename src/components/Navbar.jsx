import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        📚 Library<span>MS</span>
      </Link>
      <div className="nav-links">
        {!user && (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="btn btn-sm">
              Register
            </Link>
          </>
        )}
        {user && user.role === "student" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="muted">Hi, {user.name.split(" ")[0]}</span>
            <button className="btn btn-sm btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {user && user.role === "admin" && (
          <>
            <Link to="/admin">Admin</Link>
            <span className="muted">Admin</span>
            <button className="btn btn-sm btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
