import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import type { SeatAvailability, Booking, SlotQuery } from "../types";

interface SeatsState {
  seats: SeatAvailability[];
  myBookings: Booking[];
  availableCount: number;
  query: SlotQuery | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  bookingStatus: "idle" | "loading";
  error: string | null;
  message: string | null;
}

const initialState: SeatsState = {
  seats: [],
  myBookings: [],
  availableCount: 0,
  query: null,
  status: "idle",
  bookingStatus: "idle",
  error: null,
  message: null,
};

export const fetchAvailability = createAsyncThunk(
  "seats/fetchAvailability",
  async (q: SlotQuery) => {
    const res = await api.get("/seats/availability", {
      params: { date: q.date, start: q.start, end: q.end },
    });
    return { ...res.data, query: q } as {
      seats: SeatAvailability[];
      availableCount: number;
      query: SlotQuery;
    };
  }
);

export const bookSeat = createAsyncThunk(
  "seats/bookSeat",
  async (
    payload: SlotQuery & { seatNumber?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/seats/book", payload);
      return res.data as { booking: Booking; message: string };
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Booking failed"
      );
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  "seats/fetchMyBookings",
  async () => {
    const res = await api.get("/seats/my-bookings");
    return res.data as { bookings: Booking[] };
  }
);

export const cancelBooking = createAsyncThunk(
  "seats/cancelBooking",
  async (id: string) => {
    const res = await api.post(`/seats/bookings/${id}/cancel`);
    return res.data as { booking: Booking; message: string };
  }
);

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    clearSeatMessage(state) {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailability.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.seats = action.payload.seats;
        state.availableCount = action.payload.availableCount;
        state.query = action.payload.query;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load availability";
      })
      .addCase(bookSeat.pending, (state) => {
        state.bookingStatus = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(bookSeat.fulfilled, (state, action) => {
        state.bookingStatus = "idle";
        state.message = `Seat #${action.payload.booking.seatNumber} booked!`;
        // Mark seat as taken locally for instant feedback.
        const seat = state.seats.find(
          (s) => s.seatNumber === action.payload.booking.seatNumber
        );
        if (seat) seat.available = false;
        state.availableCount = state.seats.filter((s) => s.available).length;
      })
      .addCase(bookSeat.rejected, (state, action) => {
        state.bookingStatus = "idle";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Booking failed";
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.myBookings = action.payload.bookings;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.message = "Booking cancelled";
        const b = state.myBookings.find(
          (x) => x._id === action.payload.booking._id
        );
        if (b) b.status = "cancelled";
      });
  },
});

export const { clearSeatMessage } = seatsSlice.actions;
export default seatsSlice.reducer;
