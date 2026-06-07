import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const initial = {
  name: "",
  fatherName: "",
  gender: "",
  email: "",
  mobile: "",
  qualification: "",
  currentAddress: "",
  permanentAddress: "",
  idNumber: "",
  hours: "",
  password: "",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [photo, setPhoto] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);
  const [sameAddress, setSameAddress] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const onSameAddress = (e) => {
    const checked = e.target.checked;
    setSameAddress(checked);
    if (checked) setForm((f) => ({ ...f, permanentAddress: f.currentAddress }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (photo) data.append("photo", photo);
      if (idPhoto) data.append("idPhoto", idPhoto);
      await register(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fee = form.hours ? Number(form.hours) * 100 : 0;

  return (
    <div className="card form-wide">
      <h2>Student Registration</h2>
      <p className="muted">Fee is ₹100 per hour, billed monthly.</p>
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={submit}>
        <div className="grid-2">
          <div>
            <label>Name *</label>
            <input value={form.name} onChange={set("name")} required />
          </div>
          <div>
            <label>Father's Name *</label>
            <input value={form.fatherName} onChange={set("fatherName")} required />
          </div>
          <div>
            <label>Gender *</label>
            <select value={form.gender} onChange={set("gender")} required>
              <option value="">Select…</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>Email *</label>
            <input type="email" value={form.email} onChange={set("email")} required />
          </div>
          <div>
            <label>Mobile Number *</label>
            <input value={form.mobile} onChange={set("mobile")} required />
          </div>
          <div>
            <label>Qualification *</label>
            <input
              value={form.qualification}
              onChange={set("qualification")}
              required
            />
          </div>
          <div>
            <label>Aadhar Number / PAN No. *</label>
            <input value={form.idNumber} onChange={set("idNumber")} required />
          </div>
          <div>
            <label>Study time (hours only) *</label>
            <input
              type="number"
              min="1"
              value={form.hours}
              onChange={set("hours")}
              required
            />
          </div>
        </div>

        <label>Current Address *</label>
        <textarea
          value={form.currentAddress}
          onChange={(e) => {
            const val = e.target.value;
            setForm((f) => ({
              ...f,
              currentAddress: val,
              permanentAddress: sameAddress ? val : f.permanentAddress,
            }));
          }}
          required
        />

        <label className="checkbox-row">
          <input type="checkbox" checked={sameAddress} onChange={onSameAddress} />
          Permanent address same as current
        </label>

        <label>Permanent Address *</label>
        <textarea
          value={form.permanentAddress}
          onChange={set("permanentAddress")}
          disabled={sameAddress}
          required
        />

        <div className="grid-2">
          <div>
            <label>Photo Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <div>
            <label>Aadhar / PAN Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIdPhoto(e.target.files[0])}
            />
          </div>
        </div>

        <label>Password *</label>
        <input
          type="password"
          minLength={6}
          value={form.password}
          onChange={set("password")}
          required
        />

        {fee > 0 && (
          <div className="fee-preview">
            Estimated monthly fee: <strong>₹{fee}</strong> ({form.hours} hrs × ₹100)
          </div>
        )}

        <button className="btn btn-block" disabled={loading}>
          {loading ? "Creating account…" : "Register"}
        </button>
      </form>

      <p className="muted center">
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
