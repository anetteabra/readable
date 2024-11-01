# Readable

Readable is a webpage where you can view and search for your favorite books. Books can be sorted, filtered and favorited. Each book has a details page, where the user also can give a review and rating. Reviews from other users are also displayed. The books are stored in our neo4j database, and fetched to be displayed in the library.

## Challenges

### Pagination
Right now we have solved the pagination with a load more button that shows 12 books, then the next 12 and so on. 

This solution is in the frontend as we thought this was the correct way. Later when we tried to fix pagination to be in the server as well, we found we needed to change our backend. The consequence of this was that our solutions for pagination, search, filter and sort needs to be adapted to work for the new backend solution. We are well into the process to develop this, since it has been proved challenging we decided to keep our frontend solution and current backend for this delivery and continue the progress with this work for the next delivery.

## Link to virtual machine

http://it2810-34.idi.ntnu.no/project2

## Build the VM

### From VS Code

1. Build the project:

```sh
    npm run build
```

2.

```sh
    scp -r dist yourusername@it2810-34.idi.ntnu.no:/tmp/
```

### From Terminal on PC

1.

```sh
    ssh yourusername@it2810-34.idi.ntnu.no
```

2.

```sh
    sudo rm -r /var/www/html/project2
```

1.

```sh
    sudo mv /tmp/dist /var/www/html/project2
```

## Features

- **List view of books**: List view showcasing books for easy browsing.
- **Search Functionality**: Search for books using keywords.
- **Sorting Options**: Sort books.
- **Filtering Options**: Filter books.
- **Book Details Page**: Access a details page for each book.
- **Review and rate**: Express your opinions of a book by leaving a review and a rating. Also read others reviews of the book.
- **Load more button**: Books are loaded incrementally by pressing the load more button.
- **X button**: The filters and search button are reset when clicking on the X.
- **Favorite**: Click on the heart on the books to favorire them and see them deiplayed in favorites. 

Additionally, we've implemented a responsive design that makes most features adaptable to various screen sizes. The testing of responsive design was done in Google Chrome (by changing the dimensions). It is also tested on mobile phone using the vm.

## Technologies
We have chosen the GRAND stack for our backend because this is a well documented stack that works well together.

### Backend
- Neo4j database
- Apollo server
- GraphQL

### Frontend
- React
- Shadcn for components
- Zustand for state management 

We use shadcn for components because these are easier than to modify then for example mui components.

Zustand was chosen because it is more simple then other choices for state management. Zustand is sufficient for our need of global states.

### Choice for dataset
Our dataset is from Kaggle (https://www.kaggle.com/datasets/dhruvildave/new-york-times-best-sellers). 
Since it was missing book cover photo and genre we decided to import this from google.

Background photo for the homepage is downloaded from unsplash: https://unsplash.com/photos/low-angle-photography-of-brown-2-storey-structure-YQhhlCS9Hto

## Sustainable web development
Todo

## Accessability
Todo


## Installation and Usage

First, clone the repo in your preferred way.

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

### To run the server

1. **To run the server go into the server folder**:
   The server is up and running, but currently not connected to anything.

   ```sh
   cd server
   ```

2. **Start the server**:
   ```sh
   npm run start
   ```

## Testing

For the testing of the web application vitest is going to be used, to write component tests and snapshot tests. For end to end testing, cypress is going to be utilized. At this point, we do not have any tests, but the plan is to implement some tests as soon as possible.

### Web accessibility

Focus on readability of the web page, and having appropriate html tags and aria-labels. Also ensuring the page is intuitive and logical.
When running google lighthouse the scores are good but they also show room for improvement.

## To lint your code, run:

```sh
npm run lint
```

## Use Prettier

```sh
npx prettier --write .
```

## Run tests with vitest

For running the test, when implemented, use:

```sh
npm run test
```
