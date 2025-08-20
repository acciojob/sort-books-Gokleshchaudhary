describe("BooksList", () => {
  beforeEach(() => {
    // Mock API response
    cy.intercept("GET", "**/hardcover-fiction.json*", {
      statusCode: 200,
      body: {
        results: {
          books: [
            {
              title: "Test Book 1",
              author: "Author 1",
              publisher: "Publisher A",
              primary_isbn13: "1234567890123",
            },
            {
              title: "Another Book",
              author: "Author 2",
              publisher: "Publisher B",
              primary_isbn13: "9876543210987",
            },
          ],
        },
      },
    }).as("getBooks");

    cy.visit("http://localhost:8080");
    cy.wait("@getBooks");
  });

  it('should render the header with title "Books List"', () => {
    cy.get('[data-testid="header"]').should("contain", "Books List");
  });

  it('should render the "sort by" dropdown', () => {
    cy.get('[data-testid="sort-by-label"]').should("contain", "Sort By:");
    cy.get('[data-testid="sort-by"]').should("exist");
  });

  it('should render the "order" dropdown', () => {
    cy.get('[data-testid="sort-order-label"]').should("contain", "Order:");
    cy.get('[data-testid="sort-order"]').should("exist");
  });

  it("should render the table with book data", () => {
    cy.get('[data-testid="books-table"]').should("exist");
    cy.get('[data-testid="book-row"]').should("have.length.at.least", 1);
  });

  it("should render the book data in sorted order by title by default", () => {
    cy.get('[data-testid="book-title"]')
      .first()
      .should("contain", "Another Book");
    cy.get('[data-testid="book-title"]')
      .last()
      .should("contain", "Test Book 1");
  });
});
