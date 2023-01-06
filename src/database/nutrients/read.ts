import { closeSession, openSession } from "..";
import { logError } from "../../lib/helpers";
import { Nutrient } from "../../types/nutrient";
import { errorMessages } from "../errors";

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
          authors: record.get('r.authors')
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