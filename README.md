# Readable

Readable is a webpage where you can view and search for your favorite books. Right now you can view a lot of the functionality we plan to include, even though they are not functional at the moment. The search bar in the navbar in the top, and on the library page the options to “sort by” and “filter by” (the current options for sorting and filtering will be changed in the future). In the library page the books are presented in a list view, the load more button is also not functional but there to represent that we plan to have dynamic loading of the content.

Further plans include having a details page for each book, where the user can find more details about each book, and give it a review and rating. The plan is to also display all the reviews for that book. The group is also currently working on the backend side of the project. The server is up and running, and currently the group is working on connecting the backend and frontend. Next steps will also include setting up the database and connecting this.

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

Additionally, we've implemented a responsive design that makes most features adaptable to various screen sizes. The testing of responsive design was done in Google Chrome (by changing the dimensions). It is also tested on mobile phone using the vm.

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
