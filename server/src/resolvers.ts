import { Driver } from 'neo4j-driver';


const resolvers = {
    Query: {
        books: async (_: any, args: any, context: { driver: Driver }, info: any) => {
        const session = context.driver.session(); // Create a Neo4j session
        try {
          console.log("Fetching books from Neo4j...");
          const result = await session.run(`
            MATCH (a:Author)-[:WROTE]->(b:Book)
            RETURN b {
              .id, .title, .cover, .length, .description, .modulesCount, author: a {
                .name, .photo
              }
            } AS book
          `);
          const books = result.records.map(record => record.get('book'));
          console.log('Books fetched from Neo4j:', books);
          return books;
        } catch (error) {
          console.error('Error fetching books from Neo4j:', error);
          throw new Error('Failed to fetch books');
        } finally {
          await session.close();
        }
      },

      reviews: async (_: any, { bookId }: { bookId: string }, context: { driver: Driver }) => {
        const session = context.driver.session();
        try {
          const result = await session.run(
            `
            MATCH (b:Book {id: $bookId})<-[:REVIEWED]-(r:Review)
            RETURN r {
              .id, .name, .stars, .comment
            } AS review
            `,
            { bookId }
          );
          return result.records.map(record => record.get('review'));
        } finally {
          await session.close();
        }
      },
    },

    Mutation: {
        addBook: async (_: any, args: any, context: { driver: Driver }) => {
          const session = context.driver.session();
          try {
            const result = await session.run(
              `
              MERGE (a:Author {name: $authorName})
              ON CREATE SET a.photo = $authorPhoto
              CREATE (a)-[:WROTE]->(b:Book {
                title: $title, 
                cover: $cover, 
                length: $length, 
              })
              RETURN b { .id, .title } AS book
              `,
              args
            );
            return result.records[0].get('book');
          } finally {
            await session.close();
          }
        },
    
        addReview: async (_: any, { bookId, name, stars, comment }: { bookId: string; name: string; stars: number; comment: string }, context: { driver: Driver }) => {
          const session = context.driver.session();
          try {
            const result = await session.run(
              `
              MATCH (b:Book {id: $bookId})
              CREATE (r:Review {
                id: randomUUID(), 
                name: $name, 
                stars: $stars, 
                comment: $comment
              })-[:REVIEWED]->(b)
              RETURN r {
                .id, .name, .stars, .comment
              } AS review
              `,
              { bookId, name, stars, comment }
            );
            return result.records[0].get('review');
          } finally {
            await session.close();
          }
        },
      },
    
  };


export default resolvers;