/// <reference types="cypress" />

describe("Book Search Functionality with Enter Key", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/project2/library");

    // Intercepts the GraphQL request for the GetBooks query
    cy.intercept("POST", "http://localhost:3001", (req) => {
      if (req.body.operationName === "GetBooks") {
        req.alias = "booksSearch";
        console.log("Intercepted GetBooks Query:", req.body);
      }
    });
  });

  it('should search for books using the search term "trump" and press Enter', () => {
    // Types the search term into the input field and press Enter
    cy.get('[data-cy="search-input"]')
      .should("exist")
      .type("trump{enter}", { force: true });

    // Waits for the GraphQL request to complete
    cy.wait("@booksSearch").its("response.statusCode").should("eq", 200);

    // Verifies that the displayed books include the search term "trump"
    cy.get('[data-cy="book-list"]')
      .children()
      .each(($el) => {
        const title = $el.find('[data-cy="book-title"]').text().toLowerCase();
        const author = $el.find('[data-cy="book-author"]').text().toLowerCase();
        // expect(title.includes("trump") || author.includes("trump")).to.be.true;
        cy.wrap(title.includes("trump") || author.includes("trump")).should('be.true');
      });

    // Verifies that the book list is not empty
    cy.get('[data-cy="book-list"]')
      .children()
      .should("have.length.greaterThan", 0);
  });
});
