/// <reference types="cypress" />

describe('Book Genre Filtering Functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/project2/library');
      
      // Intercept the GraphQL request for the GetBooks query
      cy.intercept('POST', 'http://localhost:3001', (req) => {
        if (req.body.operationName === 'GetBooks') {
          req.alias = 'booksFilter';
          console.log('Intercepted GetBooks Query:', req.body);
        }
      });
    });
  
    it('should filter books by the "Political Science" genre', () => {
      // Click on the "Fiction" genre filter checkbox
      cy.get('[data-cy="genre-filter-political-science"]').click({ force: true });
  
      // Wait for the filtered GraphQL request and check the response
      cy.wait('@booksFilter').then((interception) => {
        if (!interception.response) {
          throw new Error('No response received for the intercepted request.');
        }
  
        // Log the intercepted response for debugging
        console.log('Intercepted Response:', interception.response.body);
  
        // Validate the response status code
        expect(interception.response.statusCode).to.equal(200);
  
        // Check that the request includes the genre filter for "Fiction"
        expect(interception.request.body.variables.genre).to.equal('Political Science');
  
        // Ensure the response contains books of the "Fiction" genre
        const books = interception.response.body.data.books;
        expect(books).to.have.length.greaterThan(0);
        books.forEach((book) => {
          expect(book.genre).to.equal('Political Science');
        });
      });
  
      // Verify that the book list is updated in the UI
      cy.get('[data-cy="book-list"]').children().should('have.length.greaterThan', 0);
    });
  });  