import { closeSession, openSession } from "..";
import { logError } from "../../lib/helpers";
import { Nutrient } from "../../types/nutrient";
import { errorMessages } from "../errors";

export const getAllSymptoms = async () => {
  const session = openSession();
  try {
    const query = `MATCH (symptom:Symptom) RETURN symptom.name, symptom.description`;
    const result = await session.run(query);
    const symptoms = result.records.map(record => {
      return (
        {
          name: record.get('symptom.name'),
          description: record.get('symptom.description')
        }
      );
    });
    return symptoms;
  } catch (err) {
    logError(err);
    throw(err);
  } finally {
    await closeSession(session);
  }
};

export const getSymptomsByName = async (queryStr: string) => {
  if (!queryStr) {
    throw new Error(errorMessages.symptom.queryEmpty);
  }

  const session = openSession();
  try {
    const query = `
    MATCH (symptom:Symptom)
    WHERE symptom.name CONTAINS '${queryStr}'
    RETURN symptom.name, symptom.description`;
    const result = await session.run(query);
    const symptoms = result.records.map(record => {
      return (
        {
          name: record.get('symptom.name'),
          description: record.get('symptom.description')
        }
      );
    });
    return symptoms;
  } catch (err) {
    logError(`${err}`);
    throw(err);
  } finally {
    await closeSession(session);
  }
};

export const getRelatedNutrients = async (symptom: string): Promise<Nutrient[] | []> => {
  const session = openSession();
  try {
    const query = `
    MATCH (s:Symptom {name: '${symptom}'})<-[r:RELATED_TO]-(nutrient:Nutrient)
    RETURN nutrient.name, r.description, r.reference, r.authors
    `;
    const result = await session.run(query);
    const nutrients = result.records.map(record => {
      return (
        {
          name: record.get('nutrient.name'),
          description: record.get('r.description'),
          references: record.get('r.reference'),
          authors: record.get('r.authors'),
          symptomKey: symptom
        }
      );
    });
    return nutrients;
  } catch(err) {
    logError(err);
    throw(err);
  } finally {
    await closeSession(session);
  }
};
