import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext.jsx";

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function UserDashboard() {
  const { user, refresh } = useAuth();
  const [data, setData] = useState(null);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await api.get("/fees/status");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const pay = async () => {
    setPaying(true);
    setMessage("");
    try {
      const res = await api.post("/fees/pay");
      setMessage(`Payment successful! Ref: ${res.data.payment.reference}`);
      await refresh();
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  if (!data) return <div className="center muted">Loading…</div>;

  const { status, payments } = data;

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}</h2>

      <div className="grid-2">
        <div className={`card fee-card ${status.isPaid ? "ok" : "due"}`}>
          <h3>Fee Status</h3>
          <div className="fee-amount">₹{status.amountDue}</div>
          <p className="muted">
            {status.hours} hours × ₹{status.feePerHour} / month
          </p>
          {status.isPaid ? (
            <>
              <span className="badge badge-ok">Paid</span>
              <p className="muted">Valid until {formatDate(status.paidUntil)}</p>
            </>
          ) : (
            <>
              <span className="badge badge-due">Payment due</span>
              <p className="muted">
                {status.paidUntil
                  ? `Expired on ${formatDate(status.paidUntil)}`
                  : "No payment made yet"}
              </p>
            </>
          )}
          <button className="btn btn-block" onClick={pay} disabled={paying}>
            {paying
              ? "Processing…"
              : status.isPaid
              ? `Extend ${status.periodDays} more days (₹${status.amountDue})`
              : `Pay ₹${status.amountDue} now`}
          </button>
          {message && <div className="alert alert-info">{message}</div>}
        </div>

        <div className="card">
          <h3>Your Details</h3>
          <ul className="detail-list">
            <li><span>Father's Name</span><b>{user.fatherName}</b></li>
            <li><span>Gender</span><b>{user.gender}</b></li>
            <li><span>Email</span><b>{user.email}</b></li>
            <li><span>Mobile</span><b>{user.mobile}</b></li>
            <li><span>Qualification</span><b>{user.qualification}</b></li>
            <li><span>ID Number</span><b>{user.idNumber}</b></li>
            <li><span>Study Hours</span><b>{user.hours} hrs {user.startTime && user.endTime ? `(${user.startTime} – ${user.endTime})` : ""}</b></li>
            {user.chairNumber && (
              <li><span>Chair Number</span><b>Chair {user.chairNumber}</b></li>
            )}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>Payment History</h3>
        {payments.length === 0 ? (
          <p className="muted">No payments yet.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}
