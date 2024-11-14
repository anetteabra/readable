/// <reference types="cypress" />

const isSortedDescending = (arr: string[]): boolean => {
    // Compare each element with the next element to ensure it's in descending order
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].localeCompare(arr[i + 1]) < 0) {
        return false; // Return false if an element is less than the next element
      }
    }
    return true;
  };

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
      });
      // Click the sorting dropdown trigger to open the dropdown
      cy.get('[data-cy="sort-trigger"]').click();
    
      // Select the sorting option for A-Z
      cy.get('[data-cy="sort-z-a"]').click();

      cy.get('[data-cy="book-title"]').then((titles) => {
        const displayedTitles = [...titles]
          .map((title) => title.textContent?.trim())
          .filter((text): text is string => text !== undefined);
      
        // Log the actual displayed titles for debugging
        cy.log('Displayed Titles:', JSON.stringify(displayedTitles));
      
        // Assert that the displayed titles are in Z-A order
        expect(isSortedDescending(displayedTitles)).to.be.true;
      });

});  
});