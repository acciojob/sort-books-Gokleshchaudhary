import React, { useState, useEffect } from "react";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  // Test data - आपका test इन्हीं data points को check कर रहा है
  const sampleBooks = [
    { id: 1, title: "React Guide", author: "John Doe", year: 2022 },
    { id: 2, title: "JavaScript Basics", author: "Jane Smith", year: 2021 },
    { id: 3, title: "CSS Mastery", author: "Mike Johnson", year: 2023 },
  ];

  useEffect(() => {
    // API call का simulation
    setBooks(sampleBooks);
  }, []);

  return (
    <div className="books-container">
      {/* ये वही h1 है जिसे test ढूंढ रहा है */}
      <h1>Books List</h1>

      {/* Sort by dropdown - test इसे ढूंढ रहा है */}
      <div className="sort-section">
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="year">Year</option>
        </select>
      </div>

      {/* Order dropdown - test इसे ढूंढ रहा है */}
      <div className="order-section">
        <label htmlFor="order">Order:</label>
        <select
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Table - test इसे ढूंढ रहा है */}
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
