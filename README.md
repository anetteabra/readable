# Project 2: Readable

**Table of contents**📚

- [Project 2: Readable](#project-2-readable)
  - [Readable project overview](#readable-project-overview)
  - [Run the project](#run-the-project)
    - [Run the project locally](#run-the-project-locally)
  - [Features](#features)
  - [Technologies](#technologies)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Choice of dataset](#choice-of-dataset)
  - [Testing](#testing)
    - [For running the tests:](#for-running-the-tests)
      - [With vitest](#with-vitest)
      - [With cypress](#with-cypress)
  - [Sustainability](#sustainability)
    - [Pagination](#pagination)
    - [Search field](#search-field)
  - [Accessability](#accessability)
  - [Code quality and formatting](#code-quality-and-formatting)
    - [To lint the code](#to-lint-the-code)
    - [To format the code](#to-format-the-code)

## Readable project overview

Readable is a webpage where you can view and search for your favorite books by title. Books can be sorted, filtered and favorited. Each book has a details page, where the user also can give a review and rating. Reviews from other users are also displayed. The books are stored in our neo4j database, and fetched to be displayed in the library. This project uses GraphQL, a query language for APIs, as an alternative to REST. GraphQL allows for more flexible and efficient data fetching by enabling clients to request exactly the data they need in a single query.

## Run the project

### Run the project locally

First, clone the repo in your preferred way.

1. **To run the server go into the server folder**:

   ```sh
   cd server
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Start the server**:

   ```sh
   npm run start
   ```

   Open a new terminal, and make sure to be in the root of the project.

4. **Install dependencies**:

   ```sh
   npm install
   ```

5. **Run the project**:

   ```sh
   npm run dev
   ```

6. **Navigate to the project**:
   Open your browser and go to http://localhost:5173/project2

## Features

- **List view of books**: List view showcasing books for easy browsing.
- **Search Functionality**: Search for book titles and authors.
- **Sorting Options**: Sort books by title or publication date.
- **Filtering Options**: Filter books by favorites or genre.
- **Book Details Page**: Access a details page for each book.
- **Review and rate**: Express your opinions of a book by leaving a review and rating. Also read others reviews of the book.
- **Load more button**: Books are loaded incrementally by pressing the load more button.
- **X button**: The filters and search button are reset when clicking on the X, in the search field.
- **Favorite**: Click on the heart on the books to favorire them. You can see them displayed in favorites, by using the favorited filter.

The filter functionality only lets you click one genre at the time, a chocie we made based on other websites like Netflix. When choosing genres on such websites, only one category is displayed at the time. If you aren´t sure of which genre you want to read from, you need to switch between them. However, we understand that not everyone thinks this is the best solution, based on earlier feedback from other students.

For the favoriting functionality the favorites are connected to a personal userId that is generated and saved in localstorage when opening the webpage. The userId is saved as user in the database. And the favorites are connected by bookId and userId in the database.

Additionally, we've implemented a responsive design that makes most features adaptable to various screen sizes. The testing of responsive design was done in Google Chrome (by changing the dimensions). It is also tested on mobile phone using the vm.

## Technologies

We have chosen the GRAND stack for our backend because this is a well documented stack with technologies that works well together.

### Backend

- Neo4j database
- Apollo server
- GraphQL

### Frontend

- React
- Shadcn for components
- Zustand for state management

We use shadcn for components because these are easier to modify then for example MUI components.

Zustand was chosen because it was recommended as an easier chocie, suitable for the group who didn´t have any experience with global state management before taking this course. Zustand has proved sufficient for our need of global states, and we are pleased with the choice.

### Choice of dataset

Our dataset is from Kaggle (https://www.kaggle.com/datasets/dhruvildave/new-york-times-best-sellers).
Since it was missing book cover photo and genre we decided to import this from google.

Background photo for the homepage is downloaded from unsplash: https://unsplash.com/photos/low-angle-photography-of-brown-2-storey-structure-YQhhlCS9Hto


## Testing

For the testing of this web application vitest is used to write component tests. Cypress is utilized for the end to end testing (E2E). When testing our application we have used vi, to mock our data.

You might encounter some problems when running the cypress tests, but they have worked as they should the last times we ran them. However, we have encountered some errors earlier that have not been consistent (different for each group member). Sometimes it helps to restart the server and frontend.

We tried to test the most important components, that they render correctly and their functionality. A few of the tests are very simple or not complete. The BookBox test just checks that the component renders correctly, here we could test more but it was a bit complex for us. Also the SearchBar test checks that the component renders, here we stuggled with testing the functionality. Therefore, we see that we have room for improvement regarding the testing of the application.

The components that are tested with vitest:

- Bookbox
- Bookcard
- SearchBar
- InfoDetails
- SideBar
- ReviewPopUp
- ReviewList
- ReviewComment

### For running the tests:

Make sure to be in the root of the project, when running the tests.

#### With vitest

```sh
npm run test
```

or

```sh
npx vitest
```

#### With cypress

For different members of our group, not all commands were working. So here are three different ways of running the cypress tests.

Make sure the server and frontend is running before typing this command:

```sh
npx cypress run
```

Or make sure the server and frontend is running before typing this command:

```sh
npx cypress open
```

Or make sure only the server is running before typing this command:

```sh
npm run cy:e2e
```

## Sustainability

### Pagination

The webpage will only load 12 books at the time, to load more books, the load more button needs to be clicked. This functionality ensures that all the books in our database isn´t loaded at once, and can therfore handle bigger datasets.

If you load more books (e.g., 36), then navigate to a book details page or the homepage, and return to the library page, the library will reset to display only 12 books. However, if you perform a search, the library will continue displaying results based on the search query until you clear the search (either by clicking the "X" button or searching with an empty string). Resetting may not be the most sustainable solution, but given the low likelihood of bugs caused by states not resetting, we considered this approach is appropriate for this project.

When you click the "Load more" button and there is no more content to load, the button will disappear. Ideally, the button should disappear automatically before needing to click it (one extra time), but we focused on fixing other functionality.

### Search field

When searching on our webpage, the user needs to press enter for the backend call to be executed. This ensures that there aren´t any unnecessary calls to the backend. However, we see that implementing debounce would have made the webpage more userfriendly.

## Accessability

We have focused on readability of the web page, and having appropriate html tags and aria-labels. Also ensuring the page is intuitive and logical.
When running Google Lighthouse the scores are good but they also show room for improvement.

Some of the things we focused on for accessability:

- Color contrast on text, buttons and components
- Simple and readable font
- Buttons give feedback
- Intuitive design for user friendliness
- Easy to navigate

## Code quality and formatting

We have used prettier for formatting our code, and eslint for checking errors and warnings.
To enhance readability and understanding, we have structured the code clearly and included comments where we have thought necessary.

### To lint the code

```sh
npm run lint
```

### To format the code

Using Prettier:

```sh
npx prettier --write .
```
