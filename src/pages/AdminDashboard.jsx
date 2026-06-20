import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("all");
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [defaulters, setDefaulters] = useState([]);
  const [asOf, setAsOf] = useState(new Date().toISOString().slice(0, 10));
  const [search, setSearch] = useState("");

  const loadStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  const loadStudents = async () => {
    const res = await api.get("/admin/students");
    setStudents(res.data.students);
  };

  const loadDefaulters = async (date) => {
    const res = await api.get("/admin/defaulters", { params: { date } });
    setDefaulters(res.data.defaulters);
  };

  useEffect(() => {
    loadStats();
    loadStudents();
    loadDefaulters(asOf);
  }, []);

  const filtered = (list) =>
    list.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.mobile.includes(search)
    );

  const rows = tab === "all" ? filtered(students) : filtered(defaulters);

  return (
    <div className="dashboard">
      <h2>Admin Panel</h2>

      {stats && (
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-num">{stats.totalStudents}</span>
            <span className="muted">Total students</span>
          </div>
          <div className="stat-card warn">
            <span className="stat-num">{stats.defaulters}</span>
            <span className="muted">Defaulters today</span>
          </div>
          <div className="stat-card ok">
            <span className="stat-num">{stats.paidStudents}</span>
            <span className="muted">Paid students</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">₹{stats.totalCollected}</span>
            <span className="muted">Total collected</span>
          </div>
        </div>
      )}

      <div className="card">
        <div className="tabs">
          <button
            className={tab === "all" ? "tab active" : "tab"}
            onClick={() => setTab("all")}
          >
            All Students
          </button>
          <button
            className={tab === "defaulters" ? "tab active" : "tab"}
            onClick={() => setTab("defaulters")}
          >
            Fee Defaulters
          </button>
        </div>

        <div className="toolbar">
          <input
            className="search"
            placeholder="Search by name, email or mobile…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {tab === "defaulters" && (
            <label className="asof">
              As of:
              <input
                type="date"
                value={asOf}
                onChange={(e) => {
                  setAsOf(e.target.value);
                  loadDefaulters(e.target.value);
                }}
              />
            </label>
          )}
        </div>

        {rows.length === 0 ? (
          <p className="muted">No records found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Hours</th>
                  <th>Fee</th>
                  <th>Status</th>
                  <th>Valid Until</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.mobile}</td>
                    <td>
                      {s.hours} hrs
                      {s.startTime && s.endTime && (
                        <div className="muted" style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                          {s.startTime} - {s.endTime}
                        </div>
                      )}
                      {s.chairNumber && (
                        <div className="badge" style={{ marginTop: "4px", fontSize: "0.75rem", display: "inline-block", backgroundColor: "#e0e7ff", color: "#4338ca" }}>
                          Chair {s.chairNumber}
                        </div>
                      )}
                    </td>
                    <td>₹{s.fee.amountDue}</td>
                    <td>
                      {s.fee.isPaid ? (
                        <span className="badge badge-ok">Paid</span>
                      ) : (
                        <span className="badge badge-due">Defaulter</span>
                      )}
                    </td>
                    <td>{formatDate(s.fee.paidUntil)}</td>
                    <td>
                      <Link to={`/admin/students/${s._id}`} className="btn btn-sm">
                        View
                      </Link>
                    </td>
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
