# Readable

Readable is a webpage where you can view and search for your favorite books. The search bar in the navbar in the top, so the user can always search for a book. On the library page can “sort by” and “filter by”. In the library page the books are presented in a list view, with pagination to ensure the books are loaded incrementally for better use of energy.

Each book now has a details page, where the user can find more details about each book, and give it a review and rating. Here all the reviews for that book are also displayed. The backend is now connected to the frontend. The books are stored in our neo4j database, and fetched to be displayed in the library.

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

What we have now, and what is the plan ahead…

- **List view of books**: List view showcasing books for easy browsing.
- **Search Functionality**: Search for books using keywords.
- **Sorting Options**: Sort books.
- **Filtering Options**: Filter books.
- **Book Details Page**: Access a details page for each book.
- **Review and rate**: Express your opinions of a book by leaving a review and a rating. Also read others reviews of the book.
- Books are loaded incrementally?

Additionally, we've implemented a responsive design that makes most features adaptable to various screen sizes. The testing of responsive design was done in Google Chrome (by changing the dimensions). It is also tested on mobile phone using the vm.

## Technologies

### Backend
- Neo4j database
- Apollo server
- GraphQL

We have chosen this for our backend because ...

### Frontend
- Shadcn for components
- Zustand for state management 

We use shadcn for components because ..
Zustand was chosen because it is more simple then other choices for state management. Zustand is sufficient for our need of global states.

### Choice for dataset
Our dataset is from ...
Since it was missing book cover photo and genre we decided to import this from google...

Background photo for the homepage is downloaded from unsplash: https://unsplash.com/photos/low-angle-photography-of-brown-2-storey-structure-YQhhlCS9Hto

## Sustainable web development
- xx amount of books are fetched at a time from the database.

## Accessability
Ting oss ha gjort for å foredre accessability:
- Color contrast to ensure readability
- Intuitive buttons??
- Store klikkoverflater?


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
