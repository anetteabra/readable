/// <reference types="cypress" />

// Define the GraphQL query body
const queryBody = {
  operationName: "Query",
  query: `
    query Query($options: BookOptions) {
      books(options: $options) {
        title
      }
    }
  `,
  variables: {
    options: {
      limit: 3,
    },
  },
};

// Define the expected response results
const expectedResults = {
  data: {
    books: [
      { title: "LITTLE WOMEN" },
      { title: "HARRY POTTER AND THE PHILOSOPHER'S STONE" },
      { title: "A LITTLE LIFE" },
    ],
  },
};

// Use environment variable for the GraphQL URL with a fallback to localhost
const GRAPHQL_URL = 'http://localhost:3001/graphql';

describe('GraphQL GET_BOOKS Query with Limit', () => {
  it('should fetch a limited number of books and match the expected titles', () => {
    // Intercept the GraphQL request using the environment variable URL
    cy.intercept('POST', GRAPHQL_URL).as('getBooks');

    // Trigger the GraphQL request directly
    cy.request({
      method: 'POST',
      url: GRAPHQL_URL,
      body: queryBody,
    }).then((response) => {
      // Check the response status code
      expect(response.status).to.equal(200);

      // Check that there are no errors in the response
      expect(response.body).to.not.have.property('errors');

      // Verify that the response body matches the expected results
      expect(response.body).to.deep.equal(expectedResults);

      // Log the entire response for debugging
      cy.log(JSON.stringify(response.body, null, 2));

      // Log the book titles for easier inspection
      const bookTitles = response.body.data.books.map(book => book.title);
      cy.log(`Fetched book titles: ${bookTitles.join(', ')}`);
    });
  });
});