import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import type { Book, BookTransaction } from "../types";

interface BooksState {
  items: Book[];
  suggestions: Book[];
  transactions: BookTransaction[];
  total: number;
  page: number;
  totalPages: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  suggestStatus: "idle" | "loading";
  error: string | null;
  actionMessage: string | null;
}

const initialState: BooksState = {
  items: [],
  suggestions: [],
  transactions: [],
  total: 0,
  page: 1,
  totalPages: 1,
  status: "idle",
  suggestStatus: "idle",
  error: null,
  actionMessage: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (params: { search?: string; category?: string; page?: number } = {}) => {
    const res = await api.get("/books", { params });
    return res.data as {
      books: Book[];
      total: number;
      page: number;
      totalPages: number;
    };
  }
);

export const fetchSuggestions = createAsyncThunk(
  "books/fetchSuggestions",
  async (q: string) => {
    if (!q.trim()) return { suggestions: [] as Book[] };
    const res = await api.get("/books/suggestions", { params: { q } });
    return res.data as { suggestions: Book[] };
  }
);

export const rentBook = createAsyncThunk(
  "books/rentBook",
  async ({ id, days }: { id: string; days: number }) => {
    const res = await api.post(`/books/${id}/rent`, { days });
    return res.data as { book: Book; message: string };
  }
);

export const purchaseBook = createAsyncThunk(
  "books/purchaseBook",
  async ({ id, quantity }: { id: string; quantity: number }) => {
    const res = await api.post(`/books/${id}/purchase`, { quantity });
    return res.data as { book: Book; message: string };
  }
);

export const fetchMyBookTransactions = createAsyncThunk(
  "books/fetchMyTransactions",
  async () => {
    const res = await api.get("/books/my/transactions");
    return res.data as { transactions: BookTransaction[] };
  }
);

export const returnBook = createAsyncThunk(
  "books/returnBook",
  async (txnId: string) => {
    const res = await api.post(`/books/transactions/${txnId}/return`);
    return res.data as { book: Book; message: string };
  }
);

// Replace a book in the list with its updated inventory after an action.
function applyInventory(state: BooksState, book?: Book) {
  if (!book) return;
  const idx = state.items.findIndex((b) => b._id === book._id);
  if (idx !== -1) state.items[idx] = book;
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearSuggestions(state) {
      state.suggestions = [];
    },
    clearActionMessage(state) {
      state.actionMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.books;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load books";
      })
      .addCase(fetchSuggestions.pending, (state) => {
        state.suggestStatus = "loading";
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestStatus = "idle";
        state.suggestions = action.payload.suggestions;
      })
      .addCase(fetchSuggestions.rejected, (state) => {
        state.suggestStatus = "idle";
      })
      .addCase(rentBook.fulfilled, (state, action) => {
        applyInventory(state, action.payload.book);
        state.actionMessage = action.payload.message;
      })
      .addCase(rentBook.rejected, (state, action) => {
        state.actionMessage =
          (action.error.message as string) || "Rent failed";
      })
      .addCase(purchaseBook.fulfilled, (state, action) => {
        applyInventory(state, action.payload.book);
        state.actionMessage = action.payload.message;
      })
      .addCase(purchaseBook.rejected, (state, action) => {
        state.actionMessage =
          (action.error.message as string) || "Purchase failed";
      })
      .addCase(fetchMyBookTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.transactions;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        applyInventory(state, action.payload.book);
        state.actionMessage = action.payload.message;
      });
  },
});

export const { clearSuggestions, clearActionMessage } = booksSlice.actions;
export default booksSlice.reducer;
