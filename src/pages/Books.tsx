import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchBooks,
  fetchSuggestions,
  rentBook,
  purchaseBook,
  returnBook,
  fetchMyBookTransactions,
  clearSuggestions,
  clearActionMessage,
} from "../store/booksSlice";
import { useDebounce } from "../utils/useDebounce";
import { useThrottledCallback } from "../utils/throttle";
import { useAuth } from "../context/AuthContext.jsx";

export default function Books() {
  const dispatch = useAppDispatch();
  const { user } = useAuth() as { user: any };
  const {
    items,
    suggestions,
    transactions,
    status,
    actionMessage,
    total,
  } = useAppSelector((s) => s.books);

  const [term, setTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedTerm = useDebounce(term, 300);
  const boxRef = useRef<HTMLDivElement>(null);

  // Throttled live search: refreshes the grid at most ~once per 600ms.
  const throttledSearch = useThrottledCallback((q: string) => {
    dispatch(fetchBooks({ search: q }));
  }, 600);

  // Initial load + current user's rental history.
  useEffect(() => {
    dispatch(fetchBooks({}));
    if (user) dispatch(fetchMyBookTransactions());
  }, [dispatch, user]);

  // Debounced suggestions as the user types.
  useEffect(() => {
    if (debouncedTerm.trim()) {
      dispatch(fetchSuggestions(debouncedTerm));
      setShowSuggestions(true);
    } else {
      dispatch(clearSuggestions());
      setShowSuggestions(false);
    }
  }, [debouncedTerm, dispatch]);

  // Throttled results while typing.
  useEffect(() => {
    throttledSearch(term);
  }, [term, throttledSearch]);

  // Auto-clear the action banner.
  useEffect(() => {
    if (!actionMessage) return;
    if (user) dispatch(fetchMyBookTransactions());
    const t = setTimeout(() => dispatch(clearActionMessage()), 4000);
    return () => clearTimeout(t);
  }, [actionMessage, dispatch, user]);

  // Close suggestions on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pickSuggestion = (title: string) => {
    setTerm(title);
    setShowSuggestions(false);
    dispatch(fetchBooks({ search: title }));
  };

  const activeRentals = transactions.filter((t) => t.status === "rented");

  return (
    <div className="books-page">
      <div className="books-header">
        <h2>Library Book Store</h2>
        <p className="muted">
          Search, rent, or purchase books with real-time availability.
        </p>
      </div>

      <div className="book-search" ref={boxRef}>
        <input
          type="text"
          placeholder="Search by title or author…"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => term && setShowSuggestions(true)}
          className="book-search-input"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((s) => (
              <li key={s._id} onClick={() => pickSuggestion(s.title)}>
                <span className="sugg-title">{s.title}</span>
                <span className="sugg-author">{s.author}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {actionMessage && <div className="alert alert-info">{actionMessage}</div>}

      {!user && (
        <p className="muted">
          <Link to="/login">Sign in</Link> to rent or purchase books.
        </p>
      )}

      {status === "loading" && <p className="muted">Loading books…</p>}
      {status === "succeeded" && items.length === 0 && (
        <p className="muted">No books found.</p>
      )}

      <p className="muted result-count">{total} book(s) available</p>

      <div className="books-grid">
        {items.map((book) => (
          <div className="book-card card" key={book._id}>
            <div className="book-cover">
              {book.coverImage ? (
                <img src={book.coverImage} alt={book.title} />
              ) : (
                <div className="book-cover-fallback">📘</div>
              )}
            </div>
            <h4 className="book-title">{book.title}</h4>
            <p className="book-author">by {book.author}</p>
            <span className="book-category">{book.category}</span>

            <div className="book-meta">
              <span>Buy: ₹{book.purchasePrice}</span>
              <span>Rent: ₹{book.rentPricePerDay}/day</span>
            </div>
            <div className="book-stock">
              <span className={book.availableForRent > 0 ? "in" : "out"}>
                {book.availableForRent} for rent
              </span>
              <span className={book.stockForSale > 0 ? "in" : "out"}>
                {book.stockForSale} in stock
              </span>
            </div>

            {user && (
              <div className="book-actions">
                <button
                  className="btn btn-sm"
                  disabled={book.availableForRent < 1}
                  onClick={() => dispatch(rentBook({ id: book._id, days: 7 }))}
                >
                  Rent 7 days
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  disabled={book.stockForSale < 1}
                  onClick={() =>
                    dispatch(purchaseBook({ id: book._id, quantity: 1 }))
                  }
                >
                  Buy
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {user && activeRentals.length > 0 && (
        <div className="my-rentals card">
          <h3>My Active Rentals</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Due</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {activeRentals.map((t) => (
                <tr key={t._id}>
                  <td>{t.bookTitle}</td>
                  <td>
                    {t.rentDue
                      ? new Date(t.rentDue).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                  <td>₹{t.amount}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => dispatch(returnBook(t._id))}
                    >
                      Return
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
