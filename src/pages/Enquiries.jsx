import { useState } from "react";

export default function Enquiries() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "membership",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="enquiries-section form-wide">
      <div className="hero" style={{ textAlign: "left", padding: "20px 0" }}>
        <h1>Submit an Enquiry</h1>
        <p className="muted">
          Have questions about memberships, book availability, study room booking, or donations?
          Send us a message and we'll reply as soon as possible.
        </p>
      </div>

      {submitted ? (
        <div className="alert alert-info">
          <h4>Enquiry Submitted Successfully!</h4>
          <p>Thank you for reaching out. A library representative will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card">
          <div className="grid-2">
            <div>
              <label htmlFor="enquiry-name">Full Name</label>
              <input
                id="enquiry-name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="enquiry-email">Email Address</label>
              <input
                id="enquiry-email"
                type="email"
                required
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <label htmlFor="enquiry-subject">Subject</label>
          <select
            id="enquiry-subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
            <option value="membership">Membership Registration</option>
            <option value="booking">Study Room Reservations</option>
            <option value="donations">Book Donations & Support</option>
            <option value="technical">Technical Support</option>
            <option value="other">General Feedback</option>
          </select>

          <label htmlFor="enquiry-message">Your Message</label>
          <textarea
            id="enquiry-message"
            required
            rows={5}
            placeholder="Type your questions or request details here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <button type="submit" className="btn btn-block" style={{ marginTop: "20px" }}>
            Submit Enquiry
          </button>
        </form>
      )}
    </div>
  );
}
