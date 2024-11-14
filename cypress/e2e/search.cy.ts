/// <reference types="cypress" />

describe('Book Search Functionality with Enter Key', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/project2/library');
      
      // Intercepts the GraphQL request for the GetBooks query
      cy.intercept('POST', 'http://localhost:3001', (req) => {
        if (req.body.operationName === 'GetBooks') {
          req.alias = 'booksSearch';
          console.log('Intercepted GetBooks Query:', req.body);
        }
      });
    });
  
    it('should search for books using the search term "harry" and press Enter', () => {
      // Types the search term into the input field and press Enter
      cy.get('[data-cy="search-input"]')
        .should('exist')
        .type('harry{enter}', { force: true });
  
      // Waits for the GraphQL request and check the response
      cy.wait('@booksSearch').then((interception) => {
        if (!interception.response) {
          throw new Error('No response received for the intercepted request.');
        }
  
        // Logs the intercepted response for debugging
        console.log('Intercepted Response:', interception.response.body);
  
        // Validates the response status code
        expect(interception.response.statusCode).to.equal(200);
  
        // Checks that the response contains book data
        const books = interception.response.body.data.books;
        expect(books).to.have.length.greaterThan(0);
  
        // Ensures that the search term "harry" is included in the book titles
        books.forEach((book) => {
          expect(book.title.toLowerCase()).to.include('harry');
        });
      });
  
      // Verifies that the book list is updated in the UI
      cy.get('[data-cy="book-list"]').children().should('have.length.greaterThan', 0);
    });
  });  