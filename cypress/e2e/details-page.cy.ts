/// <reference types="cypress" />

describe("Book Details Page", () => {
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
  });

  it("should display the correct details for the clicked book", () => {
    // Waits for the GET_BOOKS request to complete
    cy.reload();
    cy.wait("@getBooks");

    // Clicks on the book card link to navigate to the details page
    cy.get('[data-cy="book-card-link"]').click();

    // Verifies the URL includes the correct book ID
    cy.url().should("include", `/details/${expectedBook.id}`);

    // Verifies that the details page displays the correct information
    cy.get('[data-cy="book-title"]').should("contain.text", expectedBook.title);
    cy.get('[data-cy="book-author"]').should(
      "contain.text",
      expectedBook.author.name,
    );
    cy.get('[data-cy="book-genre"]').should("contain.text", expectedBook.genre);
    cy.get('[data-cy="book-publication-date"]').should(
      "contain.text",
      expectedBook.publication_date,
    );
    cy.get('[data-cy="book-description"]').should(
      "contain.text",
      expectedBook.description,
    );
  });
});
