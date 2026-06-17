import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column brand-info">
          <Link to="/" className="brand">
            <img src="/images/logo.png" alt="The King's Library Logo" className="navbar-logo" />
            Library<span>MS</span>
          </Link>
          <p className="footer-tagline">The King's Library</p>
          <p className="footer-motto">An Ideal Place For Learners</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/enquiries">Enquiries</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Timings</h4>
          <ul className="footer-timings">
            <li>🕒 Open 24 Hours a Day</li>
            <li>📅 Open 7 Days a Week</li>
            <li className="footer-note">
              * The library remains closed only on the last date of every month for maintenance and administrative work.
            </li>
          </ul>
        </div>

        <div className="footer-column contact-column">
          <h4>Contact Details</h4>
          <p>👤 <strong>Rajat Keshari</strong></p>
          <p>📞 <a href="tel:8382829192">8382829192</a>, <a href="tel:7355904515">7355904515</a></p>
          <p>✉️ <a href="mailto:00kinglibrary@gmail.com">00kinglibrary@gmail.com</a></p>
          <p className="address">
            📍 20D/1E/13, C.Y. Chintamani Road, George Town, (Near Priti Nursing Home)
          </p>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-social-section">
        <div className="footer-social-container">
          <span className="social-title">Stay Connected</span>
          <div className="social-links-list">
            <a
              href="https://www.facebook.com/share/1aUCkiYpom/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn facebook"
              aria-label="Follow us on Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.6.4-1 1-1h2V2h-3C9.7 2 9 4.2 9 6v2z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/keshari_200?igsh=MWhtbWNmNjBtbzh4bg=="
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn instagram"
              aria-label="Follow us on Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://chat.whatsapp.com/FPNMCOMTvTw790pnmsHaXc?s=cl&p=a&ilr=1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn whatsapp"
              aria-label="Join our WhatsApp community"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 2.2.7 4.2 2 5.9L2.8 22l4.3-1.1c1.6.9 3.5 1.4 5.3 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2zm5.3 14c-.2.7-1.3 1.3-1.8 1.4-.5.1-1.1.2-3.2-.6-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1-1.3-1-2.5S7.4 8.7 7.7 8.4c.2-.2.5-.3.8-.3h.5c.2 0 .4.1.6.5.2.5.8 2 1 2.3.1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.4.4-.6.6-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6.9.8 1.7 1 2.1 1.2.4.2.6.1.8-.1.2-.2.8-.9 1.1-1.2.2-.3.5-.2.8-.1.3.1 1.9.9 2.2 1.1.3.2.5.3.6.4.1.3.1 1-.1 1.6z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com/@cse45rajatkumarkeshari97?si=w7ydCtebFLFGNsuM"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn youtube"
              aria-label="Subscribe to our YouTube channel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2c-.3-1.1-1.2-2-2.3-2.3C19.2 3.5 12 3.5 12 3.5s-7.2 0-9.2.4c-1.1.3-2 1.2-2.3 2.3C.1 8.2 0 12 0 12s0 3.8.1 5.8c.3 1.1 1.2 2 2.3 2.3 2 1 9.2 1 9.2 1s7.2 0 9.2-1c1.1-.3 2-1.2 2.3-2.3.1-2 .1-5.8.1-5.8s0-3.8-.1-5.8zm-14 9.3V8.5l6 3.5-6 3.5z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/your-company"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn linkedin"
              aria-label="Connect with us on LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .58 1 1.42v4.7h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5V18.5h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} The King's Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
