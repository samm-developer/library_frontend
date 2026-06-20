import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice";
import seatsReducer from "./seatsSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    seats: seatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
