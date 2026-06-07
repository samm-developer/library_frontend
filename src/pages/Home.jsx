import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="hero">
      <h1>Library Management System</h1>
      <p className="muted">
        Reserve your study hours, pay your monthly fee online, and let the admin
        keep track of everything in one place.
      </p>

      <div className="hero-cards">
        <div className="card">
          <h3>For Students</h3>
          <p>Register with your details, sign in and pay ₹100 per hour / month.</p>
          {!user && (
            <Link to="/register" className="btn">
              Get started
            </Link>
          )}
          {user?.role === "student" && (
            <Link to="/dashboard" className="btn">
              Go to dashboard
            </Link>
          )}
        </div>
        <div className="card">
          <h3>For Admin</h3>
          <p>View all students, track fee defaulters and inspect any record.</p>
          {user?.role === "admin" ? (
            <Link to="/admin" className="btn">
              Open admin panel
            </Link>
          ) : (
            <Link to="/login" className="btn btn-ghost">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
