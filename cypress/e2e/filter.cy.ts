/// <reference types="cypress" />

describe("Book Genre Filtering Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/project2/library");

    // Intercepts the GraphQL request for the GetBooks query
    cy.intercept("POST", "http://localhost:3001", (req) => {
      if (req.body.operationName === "GetBooks") {
        req.alias = "booksFilter";
        console.log("Intercepted GetBooks Query:", req.body);
      }
    });
  });

  it('should filter books by the "Political Science" genre', () => {
    // Clicks on the "Political Science" genre filter checkbox
    cy.get('[data-cy="genre-filter-political-science"]').click({ force: true });

    // Waits for the filtered GraphQL request and check the response
    cy.wait("@booksFilter").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received for the intercepted request.");
      }

      // Logs the intercepted response for debugging
      console.log("Intercepted Response:", interception.response.body);

      // Validates the response status code
      expect(interception.response.statusCode).to.equal(200);

      // Ensures the response contains books of the "Political Science" genre
      const books = interception.response.body.data.books;
      expect(books).to.have.length.greaterThan(0);
      books.forEach((book) => {
        expect(book.genre).to.equal("Political Science");
      });
    });

    // Verifies that the book list is updated in the UI
    cy.get('[data-cy="book-list"]')
      .children()
      .should("have.length.greaterThan", 0);
  });
});
