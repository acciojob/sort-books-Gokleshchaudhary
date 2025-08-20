import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  // React 16 compatibility middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
