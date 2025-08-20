import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching books (React 16 compatible version)
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=DEMO_KEY"
      );
      return response.data.results.books;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      // Immediately sort when criteria changes
      if (state.items.length > 0) {
        state.items = sortBooksHelper(
          state.items,
          state.sortBy,
          state.sortOrder
        );
      }
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      // Immediately sort when order changes
      if (state.items.length > 0) {
        state.items = sortBooksHelper(
          state.items,
          state.sortBy,
          state.sortOrder
        );
      }
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
        state.items = sortBooksHelper(
          action.payload,
          state.sortBy,
          state.sortOrder
        );
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

// Helper function for sorting books
const sortBooksHelper = (books, sortBy, sortOrder) => {
  if (!books || !books.length) return books;

  return [...books].sort((a, b) => {
    let valueA = "";
    let valueB = "";

    switch (sortBy) {
      case "title":
        valueA = a.title ? a.title.toLowerCase() : "";
        valueB = b.title ? b.title.toLowerCase() : "";
        break;
      case "author":
        valueA = a.author ? a.author.toLowerCase() : "";
        valueB = b.author ? b.author.toLowerCase() : "";
        break;
      case "publisher":
        valueA = a.publisher ? a.publisher.toLowerCase() : "";
        valueB = b.publisher ? b.publisher.toLowerCase() : "";
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
};

export const { setSortBy, setSortOrder } = booksSlice.actions;
export default booksSlice.reducer;
