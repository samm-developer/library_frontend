import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const HOURS_OPTIONS = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];

function getHourValue(timeStr) {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(" ");
  let [hours] = time.split(":");
  hours = parseInt(hours, 10);
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  return hours;
}

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
  startTime: "",
  endTime: "",
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

  const onMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (value.length <= 10) {
      setForm((f) => ({ ...f, mobile: value }));
    }
  };

  const onIdNumberChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Allow only alphanumeric in uppercase
    if (value.length <= 12) {
      setForm((f) => ({ ...f, idNumber: value }));
    }
  };

  useEffect(() => {
    if (form.startTime && form.endTime) {
      const startVal = getHourValue(form.startTime);
      const endVal = getHourValue(form.endTime);
      let diff = endVal - startVal;
      if (diff < 0) {
        diff += 24;
      } else if (diff === 0) {
        diff = 24;
      }
      setForm((f) => ({ ...f, hours: String(diff) }));
    } else {
      setForm((f) => ({ ...f, hours: "" }));
    }
  }, [form.startTime, form.endTime]);

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
            <input
              type="tel"
              pattern="[0-9]{10}"
              title="10-digit mobile number"
              value={form.mobile}
              onChange={onMobileChange}
              required
            />
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
            <input
              value={form.idNumber}
              onChange={onIdNumberChange}
              maxLength={12}
              style={{ textTransform: "uppercase" }}
              required
            />
          </div>
          <div>
            <label>Start Time (O'clock) *</label>
            <select value={form.startTime} onChange={set("startTime")} required>
              <option value="">Select start time…</option>
              {HOURS_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>End Time (O'clock) *</label>
            <select value={form.endTime} onChange={set("endTime")} required>
              <option value="">Select end time…</option>
              {HOURS_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
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
            Estimated monthly fee: <strong>₹{fee}</strong> ({form.hours} hrs [{form.startTime} to {form.endTime}] × ₹100)
          </div>
        )}

        <button className="btn btn-block" disabled={loading}>
          {loading ? "Creating account…" : "Register"}
        </button>
      </form>

      <p className="muted center">
        Already registered? <Link to="/login">Student Sign In</Link>
      </p>
    </div>
  );
}
