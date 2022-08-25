import neo4j, { Driver, Session } from 'neo4j-driver';
import { errorMessages } from './errors';

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

type SessionDriver = {
  driver: Driver,
  session: Session
}

export const openSession = (): SessionDriver => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session({ database: 'neo4j'});
  return {
    driver,
    session
  };
};

export const closeSession = async (driver: Driver, session: Session): Promise<void> => {
  try {
    session.close();
    driver.close();
  } catch(err) {
    throw new Error(`${errorMessages.session.close}: ${err}`);
  }
};
