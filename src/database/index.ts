import neo4j, { Session } from 'neo4j-driver';
import { errorMessages } from './errors';

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;
export const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(user, password)
);

export const openSession = (): Session => {
  const session = driver.session({ database: 'neo4j'});
  return session;
};

export const closeSession = async (session: Session): Promise<void> => {
  try {
    session.close();
  } catch(err) {
    throw new Error(`${errorMessages.session.close}: ${err}`);
  }
};
