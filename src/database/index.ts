import neo4j from 'neo4j-driver';

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;



export const writeRecord = async () => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session({ database: 'neo4j'}); 
  try {
    const query = `CREATE (n:Person {name: 'Aaron'})`;
    const result = await session.run(query);
    console.log(result);
  } catch (err) {
    console.log('error writing to database', err);
  } finally {
    await session.close();
    await driver.close();
  }
}