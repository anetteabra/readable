/// <reference types="cypress" />

describe("Book Details Page and Add Review", () => {
  const expectedBook = {
    id: "_01",
    title: "LITTLE WOMEN",
    cover: "https://proconian.com/wp-content/uploads/2020/01/littlewomen.png",
    author: { name: "Louisa May Alcott" },
    genre: "Fiction",
    publication_date: "1868-09-30",
    description:
      "A novel about the lives of four sisters during the American Civil War.",
    isbn13: "9780143039433",
  };

  const mockedReview = {
    name: "Test User",
    stars: 5,
    comment: "This is a test review.",
  };

  beforeEach(() => {
    cy.visit("http://localhost:5173/project2/library");

    // Intercepts the GraphQL request for GET_BOOKS
    cy.intercept("POST", "http://localhost:3001", (req) => {
      if (req.body.operationName === "GetBooks") {
        req.alias = "getBooks";
        req.reply({
          data: {
            books: [expectedBook], // Mocked response with a single book
          },
        });
      }
    });

    // Intercepts the GraphQL mutation for addReview
    cy.intercept("POST", "http://localhost:3001", (req) => {
      if (req.body.operationName === "AddReview") {
        req.alias = "addReviewMutation";
        req.reply({
          data: {
            addReview: mockedReview,
          },
        });
      }
    });
  });

  it("should type a review comment and submit the mutation", () => {
    // Waits for the GET_BOOKS request to complete
    cy.reload();
    cy.wait("@getBooks");

    // Clicks on the book card link to navigate to the details page
    cy.get('[data-cy="book-card-link"]').click();

    // Clicks on the "Give review" button to open the popover
    cy.contains("Give review").click();

    // Fills in the name input
    cy.get('[data-cy="name-input"]')
      .should("be.visible")
      .type(mockedReview.name);

    // Selects the 5-star rating
    cy.get('[data-cy="star-rating"]').find('[data-cy="star-5"]').click();

    // Types a review comment in the input field
    cy.get('[data-cy="review-input"]')
      .should("exist")
      .type("This is a test review.");

    // Clicks the submit button
    cy.get('[data-cy="submit-review-button"]').click();

    // Waits for the addReview mutation request
    cy.wait("@addReviewMutation").then((interception) => {
      // Validates that the mutation request was sent with the correct variables
      const variables = interception.request.body.variables;
      expect(variables.comment).to.equal("This is a test review.");
    });

    // Logs a success message
    cy.log("Review input test completed successfully.");
  });
});
