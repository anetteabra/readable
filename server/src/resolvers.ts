const resolvers = {
  Query: {
    books: () => null, // Delegates handling to Neo4j GraphQL library
    reviews: () => null, // Delegates handling to Neo4j GraphQL library
  },
};

export default resolvers;



// import { Driver } from 'neo4j-driver';

// const resolvers = {
//   Query: {
//     books: async (_: any, args: any, context: { driver: Driver }) => {
//       const session = context.driver.session(); // Create a Neo4j session
//       try {
//         console.log("Fetching books from Neo4j...");
//         const result = await session.run(`
//           MATCH (a:Author)-[:WROTE]->(b:Book)
//           RETURN b {
//             .id, .title, .cover, .description, .genre, .publication_date, .isbn13,
//             author: a { .name }
//           } AS book
//         `);
//         const books = result.records.map(record => record.get('book'));
//         console.log('Books fetched from Neo4j:', books);
//         return books;
//       } catch (error) {
//         console.error('Error fetching books from Neo4j:', error);
//         throw new Error('Failed to fetch books');
//       } finally {
//         await session.close();
//       }
//     },

//     reviews: async (_: any, { bookId }: { bookId: string }, context: { driver: Driver }) => {
//       const session = context.driver.session();
//       try {
//         const result = await session.run(
//           `
//           MATCH (b:Book {id: $bookId})<-[:REVIEWED]-(r:Review)
//           RETURN r {
//             .id, .name, .stars, .comment
//           } AS review
//           `,
//           { bookId }
//         );
//         return result.records.map(record => record.get('review'));
//       } finally {
//         await session.close();
//       }
//     },
//   },

//   Mutation: {
//     addBook: async (
//       _: any,
//       { title, cover, authorName, description, genre, publication_date, isbn13 }: 
//       { title: string; cover?: string; authorName: string; description?: string; genre?: string; publication_date?: string; isbn13?: string },
//       context: { driver: Driver }
//     ) => {
//       const session = context.driver.session();
//       try {
//         const result = await session.run(
//           `
//           MERGE (a:Author {name: $authorName})
//           CREATE (a)-[:WROTE]->(b:Book {
//             id: randomUUID(),
//             title: $title,
//             cover: $cover,
//             description: $description,
//             genre: $genre,
//             publication_date: $publication_date,
//             isbn13: $isbn13
//           })
//           RETURN b {
//             .id, .title, .cover, .description, .genre, .publication_date, .isbn13,
//             author: a { .name }
//           } AS book
//           `,
//           { title, cover, authorName, description, genre, publication_date, isbn13 }
//         );
//         return result.records[0].get('book');
//       } finally {
//         await session.close();
//       }
//     },

//     addReview: async (
//       _: any,
//       { bookId, name, stars, comment }: { bookId: string; name: string; stars: number; comment: string },
//       context: { driver: Driver }
//     ) => {
//       const session = context.driver.session();
//       try {
//         const result = await session.run(
//           `
//           MATCH (b:Book {id: $bookId})
//           CREATE (r:Review {
//             id: randomUUID(),
//             name: $name,
//             stars: $stars,
//             comment: $comment
//           })-[:REVIEWED]->(b)
//           RETURN r {
//             .id, .name, .stars, .comment
//           } AS review
//           `,
//           { bookId, name, stars, comment }
//         );
//         return result.records[0].get('review');
//       } finally {
//         await session.close();
//       }
//     },
//   },
// };

// export default resolvers;
