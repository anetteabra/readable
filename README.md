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
  - [Accessability](#accessability)
  - [Lessons learned](#lessons-learned)
  - [Code quality and formatting](#code-quality-and-formatting)
    - [To lint your code](#to-lint-your-code)
    - [To format your code](#to-format-your-code)



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

1. **Install dependencies**:


   ```sh
   npm install
   ```


2. **Run the project**:

   ```sh
   npm run dev
   ```

3. **Navigate to the project**:
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

Zustand was chosen because it was recommended as an easier  chocie, suitable for the group who didn´t have any experience with global state management before taking this course. Zustand has proved sufficient for our need of global states, and we are pleased with the chocie.

### Choice of dataset

Our dataset is from Kaggle (https://www.kaggle.com/datasets/dhruvildave/new-york-times-best-sellers).
Since it was missing book cover photo and genre we decided to import this from google.

Background photo for the homepage is downloaded from unsplash: https://unsplash.com/photos/low-angle-photography-of-brown-2-storey-structure-YQhhlCS9Hto

## Testing
For the testing of this web application vitest is used to write component tests. Cypress is utilized for the end to end testing (E2E). When testing our application we have used vi, to mock our data...

We tried to test the most important components and functionality...

### For running the tests:
#### With vitest

For running the test, use:

```sh
npm run test
```
#### With cypress
TODO

## Sustainability
### Pagination
The webpage will only load 12 books at the time, to load more books, the load more button needs to be clicked. This functionality ensures that all the books in our database isn´t loaded at once, and can therfore handle bigger datasets. 

The results wont be reloaded when going to homepage from the library and back. This is a choice we made to avoid unnecessary calls to the backend. The possibility of bigger changes when browsing between the pages is low, and therefore we think this soulutions is suitable for this project. However, we see that other websites, will reset when going to the homepage, and that this is functionality that we could have implemented for user friendliness. 

The load more button is visble all the time, even though there isn´t more data to load. This is...


## Accessability

We have focused on readability of the web page, and having appropriate html tags and aria-labels. Also ensuring the page is intuitive and logical.
When running Google Lighthouse the scores are good but they also show room for improvement.


## Lessons learned
- section to sum up that we have learnt a lot during this project
- what we would have improved if we had prioritez different/had more time
  
## Code quality and formatting


### To lint your code

```sh
npm run lint
```

### To format your code
Using Prettier:

```sh
npx prettier --write .
```
