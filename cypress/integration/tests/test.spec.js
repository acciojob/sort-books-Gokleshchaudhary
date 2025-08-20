describe("BooksList", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/books").as("getBooks");
    cy.visit("/books");
    cy.wait("@getBooks", { timeout: 15000 }); 
  });

  it('should render the header with title "Books List"', () => {
    cy.get("h1", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Books List");
  });

  it('should render the "sort by" dropdown', () => {
    cy.contains("label", "Sort by:", { timeout: 10000 }).should("be.visible");
    cy.get("select#sort-by", { timeout: 10000 }).should("be.visible");
  });

  it('should render the "order" dropdown', () => {
    cy.contains("label", "Order:", { timeout: 10000 }).should("be.visible");
    cy.get("select#order", { timeout: 10000 }).should("be.visible");
  });

  it("should render the table with book data", () => {
    cy.get("table", { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get("thead th").should("have.length.at.least", 2);
        cy.get("tbody tr").should("have.length.at.least", 1);
      });
  });

  it("should render the book data in sorted order by title by default", () => {
    cy.get("table tbody tr td:first-child", { timeout: 10000 })
      .should("have.length.at.least", 1)
      .then(($cells) => {
        const titles = $cells
          .map((index, cell) => cell.textContent.trim())
          .get();
        const sortedTitles = [...titles].sort();
        expect(titles).to.deep.equal(sortedTitles);
      });
  });
});
