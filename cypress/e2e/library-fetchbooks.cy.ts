/// <reference types="cypress" />

describe('Library Page Data Fetching', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/project2/library'); // Ensure this matches your route
    });
  
    it('should fetch and display a list of books from the GraphQL API', () => {
      // Intercept the GraphQL request
      cy.intercept('POST', 'http://localhost:3001', (req) => {
        if (req.body.operationName === 'GetBooks') {
          req.alias = 'getBooksQuery';
        }
      });
  
      // Wait for the GraphQL request to complete
      cy.wait('@getBooksQuery').its('response.statusCode').should('eq', 200);
  
      // Check that the book list is displayed
      cy.get('[data-cy="book-list"]').should('be.visible');

      // Assert that the book list contains at least one book item
      cy.get('[data-cy="book-list"]')
        .children()
        .should('have.length.greaterThan', 0);
    });
  });