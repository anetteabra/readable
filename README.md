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
  - [Lessons learned](#lessons-learned)
  - [Code quality and formatting](#code-quality-and-formatting)
    - [To lint the code](#to-lint-the-code)
    - [To format the code](#to-format-the-code)

## Readable project overview

Readable is a webpage where you can view and search for your favorite books by title. Books can be sorted, filtered and favorited. Each book has a details page, where the user also can give a review and rating. Reviews from other users are also displayed. The books are stored in our neo4j database, and fetched to be displayed in the library.

## Run the project

Click the link below to get to our project on the VM, make sure to be on NTNU network (eduroam), or connect via VPN:

http://it2810-34.idi.ntnu.no/project2

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

   Open a new terminal, and make sure to be in the root of the project (T34-Project-2):

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
- **Search Functionality**: Search for book titles.
- **Sorting Options**: Sort books by title or publication date.
- **Filtering Options**: Filter books by favorites or genre.
- **Book Details Page**: Access a details page for each book.
- **Review and rate**: Express your opinions of a book by leaving a review and rating. Also read others reviews of the book.
- **Load more button**: Books are loaded incrementally by pressing the load more button.
- **X button**: The filters and search button are reset when clicking on the X, in the search field.
- **Favorite**: Click on the heart on the books to favorire them. You can see them displayed in favorites, by using the favorited filter.

The filter functionality only lets you click one genre at the time, a chocie we made based on other websites like Netflix. When choosing genres on such websites, only one category is displayed at the time. If you aren´t sure of which genre you want to read from, you need to switch between them. However, we understand that not everyone thinks this is the best solution, based on earlier feedback from other students.

For the search functionlity our plan was to implement the possibility to search for authors as well as titles. However, this proved more challenging than first anticipated. Unfortunaltley, we needed to prioritize working other parts of the project to get a webpage that meets the requirements.

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

We tried to test the most important components, that they render correctly and their functionality. A few of the tests are very simple or not complete. The BookBox test just checks that the component renders correctly, here we could test more but it was a bit complex for us. Also the SearchBar test checks that the component renders, here we stuggled with testing the functionality. So the SearchBar test is incomplete. Therefore, we see that we have room for improvement regarding the testing of the application.

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

Make sure the server is running before typing the command:

```sh
npm run cy:e2e
```

## Sustainability

### Pagination

The webpage will only load 12 books at the time, to load more books, the load more button needs to be clicked. This functionality ensures that all the books in our database isn´t loaded at once, and can therfore handle bigger datasets.

The results wont be reloaded when going to homepage from the library and back. This is a choice we made to avoid unnecessary calls to the backend. The possibility of bigger changes when browsing between the pages is low, and therefore we think this soulutions is suitable for this project. However, we see that other websites, will reset when going to the homepage, and that this is functionality that we could have implemented for user friendliness.

The load more button is visble all the time, even though there isn´t more data to load. This is unfortunaltly not the most intuitive solution, but if there are no more data to load the button does nothing. We tried to fix this, however, it proved more challenging than expected, because it needed to work with all our functinality. Solutions that worked some places, did not work for all over the page, and therefore made the page less userfriendly.

### Search field

When searching for booktitles on our webpage, the user needs to press enter for the backend call to be executed. This ensures that there aren´t any unnecessary calls to the backend. However, we see that implementing debounce would have made the webpage more userfriendly, and also limit the backend calls.

## Accessability

We have focused on readability of the web page, and having appropriate html tags and aria-labels. Also ensuring the page is intuitive and logical.
When running Google Lighthouse the scores are good but they also show room for improvement.

Some of the things we focused on for accessability:

- Color contrast on text, buttons and components
- Simple and readable font
- Buttons give feedback
- Intuitive design for user friendliness
- Easy to navigate

## Lessons learned

The group has learnt a lot during this project, especially beacuse none of the group members had extensive experience before starting this project.

Taking this experience into account, we are pleased with the final outcome. However, we see room for improvement on multiple fields, each tried to be explained in other sections.

When implementing pagination we realized the other functionality also needed to happen in the backend for it to work together. Therefore it was neccessary to redo large parts of our codebase.

If we were to do the project again, with the experience gained, we could have completed the project in significantly less time. This project has been a learning curve. We realize that if we had a better initial understanding of the project requirements it could have helped us avoid rework. And we could have progressed further on the project.

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
