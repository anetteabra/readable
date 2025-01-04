import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j, { Driver } from "neo4j-driver";

const driver: Driver = neo4j.driver(
    "neo4j+s://bdbb2a61.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "vKUwSYjJQHJRyvErgP9Util_yYHFwP_fq1HRNitui4g"),
  );

async function testConnection() {
    try {
      const session = driver.session();
      const result = await session.run('RETURN 1 AS test');
      console.log('Connection successful:', result.records[0].get('test'));
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      await driver.close();
    }
  }
  
  testConnection();
  