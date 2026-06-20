import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PageMeta from "./components/PageMeta.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";
import Careers from "./pages/Careers.jsx";
import Enquiries from "./pages/Enquiries.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import Books from "./pages/Books.tsx";
import Seats from "./pages/Seats.tsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <PageMeta />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gallery"
          element={
            <main className="container">
              <Gallery />
            </main>
          }
        />
        <Route
          path="/login"
          element={
            <main className="container">
              <Login />
            </main>
          }
        />
        <Route
          path="/register"
          element={
            <main className="container">
              <Register />
            </main>
          }
        />
        <Route
          path="/books"
          element={
            <main className="container">
              <Books />
            </main>
          }
        />
        <Route
          path="/seats"
          element={
            <main className="container">
              <Seats />
            </main>
          }
        />
        <Route
          path="/careers"
          element={
            <main className="container">
              <Careers />
            </main>
          }
        />
        <Route
          path="/enquiries"
          element={
            <main className="container">
              <Enquiries />
            </main>
          }
        />
        <Route
          path="/contact"
          element={
            <main className="container">
              <Contact />
            </main>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="student">
              <main className="container">
                <UserDashboard />
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <main className="container">
                <AdminDashboard />
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students/:id"
          element={
            <ProtectedRoute role="admin">
              <main className="container">
                <StudentDetail />
              </main>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
