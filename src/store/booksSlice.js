import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=your-api-key-here"
  );
  return response.data.results.books;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    loading: false,
    error: null,
    sortBy: "title",
    sortOrder: "asc",
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    sortBooks: (state) => {
      const { items, sortBy, sortOrder } = state;

      if (!items.length) return;

      const sortedItems = [...items].sort((a, b) => {
        let valueA, valueB;

        switch (sortBy) {
          case "title":
            valueA = a.title.toLowerCase();
            valueB = b.title.toLowerCase();
            break;
          case "author":
            valueA = a.author.toLowerCase();
            valueB = b.author.toLowerCase();
            break;
          case "publisher":
            valueA = a.publisher.toLowerCase();
            valueB = b.publisher.toLowerCase();
            break;
          default:
            return 0;
        }

        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });

      state.items = sortedItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        // Sort books after fetching
        booksSlice.caseReducers.sortBooks(state);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setSortOrder, sortBooks } = booksSlice.actions;
export default booksSlice.reducer;
