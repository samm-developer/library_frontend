import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, fileUrl } from "../api";

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function StudentDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/admin/students/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Not found"));
  }, [id]);

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!data) return <div className="center muted">Loading…</div>;

  const { student, payments } = data;

  return (
    <div className="dashboard">
      <Link to="/admin" className="back-link">
        ← Back to admin
      </Link>
      <h2>{student.name}</h2>

      <div className="grid-2">
        <div className="card">
          <h3>Personal Information</h3>
          <ul className="detail-list">
            <li><span>Father's Name</span><b>{student.fatherName}</b></li>
            <li><span>Gender</span><b>{student.gender}</b></li>
            <li><span>Email</span><b>{student.email}</b></li>
            <li><span>Mobile</span><b>{student.mobile}</b></li>
            <li><span>Qualification</span><b>{student.qualification}</b></li>
            <li><span>ID Number</span><b>{student.idNumber}</b></li>
            <li><span>Study Hours</span><b>{student.hours} hrs {student.startTime && student.endTime ? `(${student.startTime} – ${student.endTime})` : ""}</b></li>
            {student.chairNumber && (
              <li><span>Chair Number</span><b>Chair {student.chairNumber}</b></li>
            )}
            <li><span>Current Address</span><b>{student.currentAddress}</b></li>
            <li><span>Permanent Address</span><b>{student.permanentAddress}</b></li>
            <li><span>Registered On</span><b>{formatDate(student.createdAt)}</b></li>
          </ul>
        </div>

        <div className="card">
          <h3>Fee & Documents</h3>
          <p>
            Status:{" "}
            {student.fee.isPaid ? (
              <span className="badge badge-ok">Paid</span>
            ) : (
              <span className="badge badge-due">Defaulter</span>
            )}
          </p>
          <p className="muted">Monthly fee: ₹{student.fee.amountDue}</p>
          <p className="muted">Valid until: {formatDate(student.fee.paidUntil)}</p>

          <div className="docs">
            <div>
              <span className="muted">Photo</span>
              {student.photo ? (
                <a href={fileUrl(student.photo)} target="_blank" rel="noreferrer">
                  <img src={fileUrl(student.photo)} alt="student" className="thumb" />
                </a>
              ) : (
                <p className="muted">Not uploaded</p>
              )}
            </div>
            <div>
              <span className="muted">Aadhar / PAN</span>
              {student.idPhoto ? (
                <a href={fileUrl(student.idPhoto)} target="_blank" rel="noreferrer">
                  <img src={fileUrl(student.idPhoto)} alt="id" className="thumb" />
                </a>
              ) : (
                <p className="muted">Not uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Payment History</h3>
        {payments.length === 0 ? (
          <p className="muted">No payments yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Period</th>
                  <th>Paid On</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id}>
                    <td>{p.reference}</td>
                    <td>₹{p.amount}</td>
                    <td>
                      {formatDate(p.periodStart)} – {formatDate(p.periodEnd)}
                    </td>
                    <td>{formatDate(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
