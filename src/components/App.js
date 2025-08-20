import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setSortBy, setSortOrder } from "../store/booksSlice";
import "./../styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  const { items, loading, error, sortBy, sortOrder } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSortOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Book Sorting App</h1>

      <div className="sort-controls">
        <div className="sort-group">
          <label htmlFor="sort-by">Sort By:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={handleSortByChange}
            data-testid="sort-by"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </div>

        <div className="sort-group">
          <label htmlFor="sort-order">Order:</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={handleSortOrderChange}
            data-testid="sort-order"
          >
            <option value="asc">Ascending (A-Z)</option>
            <option value="desc">Descending (Z-A)</option>
          </select>
        </div>
      </div>

      {items && items.length > 0 ? (
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {items.map((book) => (
              <tr key={book.primary_isbn13 || book.title}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.primary_isbn13}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <div className="no-books">No books available</div>
      )}
    </div>
  );
};

export default App;
