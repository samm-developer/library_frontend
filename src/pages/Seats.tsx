import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAvailability,
  bookSeat,
  fetchMyBookings,
  cancelBooking,
  clearSeatMessage,
} from "../store/seatsSlice";
import { useAuth } from "../context/AuthContext.jsx";

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function minToHHMM(min: number) {
  const h = String(Math.floor(min / 60)).padStart(2, "0");
  const m = String(min % 60).padStart(2, "0");
  return `${h}:${m}`;
}

const TIME_OPTIONS: string[] = [];
for (let h = 6; h <= 22; h++) {
  TIME_OPTIONS.push(`${String(h).padStart(2, "0")}:00`);
}

export default function Seats() {
  const dispatch = useAppDispatch();
  const { user } = useAuth() as { user: any };
  const {
    seats,
    myBookings,
    availableCount,
    status,
    bookingStatus,
    message,
    error,
    query,
  } = useAppSelector((s) => s.seats);

  const [date, setDate] = useState(todayStr());
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("12:00");

  useEffect(() => {
    if (user) dispatch(fetchMyBookings());
  }, [dispatch, user]);

  useEffect(() => {
    if (!message && !error) return;
    if (user) dispatch(fetchMyBookings());
    const t = setTimeout(() => dispatch(clearSeatMessage()), 4000);
    return () => clearTimeout(t);
  }, [message, error, dispatch, user]);

  const checkAvailability = () => {
    if (start >= end) return;
    dispatch(fetchAvailability({ date, start, end }));
  };

  const book = (seatNumber?: number) => {
    if (start >= end) return;
    dispatch(bookSeat({ date, start, end, seatNumber }));
  };

  const activeBookings = myBookings.filter((b) => b.status === "active");

  return (
    <div className="seats-page">
      <div className="books-header">
        <h2>Reserve a Study Seat</h2>
        <p className="muted">
          Pick a date and time slot — seats are allocated in real time with
          conflict-free booking.
        </p>
      </div>

      {!user && (
        <p className="muted">
          <Link to="/login">Sign in</Link> to reserve a seat.
        </p>
      )}

      <div className="slot-picker card">
        <div className="slot-field">
          <label>Date</label>
          <input
            type="date"
            value={date}
            min={todayStr()}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="slot-field">
          <label>From</label>
          <select value={start} onChange={(e) => setStart(e.target.value)}>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="slot-field">
          <label>To</label>
          <select value={end} onChange={(e) => setEnd(e.target.value)}>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="slot-actions">
          <button className="btn" onClick={checkAvailability}>
            Check availability
          </button>
          {user && (
            <button
              className="btn btn-ghost"
              disabled={bookingStatus === "loading"}
              onClick={() => book()}
            >
              Auto-allocate seat
            </button>
          )}
        </div>
      </div>

      {start >= end && (
        <div className="alert alert-error">
          "From" time must be before "To" time.
        </div>
      )}
      {message && <div className="alert alert-info">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {status === "loading" && <p className="muted">Checking seats…</p>}

      {status === "succeeded" && (
        <>
          <p className="muted result-count">
            {availableCount} of {seats.length} seats available for{" "}
            {query?.start}-{query?.end}
          </p>
          <div className="seat-legend">
            <span>
              <i className="seat-dot available" /> Available
            </span>
            <span>
              <i className="seat-dot taken" /> Booked
            </span>
          </div>
          <div className="seat-grid">
            {seats.map((s) => (
              <button
                key={s._id}
                className={`seat ${s.available ? "available" : "taken"}`}
                disabled={!s.available || !user || bookingStatus === "loading"}
                title={
                  s.available
                    ? `Book seat ${s.seatNumber}`
                    : `Seat ${s.seatNumber} is booked`
                }
                onClick={() => book(s.seatNumber)}
              >
                {s.seatNumber}
              </button>
            ))}
          </div>
        </>
      )}

      {user && activeBookings.length > 0 && (
        <div className="my-bookings card">
          <h3>My Bookings</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Seat</th>
                <th>Date</th>
                <th>Slot</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {activeBookings.map((b) => (
                <tr key={b._id}>
                  <td>#{b.seatNumber}</td>
                  <td>{new Date(b.date).toLocaleDateString("en-IN")}</td>
                  <td>
                    {minToHHMM(b.startMinute)}-{minToHHMM(b.endMinute)}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => dispatch(cancelBooking(b._id))}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
